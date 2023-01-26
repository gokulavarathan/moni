const binance_trade = require('../trade/binance-trade');
var Mailer = require('../../helper/mailer'),Helper = require('../../helper/helper'),Encrypter = require('../../helper/encrypter');

var sequelize=require('../../configdetails_cc/ZXNhYmF0YWQ');
var DataTypes = require('sequelize'); 
var  OrderModel  = require('../../models/MONI_order');
var  UserModel  = require('../../models/MONI_sresu');
var  UserKycModel  = require('../../models/MONI_users_kyc');
var  TradeModel  = require('../../models/MONI_edart');
var  PairModel  = require('../../models/MONI_pair');
var  CurrencyModel  = require('../../models/MONI_currency');
var  WalletModel  = require('../../models/MONI_tellaw');

const order = OrderModel(sequelize, DataTypes);
const trade = TradeModel(sequelize, DataTypes);
const pair = PairModel(sequelize, DataTypes);
const currency = CurrencyModel(sequelize, DataTypes);
const wallet = WalletModel(sequelize, DataTypes);
const user = UserModel(sequelize, DataTypes);
const user_kyc = UserKycModel(sequelize, DataTypes);
trade.belongsTo(user, { foreignKey: 'user_id',as:'user'});
var Common = require('../../helper/common');  

module.exports.place_order = async (req, res) => {    
    if (Common._validate_origin(req, res)) {
       
        var trade_datas = req.body;
  
        var firstcurrency= trade_datas.pair.split('/')[0].toUpperCase();
		var secondcurrency=trade_datas.pair.split('/')[1].toUpperCase();
        var fpair=firstcurrency.toUpperCase()+'/'+secondcurrency.toUpperCase();
    
		trade_datas.token = req.headers.authorization;
		trade_datas.user_id = req.user_id;
		trade_datas.amount = parseFloat(trade_datas.amount).toFixed(8);
		trade_datas.price = trade_datas.pair.split('/')[1].toLowerCase() !== "inr" ? parseFloat(trade_datas.price).toFixed(8) : parseFloat(trade_datas.price).toFixed(2);
		trade_datas.total = parseFloat(trade_datas.amount) * parseFloat(trade_datas.price);
		trade_datas.total = trade_datas.pair.split('/')[1].toLowerCase() !== "inr" ? parseFloat(trade_datas.total).toFixed(8) : parseFloat(trade_datas.total).toFixed(2);
        var user_data = await user.findOne({ where:{user_id:trade_datas.user_id } });	
        var user_kyc_data = await user_kyc.findOne({ where:{user_id:trade_datas.user_id,proofstatus:1,selfiestatus:1 } });	
		var pair_data = await pair.findOne({ where: {pair: fpair} ,raw:true});
        var ods_type=trade_datas.type.toLowerCase();
        if(ods_type=='buy')
        {
            var pair_fees=pair_data.buyerfee; 
        }
        if(ods_type=='sell')
        {
            var pair_fees=pair_data.sellerfee; 
        }
         var data = {
			user_id: trade_datas.user_id,
			amount: parseFloat(trade_datas.amount),
			temp: parseFloat(trade_datas.amount),
			filled: 0,
			binanceOrder: false,
			binanceOrderId: '', 
			binanceClientId: '',
			price: parseFloat(trade_datas.price),
			total: parseFloat(trade_datas.total),
			pair: trade_datas.pair.toLowerCase(),
			firstcurrency: trade_datas.pair.split('/')[0].toLowerCase(),
			secondcurrency: trade_datas.pair.split('/')[1].toLowerCase(),
			type: trade_datas.type.toLowerCase(),
			ordertype: trade_datas.ordertype.toLowerCase(),
			status: 'active',
			date: new Date()
		};
     
        var debitcurrency = data.type == 'buy' ? data.secondcurrency.toUpperCase() : data.firstcurrency.toUpperCase();
		var debitamount = data.type == 'buy' ? data.total : data.amount;
        var wallet_data = await wallet.findOne({ where:{user_id: trade_datas.user_id } });		
		var coin_data = await currency.findOne({where:{ currency_symbol: data.firstcurrency }});
           
		var balance = wallet_data[debitcurrency];
  
        var user_email = Encrypter.decrypt_data(user_data.email);
         
        if (!user_data)
			res.status(200).send({ status: false, code: 400, message: "User not found" })
		else if (!user_data.isActive)
			res.status(200).send({ status: false, code: 401, message: 'Your account has been blocked. Please contact our support' })
		else if (!user_kyc_data)
			res.status(200).send({ status: false, code: 400, message: 'Please verify your kyc' })
		else if (!wallet_data)
			res.status(200).send({ status: false, code: 400, message: "Unable to fetch your wallet details" })
		else if (balance == 0)
			res.status(200).send({ status: false, code: 400, message: `Insufficient balance` })
		else if (balance < debitamount )
			res.status(200).send({ status: false, code: 400, message: "Insufficient balance" })
		
		else {            
            var binance_order_details = {
                pair: trade_datas.pair,
                amount: trade_datas.amount,
                price: trade_datas.price,
                type: trade_datas.type,
                ordertype: trade_datas.ordertype,
                total :  trade_datas.amount * trade_datas.price
            };
            binance_trade.place_order_binance(binance_order_details,(result)=>{
          
                if(result.status)
                {                    
                    let bin_data = result.data;
                    data.binanceClientId =  bin_data.clientOrderId;
                    data.trans_date = bin_data.transactTime;
                    data.binanceOrderId =  bin_data.orderId;
                  
                    var executedfeebal= (data.type=='sell')  ? bin_data.executedQty : bin_data.cummulativeQuoteQty;
                   var executedbal= bin_data.cummulativeQuoteQty;
                   
                    var fee = ((executedfeebal * pair_fees) / 100).toFixed(8);
                    data.fee=fee;
                    data.executedbal=executedbal;
                    var response= trade.create(data);

                    if (response)
                    {                     
                        
                          if(bin_data.status=='FILLED')
                          {                           
                            if(data.type=='buy')
                            {
                                var currencybalance =  wallet_data[data.firstcurrency.toUpperCase()];
                                var creditcurrency = data.firstcurrency.toUpperCase();
                                var updatedbalance=balance-executedbal;                               
                                let u_data = {};
                                u_data[debitcurrency] = updatedbalance;                  
                                var update_walleta = wallet.update(u_data, {
                                where: { user_id:trade_datas.user_id}
                                });	

                                var currencyupdatedbalance = parseFloat(currencybalance)+ parseFloat(debitamount);
                                let executedu_data = {};
                                executedu_data[creditcurrency] = currencyupdatedbalance;  
                                var update_wallets = wallet.update(executedu_data, {
                                    where: { user_id:trade_datas.user_id}
                                  });
                            }
                            else{
                                var currencybalance =  wallet_data[data.secondcurrency.toUpperCase()];
                                var creditcurrency = data.secondcurrency.toUpperCase();
                                var updatedbalance=balance-debitamount; 
                         
                                let u_data = {};
                                u_data[debitcurrency] = updatedbalance;                  
                                var update_walletd = wallet.update(u_data, {
                                where: { user_id:trade_datas.user_id}
                                });	
                                var currencyupdatedbalance = parseFloat(currencybalance)+ parseFloat(executedbal);
                              
                                let executedu_data = {};
                                executedu_data[creditcurrency] = currencyupdatedbalance;  
                                var update_walletf = wallet.update(executedu_data, {
                                    where: { user_id:trade_datas.user_id}
                                  });
                            }
                           

///BNB/USDT          --- first currency===BNB for buy  BNB credit, For Sell second===BNB debit
                  


                          }

                         var mail_data = {
                            "##date##":Helper.dateToDMY(new Date()),
                            "##user##":user_email,  
                            "##ORDERTYPE##":data.ordertype,  
                            "##PAIR##":data.pair,  
                            "##AMOUNT##":data.amount,  
                            "##BINANCEORDER##":bin_data.clientOrderId, 
                        }, subject_data = {};
                        Mailer.send({to:user_email, changes:mail_data, subject:subject_data, template:'buysell'});
                
                    res.status(200).send({ status: true, code: 200, message: 'Order placed successfully' })
                    }
                    else {            
                    res.status(200).send({ status: false, code: 400, message: "Order not placed....." })
                    }
                    // insert the data
                 
                }
                else
                {
                    res.status(200).send({ status: true, code: 200, message: 'Binance balance Not Sufficient' })
                }
        
            });
        }
        
         
    }
};

