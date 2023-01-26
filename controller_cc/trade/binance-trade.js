var Binance = require('node-binance-api')
var Encrypter = require('../../helper/encrypter'),
BNB_CRE = require('../../configdetails_cc/QmluYWjZUZpbGUBT'),
    binance = new Binance().options({
        "APIKEY": BNB_CRE.API,
        "APISECRET": BNB_CRE.SECRET,
        useServerTime: true ,
        recvWindow: 60000,
        reconnect:true,
          "urls" : { base:'https://testnet.binance.vision/api/' }          
      // "urls" : { base:'https://api.binance.us/api/'}
    });

    

module.exports._withdraw = (data, cb) => {
   
    binance.withdraw(data, (err, response) => {
        if (err)
            cb({ status: false, code: 400, message: "Error in Withdraw" })
        else
            cb({ status: true, code: 200, data: response })
    })
}
module.exports.place_order_binance = (data, cb) => {

    this._check_balance(data, (resPonse) => {
       
        if (resPonse.status) {
            if (data.ordertype == "market") {
                if (data.type == "buy") {
                    binance.marketBuy(data.pair.replace("/", "").trim().toUpperCase(), data.amount, (error, response) => {
                       
               
                        if (error)
                            cb({ status: false, message: "Account has insufficient balance for requested action" })
                        else
                            cb({ status: true, data: response })
                    });
                } else {
                    binance.marketSell(data.pair.replace("/", "").trim().toUpperCase(), data.amount, (error, response) => {
                       
                        if (error)
                            cb({ status: false, message: "Account has insufficient balance for requested action" })
                        else
                            cb({ status: true, data: response })
                    });
                }
            } else
                cb({ status: false });
        } 
        else
            cb({ status: false });
    })
}

module.exports._check_balance = (data, cb) => {

    binance.balance((err, result) => {
    
       // return false;
        if (err)
            cb({ status: false, bal_res: 'error', balance: 0 })
        else {
            var debitcurrency = 0, debitamount;
            if (data.type.toLowerCase() == "buy") { debitcurrency = data.pair.split('/')[1].toUpperCase(); debitamount = data.amount; }
            else { debitcurrency = data.pair.split('/')[0].toUpperCase(); debitamount = data.total; }
            var balance = parseFloat(result[debitcurrency].available);
            if (balance == 0)
                cb({ status: false, bal_res: 'zero', balance: balance })
            else if (balance < debitamount)
                cb({ status: false, bal_res: 'insufficient', balance: balance })
            else
                cb({ status: true, bal_res: 'success', balance: balance })
        }
    })
}

module.exports._open_orders = (data, cb) => {
    binance.openOrders(false, (err, response) => {
        if (err)
            cb({ status: false, code: 400, message: "Error not found" })
        else
            cb({ status: true, code: 200, data: response })
    })
}

module.exports._close_orders = (data, cb) => {
    binance.trades(data.pair.replace("/", "").trim().toUpperCase(), (error, response) => {
        if (err)
            cb({ status: false, code: 400, message: "Error not found" })
        else
            cb({ status: true, code: 200, data: response })
    });
}

module.exports._cancel_order = (data, cb) => {
    binance.cancel(data.pair.replace("/", "").trim().toUpperCase(), data.binanceOrderId, (err, response) => {
        if (err) {
            cb({ status: false, code: 400, message: "Error not found" })
        }
        else
            cb({ status: true, code: 200, data: response })
    })
}

module.exports._get_status = (data, cb) => {
    
    binance.orderStatus(data.pair.replace("/", "").trim().toUpperCase(), data.binanceOrderId, (err, response) => {
        if (err)
            cb({ status: false, code: 400, message: "Error not found" })
        else
            cb({ status: true, code: 200, data: response })
    })
}