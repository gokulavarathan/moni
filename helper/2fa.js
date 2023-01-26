var speakeasy = require("speakeasy"),
	request = require('request'),
	cron = require('node-cron'),
	qrcode = require('qrcode');

var site_data = { sitename: 'MONIFIEX' };






module.exports = {
	generate_tfa: async function (email, callback) {
		var data = { issuer: site_data.sitename, name: `${site_data.sitename} (${email})`, length: 10 };
		var secret = await speakeasy.generateSecret(data);
		var url = speakeasy.otpauthURL({ secret: secret.base32, label: email, issuer: site_data.sitename, encoding: 'base32' })
		qrcode.toDataURL(url, (err, dataURL) => {
			if (dataURL)
				callback(null, { tempSecret: secret.base32, dataURL: dataURL, otpURL: secret.otpauth_url, status: false })
			else
				callback(err, null)
		})
	},
	
	
	verify_tfa: async function (code, secret, callback) {
		var verified = await speakeasy.totp.verify({ secret: secret, encoding: 'base32', token: code });
		callback(verified)
	},


	generate_qrcode: async function (amount,user_id, callback) {
		var data = { issuer: site_data.sitename, amount: amount, user_id: user_id,  name: `${site_data.sitename} (${user_id})`, length: 10 };
		//var secret = await speakeasy.generateSecret(data);
		var url = speakeasy.otpauthURL({ secret: secret.base32, label: user_id, issuer: site_data.sitename, encoding: 'base32' })
		qrcode.toDataURL(url, (err, dataURL) => {

			if (dataURL)
				callback(null, {  dataURL: dataURL, status: true })
			else
				callback(err, null)
		})
	},

	_getmarketPriceUSD: async function (cur, cb) {
		await request(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cur}&order=market_cap_desc&per_page=100&page=1&sparkline=false`, (error, response, body) => {
			if (body.length < 20) {
				cb({ status: false })
			} else {
				var abiResponse = JSON.parse(body)
				// let finalRecevice = {
				// 	id: abiResponse[0].id,
				// 	high: abiResponse[0].high_24h,
				// 	low: abiResponse[0].low_24h,
				// 	change: abiResponse[0].price_change_percentage_24h,
				// 	volume: abiResponse[0].total_volume,
				// 	marketprice: (abiResponse[0].current_price / 10) + abiResponse[0].current_price,
				// 	lastprice: (abiResponse[0].current_price / 10) + abiResponse[0].current_price,
				// 	secondcurrency: 'usd'
				// }
				cb({ status: true, data: abiResponse[0].current_price })

			}


		})
	}

	


};