module.exports.admin_transaction_history = async (req, res) => {    
    
    if (Common._validate_origin(req, res)) {
        user_id=req.user_id;
     
        var response=await trade.findAll({ include:[ {
            model: user,
            as:'user',
           attributes:['unique_id']
        }],order: [['created_on','DESC' ]] });      
        if (!response)
        res.status(201).send({ status: false, code: 400, message: 'User details not found' })
        else {	
           
        res.status(200).send({ status: true, code: 200, data: response})
        }
	}
};


module.exports.transaction_history = async (req, res) => {  
     
    if (Common._validate_origin(req, res)) {
        user_id=req.user_id;       
        const tot_count = await trade.count({ where: {   
            user_id:user_id
            }    
        });
        
        let limit=req.body.limit==0?tot_count:req.body.limit;
        let offset=req.body.offset==0?0:req.body.offset;
        var response=await trade.findAll({
        where: {   
        user_id:user_id
        },order: [['created_on','DESC' ]], include: [{
            model: user, 
            as:'user',  
            attributes:['unique_id']
        }],offset: offset, limit: limit
        
        });   
       /* var response=await trade.findAll({attributes: ['user_id', 'pair',
        [sequelize.fn('count', sequelize.col('amount')), 'total_amount'],], group:['user_id','pair'] });*/
        if (!response)
        res.status(201).send({ status: false, code: 400, message: 'User details not found' })
        else {	
           
        res.status(200).send({ status: true, code: 200, data: response,tot_count:tot_count})
        }
	}
};


module.exports.buysellsconversion = async (req, res) => {  
    if (Common._validate_origin(req, res)) {
        var fpair=req.body.firstcurrency.toUpperCase()+'/'+req.body.secondcurrency.toUpperCase();
        //let fpair=req.body.pair;        
        var pair_data = await pair.findOne({attributes:['marketprice','firstcurrency','secondcurrency','pair'], where: {pair: fpair} ,raw:true});
        res.status(201).send({ status: true, code: 400, data: pair_data })
    }
    
};