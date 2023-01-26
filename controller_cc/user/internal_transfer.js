
var Common = require('../../helper/common'),
Helper = require('../../helper/helper'),
Mailer = require('../../helper/mailer'),
Encrypter = require('../../helper/encrypter');

var sequelize = require('../../configdetails_cc/ZXNhYmF0YWQ');
var DataTypes = require('sequelize');

const { Op } =  require('sequelize');

var userModel = require('../../models/MONI_sresu');
const user = userModel(sequelize, DataTypes);

var historyModel = require('../../models/MONI_history');
const history = historyModel(sequelize, DataTypes);

var cryptoModel = require('../../models/MONI_otpyrc');
const crypto = cryptoModel(sequelize, DataTypes);

var walletModel = require('../../models/MONI_tellaw');
const wallet = walletModel(sequelize, DataTypes);

var transferModel = require('../../models/MONI_refsnart_lanretni');
const transfer = transferModel(sequelize, DataTypes);

var currencyModel = require('../../models/MONI_currency');
const Currency = currencyModel(sequelize, DataTypes);


module.exports.internal_user_transfer = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var user_id = (req.user_id);
		var response = await user.findOne({ where: { user_id: user_id } });
		var user_email = Encrypter.decrypt_data(response.email);
		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'User not found' })
		else if (!response.phoneVerified)
			res.status(201).send({ status: false, code: 400, message: 'Your account is not yet activated' })
		else if (!response.isActive)
			res.status(201).send({ status: false, code: 400, message: 'Your account has been blocked. Please contact our support' })
		else {
			var currency = req.body.currency;
			var amount = req.body.amount;
			var unique_id = req.body.unique_id;
			var response1 = await user.findOne({ where: { unique_id: unique_id } });
			if (!response1) {
				res.send({ status: false, code: 400, message: 'Invalid User Id' })
			} else if (response.unique_id == unique_id) {
				res.status(201).send({ status: false, code: 400, message: 'This is Your User Id, Please try another User Id' })
			}
			else{
				var currency_data = await Currency.findOne({ where: { currency_symbol: currency } });
				var balance = await wallet.findOne({ where: { user_id: user_id } });
				if (parseFloat(currency_data.internal_min) > parseFloat(amount))
					res.status(201).send({ status: false, code: 400, message: 'Minimum Internal Transfer is '+(currency_data.internal_min)+' '+ currency })
				else if (parseFloat(currency_data.internal_max) < parseFloat(amount))
				{
					console.log(parseFloat(currency_data.internal_max),'maximummmm');  
					console.log(parseFloat(amount),'maximummmm froms amountsss');
					res.status(201).send({ status: false, code: 400, message: 'Maximum Internal Transfer is '+(currency_data.internal_max)+' '+currency })
				}
				else if (balance[currency] < parseFloat(amount)) {
					res.status(201).send({ status: false, code: 400, message: 'Insufficient Balance' })
				}else{

					var fee = ((req.body.amount * currency_data.internal_fee) / 100).toFixed(8);
					let u_data = {};
					u_data[currency] = amount;
					let u_data1 = {};
					u_data1[currency] = (parseFloat(amount) - parseFloat(fee));

					var update_amount = await wallet.decrement(u_data, { where: { user_id: user_id } });
					var update_amount1 = await wallet.increment(u_data1, { where: { user_id: response1.user_id } });

					var data = {
						from_user_id: user_id,
						to_user_id: response1.user_id,
						from_unique_id: response.unique_id,
						to_unique_id: unique_id,
						amount: amount,
						total_amount: (parseFloat(amount) - parseFloat(fee)),
						fee : fee,
						currency: currency,
						status: "Completed"

					}
					var update_transfer = await transfer.create(data)
					if (update_transfer) {
						var mail_data = {
                            "##date##":Helper.dateToDMY(new Date()),
                            "##user##":response.firstname, 
							"##amount##":amount,
							"##currency##":currency,
							"##to_user##" : unique_id
                        }, subject_data = {};
                        Mailer.send({to:user_email, changes:mail_data, subject:subject_data, template:'internal_transfer'});
						res.status(200).send({ status: true, code: 200, message: 'Amount Transfer Successfully' })
					} else {
						res.status(201).send({ status: false, code: 400, message: 'Please try later' })
					}
				}
			}

		}
	}
}


module.exports.get_internal_transfer = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var user_id = (req.user_id);
		var tot_count = await transfer.count({ where :
			{ [Op.or]:[{ from_user_id : user_id}, {to_user_id: user_id }] }})

		let limit=req.body.limit==0?tot_count:req.body.limit;
        let offset=req.body.offset==0?0:req.body.offset;

		var response = await user.findOne({ where: { user_id: user_id } });
		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'User not found' })
		else if (!response.phoneVerified)
			res.status(201).send({ status: false, code: 400, message: 'Your account is not yet activated' })
		else if (!response.isActive)
			res.status(201).send({ status: false, code: 400, message: 'Your account has been blocked. Please contact our support' })
		else {
            var data = [];
            var transfer_list = await transfer.findAll({ where :
                    { [Op.or]:[{ from_user_id : user_id}, {to_user_id: user_id }] },offset: offset, limit: limit })            

            res.status(200).send({ status: true, code: 200, data: transfer_list,tot_count:tot_count })

        }
    }
}