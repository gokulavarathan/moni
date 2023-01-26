const binance_trade = require('../trade/binance-connector');
var sequelize=require('../../configdetails_cc/ZXNhYmF0YWQ');
var DataTypes = require('sequelize'); 
var  OrderModel  = require('../../models/MONI_order');
var  UserModel  = require('../../models/MONI_sresu');
var  ETModel  = require('../../models/MONI_refsnart_lanretxe');
var  PairModel  = require('../../models/MONI_pair');
var  CurrencyModel  = require('../../models/MONI_currency');
var  WalletModel  = require('../../models/MONI_tellaw');

const order = OrderModel(sequelize, DataTypes);
const transfer = ETModel(sequelize, DataTypes);
const pair = PairModel(sequelize, DataTypes);
const currency = CurrencyModel(sequelize, DataTypes)
;
const wallet = WalletModel(sequelize, DataTypes);
const user = UserModel(sequelize, DataTypes);
var Common = require('../../helper/common');

module.exports.binance_info = async (req, res) => { 
    var withdraw_details={
        coin:'ETH',
        address:'0xfa97c22a03d8522988c709c24283c0918a59c795',           
        amount:'1',           
       };
    binance_trade._withdraw(withdraw_details,(result)=>{
        
       });
};

module.exports.external = async (req, res) => {    
    if (Common._validate_origin(req, res)) {
        var user_id = (req.user_id);
		var response = await user.findOne({ where: { user_id: user_id } });
		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'User not found' })
		else if (!response.phoneVerified)
			res.status(201).send({ status: false, code: 400, message: 'Your account is not yet activated' })
		else if (!response.isActive)
			res.status(201).send({ status: false, code: 400, message: 'Your account has been blocked. Please contact our support' })

            else {
                var currency = req.body.currency;
                var amount = req.body.amount;     
        var withdraw_details={
            coin:'ETH',
            address:'0xfa97c22a03d8522988c709c24283c0918a59c795',           
            amount:'1',           
           };
           
                var currency_data = await Currency.findOne({ where: { currency_symbol: currency } });
                var balance = await wallet.findOne({ where: { user_id: user_id } });    
                if (parseFloat(currency_data.external_min) > parseFloat(amount))
					res.status(201).send({ status: false, code: 400, message: 'Minimum Internal Transfer is '+(currency_data.internal_min)+' '+ currency })
				else if (currency_data.external_max < amount)
					res.status(201).send({ status: false, code: 400, message: 'Maximum Internal Transfer is '+(currency_data.internal_max)+' '+currency })
                else if (balance[currency] < parseFloat(amount)) {
                    res.status(201).send({ status: false, code: 400, message: 'Insufficient Balance' })
                }
                else {
                var fee = ((req.body.amount * currency_data.internal_fee) / 100).toFixed(8);
                let u_data = {};
               // u_data[currency] = amount;        
                u_data[currency] = (parseFloat(amount) - parseFloat(fee));
                var update_amount = await wallet.decrement(u_data, { where: { user_id: user_id } });                
                var data = {
                    user_id: user_id,
                    binance_transaction_id:binance_transaction_id ,               
                    amount: amount,
                    currency: currency,
                    status: "Completed",
                    fee:fee,
                    total_amount:(parseFloat(amount) - parseFloat(fee))

    
                }
                binance_trade._withdraw(withdraw_details,(result)=>{
                 
                   });
                var update_transfer = await transfer.create(data)
                if (update_transfer) {
                    res.status(200).send({ status: true, code: 200, message: 'Amount Transfer Successfully' })
                } else {
                    res.status(201).send({ status: false, code: 400, message: 'Please try later' })
                }
            }
    
            }
        }
        
         
    };
  
    module.exports.get_deposit_address = async (req, res) => {  
     
        if (Common._validate_origin(req, res)) {
            var withdraw_details={
                coin:'ETH',
                address:'0xfa97c22a03d8522988c709c24283c0918a59c795',           
                amount:'1',           
               };
            binance_trade._withdraw(withdraw_details,(result)=>{
             
               });
            
        }
    };

    module.exports.get_external_transfer = async (req, res) => {
        if (Common._validate_origin(req, res)) {
    
            var user_id = (req.user_id);
            var tot_count = await transfer.count({  where:{user_id:user_id}  });
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
                transfer.belongsTo(user, { foreignKey: 'user_id' });
                var response=await transfer.findAll({ where:{user_id:user_id},include:[{
                    model: user,                  
                    attributes:['unique_id']
                }],order: [['created','DESC' ]],offset: offset, limit: limit });            
                   
                res.status(200).send({ status: true, code: 200, data: response,tot_count:tot_count })
    
            }
        }
    }
    


