var CryptoJS = require('crypto-js')

var jwt = require('jsonwebtoken'),
	request = require('request');

var key = CryptoJS.enc.Base64.parse("#base64Key#");
var iv = CryptoJS.enc.Base64.parse("#base64IV#");



module.exports.create_payload = (data, key) => {
	var token = jwt.sign(data, key, { algorithm: 'HS384' }, { expiresIn: "300" }); //1d
	return token;
}

module.exports.admin_create_payload = (data, key) => {
	var token = jwt.sign(data, key, { algorithm: 'HS384' }, { expiresIn: "2h" });
	return token;
}


module.exports._get_location_details = (ip, cb) => {
	var options = {
		url: `https://ipinfo.io/${ip}`,
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		qs: { token: '38689f73a82631' }
	};
	request(options, (error, response, body) => {
		if (body)
			cb(JSON.parse(body))
		else
			cb({ geoplugin_city: 'Madurai', geoplugin_regionName: 'Tamil Nadu', geoplugin_countryName: 'India', geoplugin_currencyCode: 'INR', geoplugin_countryCode: 'IN' })
	})
}
module.exports.dateToDMY = (date) => {
	var obj = new Date(date);
	var year = obj.getFullYear();
	var m = obj.getMonth() + 1;
	var month = m < 10 ? '0' + m : m;
	var d = obj.getDate();
	var day = d < 10 ? '0' + d : d;
	return day + '-' + month + '-' + year;
}

module.exports.dateToYMD = (date) => {
	var obj = new Date(date);
	var year = obj.getFullYear();
	var m = obj.getMonth() + 1;
	var month = m < 10 ? '0' + m : m;
	var d = obj.getDate();
	var day = d < 10 ? '0' + d : d;
	return year + "-" + month + "-" + day;
}
module.exports.decrypt_data = (param) => {
	var decipher = CryptoJS.AES.decrypt(param, key, { iv: iv }).toString(CryptoJS.enc.Utf8)
	return decipher;
}
module.exports.dateTime = (zone) => {
	var obj = new Date().toLocaleString('en-US', { timeZone: zone });
	obj = obj.split('/').join('-');
	return obj.split(',')[1];
}
module.exports.otp = () => {
	var result = (Math.floor(100000 + (+Math.random() * (999999 - 100000))));
	return result;
}


module.exports.send_sms_otp = (mobile, otp, cb) => {

	var options = {
		url: `https://2factor.in/API/V1/a3b54739-ab5e-11ec-a4c2-0200cd936042/SMS/${mobile}/${otp}`,
		method: 'GET'
	}
	request(options, (error, response, body) => {
		if (body) {
			var result = JSON.parse(body)
			cb({ status: true, data: result })
		} else
			cb({ status: false, data: {} })
	})
}





module.exports.otp = () => {
	// var result = '',
	// characters = '0123456789',
	// Length = characters.length;
	// for ( let i = 0; i < 6; i++ ) {
	// 	result += characters.charAt(Math.floor(Math.random() * Length));
	// }		
	var result = (Math.floor(100000 + (+Math.random() * (999999 - 100000))));
	return result;
}

module.exports._change_decimal = (data, num) => {
	data = parseFloat(data).toFixed(10).toString();
	var decimals = data.split('.'), first = decimals[0], second = decimals[1].substring(0, num);
	return parseFloat(`${first}.${second}`);
}

//new chnages

module.exports.validate_id = (id) => {
//	return ObjectId.isValid(id);
}

