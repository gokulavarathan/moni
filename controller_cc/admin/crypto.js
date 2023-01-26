var Async = require('async');
var jwt = require('jsonwebtoken');
var encryptor = require('simple-encryptor')('TmV4YWJvb2sjJDEyM0VuY3J5cHRvcg');
var Common = require('../../helper/common');
var Mailer = require('../../helper/mailer');
var Encrypter = require('../../helper/encrypter'),
Helper = require('../../helper/helper');
var keys = require('../../keyfiles/keystore');


var sequelize=require('../../configdetails_cc/ZXNhYmF0YWQ');
var DataTypes = require('sequelize'); 
var  UserModel  = require('../../models/MONI_sresu');
var  AdminModel  = require('../../models/MONI_admin');
var  BlockModel  = require('../../models/MONI_block_list');
var  HistoryModel  = require('../../models/MONI_history');
var  UserKycModel  = require('../../models/MONI_users_kyc');
var  CryptoModel  = require('../../models/MONI_otpyrc');
var  WalletModel  = require('../../models/MONI_tellaw');
var transferModel = require('../../models/MONI_refsnart_lanretni');
var currencyModel = require('../../models/MONI_currency');

var TFA = require('../../helper/2fa');


const admin = AdminModel(sequelize, DataTypes);
const block = BlockModel(sequelize, DataTypes);
const history = HistoryModel(sequelize, DataTypes);
const user = UserModel(sequelize, DataTypes);
const user_kyc = UserKycModel(sequelize, DataTypes);
const crypto = CryptoModel(sequelize, DataTypes);
const wallet = WalletModel(sequelize, DataTypes);
const transfer = transferModel(sequelize, DataTypes);
const Currency = currencyModel(sequelize, DataTypes);


module.exports.deposit_currency_fee = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		
		var currency_data = await Currency.findOne({ where: { currency_symbol: 'USDT' } });

		res.status(200).send({ status: true, code: 200, message: 'Fee details', data: currency_data })

	}
}

//Update Deposit Amount
module.exports.deposit = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		
		var currency_data = await Currency.findOne({ where: { currency_symbol: 'USDT' } });
		var response = await user.findOne({ where: { unique_id: req.body.unique_id } });
		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'User not found' })
		else if (parseFloat(currency_data.deposit_min) > parseFloat(req.body.amount))
			res.status(201).send({ status: false, code: 400, message: 'Minimum Deposit is '+(currency_data.deposit_min)+' USDT' })
		else if (currency_data.deposit_max < req.body.amount)
			res.status(201).send({ status: false, code: 400, message: 'Maximum Deposit is '+(currency_data.deposit_max)+' USDT' })
		else{
			var fee = ((req.body.amount * currency_data.deposit_fee) / 100).toFixed(8);
			var new_data = {
				user_id : response.user_id,
				unique_id : req.body.unique_id,
				type: 'Deposit',
				amount: (parseFloat(req.body.amount) - parseFloat(fee)),
				currency: req.body.currency,
				status: 'Inprogress',
				branch: req.body.branch,
				created: new Date(),
				fee : fee,
				total_amount : req.body.amount
			}

			var created = await crypto.create(new_data);
				if(created){	
					res.status(200).send({status:true, code:200, message:'Deposit added successfully'})
				}
				else
					res.status(201).send({status:false, code:400, message:'Deposit not created, Please try later' })
				
		}
		
	}
}

//Show Deposit Amount QRCode Data
module.exports.get_deposit_amount = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var date = new Date();

		
		var unique_id = (req.body.unique_id);
		var response = await user.findOne({ where: { unique_id: unique_id } });
		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'User not found, Please update the Correct User Id' })
		else if (!response.isActive)
			res.status(201).send({ status: false, code: 400, message: 'User account has been blocked.' })
		else {

			var amount = await crypto.sum('amount', { where: { user_id: response.user_id.toString(), status: "Inprogress", type:"Deposit" } });
			if(amount == null)
				amount = 0;

			res.status(200).send({ status: true, code: 200,  unique_id : response.unique_id })
			

		}

	}
}


//deposit Withdraw history
module.exports.manual_history = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var date = new Date();
		
		var response = await crypto.findAll({ where : {  }, order: [ ['created', 'DESC'] ]  });



		res.status(200).send({ status: true, code: 200, message: 'Manual History', data: response })

	}
}


