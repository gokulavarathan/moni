var express = require('express'),
    cron = require('node-cron'),
    Async = require('async'),
    getJSON = require('get-json'),//
    request = require('request');

var Helper = {
    Request: require('../helper/2fa')
}

var sequelize = require('../configdetails_cc/ZXNhYmF0YWQ');
var DataTypes = require('sequelize');
var currencyModel = require('../models/MONI_currency');
const Currency = currencyModel(sequelize, DataTypes);

var  PairModel  = require('../models/MONI_pair');

const pair = PairModel(sequelize, DataTypes);

var router = express.Router();


module.exports = router;

cron.schedule(' */1 * * * *', () => {
    update_pair_price();
})
async function update_pair_price() { 
    //let api_url='https://api.binance.com/api/v3/ticker/price?symbols=[%22BTCUSDT%22,%22BNBUSDT%22]';	
	pair.findAll({attributes:['pair_id','firstcurrency','secondcurrency','marketprice']}).then((response)=>{        
		response = response.map(e => {
					let pairs = e.firstcurrency+e.secondcurrency;
                    let pairsd = e.firstcurrency+'/'+e.secondcurrency;
                    let lastprice=e.marketprice;
                   
                   // let apiUrl='https://api.binance.com/api/v3/ticker/price?symbol='+pairs;

                   let apiUrl=' https://www.binance.us/api/v3/ticker/24hr?symbol='+pairs;
                    
                    getJSON (apiUrl, function (error, abiResponse) { 
                        if (!error) {                      
                           let price=abiResponse.lastPrice; 
                           let priceChangePercent= abiResponse.priceChangePercent;
                           let volume=abiResponse.volume;         
                           let highPrice=abiResponse.highPrice;
                           let lowPrice=abiResponse.lowPrice;                                            
                           var response = pair.update({ marketprice: price,lastprice:lastprice,high:highPrice,low:lowPrice,volume:volume,priceChangePercent:priceChangePercent}, {where: {pair:pairsd}});

                                                                                 
                        } else {
                          let errRes ={
                                 
                            message: error
                          }
                          
                        }
                      });
					return e;
				})
	
	})
    
}


router.get('/update-coin-price', (req, res) => {
    usd();
    res.status(201).send({ status: true, code: 200, data: "success" })
})


async function usd() {

    var currdata = await Currency.findAll({ where: { status: true } });

    for (let i = 0; i < currdata.length; i++) {
      
        Helper.Request._getmarketPriceUSD((currdata[i].currency_name).toLowerCase(), async (priceResult) => {

        	if (priceResult.status) {
                var update_code = await Currency.update({ USD_price: priceResult.data }, { where: { currency_name: currdata[i].currency_name } });

        	}
        })
    }

}