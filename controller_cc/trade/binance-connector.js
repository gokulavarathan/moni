const { Spot } = require('@binance/connector')


//const apiKey = 'WPZQGFX2Lv7s7Xv5cIRvKFf290AYZx1xCWHeHE0FU9j76Uf1wVbgxgAgvlee2qol';
//const apiSecret = '2RXiS53Hz3RhU8aWgSoxFo01QmYDk4d20XVs2RcSLOQWSAAwFJpSzb1eqzMZk88Y';


const apiKey = '5jeXvjdQ7Nyc6D7X1cbPiBZRuVKHGngGfNchYR3SJo8G7iDxhZvZctUnK08q5RL7';
const apiSecret ='xI2QOxcJ3NGgftMFzZedNalAd3AgxzWHUdPPcj0tEL47kESpHKkgh0lFS63eCZTO'; 

const apiUrl='https://testnet.binance.vision/api/';
//,{ baseURL: 'https://testnet.binance.vision/'}
const client = new Spot(apiKey, apiSecret,{ baseURL: 'https://testnet.binance.vision/'});module.exports._withdraw = (data, cb) => {
 
// Get account information
client.account().then(response => client.logger.log(response.data))


module.exports.binance_info = (cb) => {
    client.account().then(response => client.logger.log(response.data))
};

//    var withdraw_details={
//     amount:0.5,
//     coin:"ETH",
//     address:'0xfa97c22a03d8522988c709c24283c0918a59c795',
//     timestamp:1657624295  
            
//    };
 //client.withdrawHistory({ });
// client.withdraw(withdraw_details,(err,response)=>
// {


// });
/* client.withdraw(withdraw_details, (err, response) => {

   
        if (err)
            cb({ status: false, code: 400, message: "Error in Withdraw" })
        else
            cb({ status: true, code: 200, data: response })
    })*/
}


module.exports._withdraw = (data, cb) => {
 
// Get account information
client.account().then(response => client.logger.log(response.data))


//    var withdraw_details={
//     amount:0.5,
//     coin:"ETH",
//     address:'0xfa97c22a03d8522988c709c24283c0918a59c795',
//     timestamp:1657624295  
            
//    };
 //client.withdrawHistory({ });
// client.withdraw(withdraw_details,(err,response)=>
// {


// });
/* client.withdraw(withdraw_details, (err, response) => {

   
        if (err)
            cb({ status: false, code: 400, message: "Error in Withdraw" })
        else
            cb({ status: true, code: 200, data: response })
    })*/
}