module.exports.manual_history_view = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var id = req.params.id;
		
		var response = await crypto.findOne({ where : { id : id } });

		res.status(200).send({ status: true, code: 200, message: 'Manual History Details', data: response })

	}
}

//Withdraw List
module.exports.withdraw_list = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var date = new Date();
		

		var response = await crypto.findAll({ 
			
			where : { status:'Inprogress', type:"Withdraw" },
			attributes:['user_id', 'unique_id','currency' ,'branch','status','fee','total_amount',
				[sequelize.fn('sum', sequelize.col('amount')),'final_amount' ],
				[sequelize.fn('max', sequelize.col('created')),'created_date' ]
			],
			// order: [ ['created', 'DESC'] ],
			group: ["user_id",'unique_id','currency','branch','status','fee','total_amount'] 
		});

		res.status(200).send({ status: true, code: 200, message: 'Withdraw History', data: response })

	}
}

//Approve Withdraw
module.exports.update_withdraw_wallet = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var date = new Date();
		var unique_id = (req.body.unique_id);
		var response = await user.findOne({ where: { unique_id: unique_id } });

		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'User not found' })
		else if (!response.phoneVerified)
			res.status(201).send({ status: false, code: 400, message: 'User account is not yet activated' })
		else if (!response.isActive)
			res.status(201).send({ status: false, code: 400, message: 'User account has been blocked.' })
		else {

var user_email = Encrypter.decrypt_data(response.email);
			var amount = await crypto.sum('amount', { where: { user_id: response.user_id.toString(), status: "Inprogress", type:"Withdraw" } });
			if(amount == null)
				amount = 0;
				
			if(amount > 0){
				var user_id =  parseInt(response.user_id);
				var update_amount = await wallet.decrement({ USDT:  parseFloat(amount) }, { where: { user_id: user_id } });
					if (update_amount) {
						var mail_data = {
							"##date##":Helper.dateToDMY(new Date()),
							"##user##":response.firstname,                           
							"##amount##":amount
						}, subject_data = {};
						Mailer.send({to:user_email, changes:mail_data, subject:subject_data, template:'withdraw'});
						var response =  await crypto.update({  status: "Completed" }, { where: { user_id: response.user_id, type:"Withdraw" } });
						res.status(200).send({ status: true, code: 200, message: 'Wallet Updated Successfully' })
					}else{
						res.status(201).send({ status: false, code: 400, message: 'Please try later' })
					}

			}else{
				res.status(201).send({ status: false, code: 400, message: 'Already  Wallet Updated' })
			}
			

		}

	}
}


//Internal Transfer history
module.exports.internal_history = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var date = new Date();
		
		var response = await transfer.findAll({ where : {  },  order: [ ['created', 'DESC'] ] });

		res.status(200).send({ status: true, code: 200, message: 'Internal Transfer History', data: response })

	}
}



module.exports.view_profile = async (req, res) => {
		if (Common._validate_origin(req, res)) {
		var response = await admin.findOne({
			where: { admin_id: req.user_id },
		  });
		
		if (response) {			
			response.email = Encrypter.decrypt_data(response.email);
			res.status(200).send({ status: true, code: 200, data: response })
		}
		else if (!response)
			res.status(201).send({ status: false, code: 200, message: 'User details not found' })
		else
			res.status(201).send({ status: false, code: 401, message: 'server not found' })
	}
}




module.exports.user_list = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var response=await user.findAll();
			if (response) {
				response = response.map(function (el) {
					el.email = Encrypter.decrypt_data(el.email);
					return el;
				})
				res.status(200).send({ status: true, code: 200, data: response })
			} else
				res.status(201).send({ status: false, code: 401, message: 'server not found' })
		
	}
}


module.exports.user_details = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var user_id = req.params.id;

		const user_data = await sequelize.query('SELECT * FROM "MONI_sresu" u LEFT JOIN "MONI_users_kyc" uk ON uk.user_id=u.user_id WHERE u.user_id='+user_id, { type: DataTypes.SELECT,nest: true,raw:true });
		/*var user_data = await user.findOne({
			where: { user_id: user_id },
		  });*/
		//var log_history = await history.find({ userId: user_id }).sort({ date: -1 }).exec();
		if (!user_data)
			res.status(201).send({ status: false, code: 400, message: 'User details not found' })
		else {
			user_data[0].email = Encrypter.decrypt_data(user_data[0].email);
			//var user_datas=JSON.stringify(user_data);
			res.status(200).send({ status: true, code: 200, data: user_data})
		}
	}
}




