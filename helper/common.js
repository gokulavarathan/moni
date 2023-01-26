var path = require('path');
getJSON = require('get-json')
request = require('request')


var	Verification = require('../VhJVEVMSVNU/RklMRSCQUNLVVA'),
	_Security = require('../QkFDSVQ/RklMRSXSElURUxJUQ'),
	Authenticate = require('./alert');

module.exports._validate_origin = (req, res)=>{
	/*if(Verification.url_list.indexOf(req.headers.origin) > -1)
		return this._validateSuccess(req)
	else
		this._errorResponse(req, res)*/
		return true;
}

module.exports._validateResponse = (req, res)=>{
	if(_Security.url_list.indexOf(req.headers.referer.substring(0, req.headers.referer.length, -1)) > -1)
		return this._validateSuccess(req)
	else
		this._errorResponse(req, res)
}

module.exports._errorResponse=async(req, res)=>{
	await Authenticate._alertMessage(req);
	res.status(401).sendFile(path.join(__dirname, '../views/error.html'))
}

module.exports._validateSuccess= (req)=>{
	return true;
}


module.exports.waitSomeTime = () => {
	let time = Math.abs(Math.floor(Math.random() * (4000 - 1000) + 1000));
	return new Promise((resolve, reject) => { setTimeout(resolve, time); });
};

