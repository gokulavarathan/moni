var jwt = require('jsonwebtoken'),
	socket = require('./config'),//chnages for sesssion time out
	path = require('path');

var keys = require('../keyfiles/keystore'),
	Authenticate = require('./alert'),
	// whitelist = require('../configdetails_cc/KSJOFIERWROPWERUWER');
	whitelist = require('../configdetails_cc/RklMRSCQUNLVVA');

// exports.verify_origin = async (req, res, next) => {
// 	if (whitelist.indexOf(req.headers.origin) > -1)
// 		next()
// 	else {
// 		await Authenticate._alertMessage(req);
// 		res.status(401).sendFile(path.join(__dirname, '../views/error.html'))
// 	}
// }
// exports.verify_origin = async (req, res, next) => {
// 	if (whitelist.origin.white_list.indexOf(req.headers.origin) > -1)
// 		next()
// 	else {
// 		await Authenticate._alertMessage(req);
// 		res.status(401).sendFile(path.join(__dirname, '../views/error.html'))
// 	}
// }

exports.verify_origin = async (req, res, next) => {
//	if (whitelist.url_list.indexOf(req.headers.origin) > -1)
		next()
	/*else {
		await Authenticate._alertMessage(req);
		res.status(401).sendFile(path.join(__dirname, '../views/error.html'))
	}*/
}


exports.isAdmin = (req, res, next) => {
	if (req.headers.tag === 'admin')
		next()
	else
		res.status(401).sendFile(path.join(__dirname, '../views/error.html'))
}


exports.isauthenticated = (req,res,next)=>{
	var secret_key = req.headers.tag == 'admin'?keys.admin.key:keys.login.key;
	
	var token = req.headers.tag == 'admin'?req.headers.authorization:req.headers.authorization;
	if(token == undefined || token == null || token == '')
		res.status(201).send({status:false, code:401, message:'Authentication failed. Your authentication token is required'})
	else{
		jwt.verify(token, secret_key, (err, decoded)=>{
		
		if(decoded){
			req.user_id = decoded.id;
			req.level = decoded.level;
			if(req.headers.tag == 'admin'){
				req.role = decoded.role;
			}
			next()
		}else{
			//socket.sendmessage('timeout', {status:true, token:token, message:'Session Timeout'})
			res.status(201).send({status:false, code:400, message:'Token expired'})
		}
		})
	}
}

exports.verify_user = (req, res, next)=>{
	var secret_key = keys.login.key;
	var token = req.headers.authorization;
	req.isUser = false;
	if(token == undefined || token == null || token == '')
		next()
	else{
		jwt.verify(token, secret_key, (err, decoded)=>{
		if(decoded){
			req.isUser = true;
			req.user_id = decoded.id;
			req.level = decoded.level;
		}
		next()
		})
	}
}

exports.secondaryAuth = (req,res,next)=>{
	var secret_key = req.headers.tag == 'admin'?keys.admin_auth.key:keys.tfa_auth.key;
	
	var token = req.headers.tag == 'admin'?req.headers.authorization:req.headers.authorization;
	if(token == undefined || token == null || token == '')
		res.status(201).send({status:false, code:401, message:'Authentication failed. Your authentication token is required'})
	else{
		jwt.verify(token, secret_key, (err, decoded)=>{
		if(decoded){
			req.user_id = decoded.id;
			req.level = decoded.level;
			next()
		}else{
			// socket.sendmessage('timeout', {status:true, token:token, message:'Session Timeout'})
			res.status(201).send({status:false, code:400, message:'Token expired'})
		}
		})	
	}
}

exports.ForgetAuth = (req,res,next)=>{
	var secret_key = req.headers.tag == 'admin'?keys.forget.key:keys.forget.key;
	var token = req.headers.tag == 'admin'?req.headers.authorization:req.headers.authorization;
	if(token == undefined || token == null || token == '')
		res.status(201).send({status:false, code:401, message:'Authentication failed. Your authentication token is required'})
	else{
		jwt.verify(token, secret_key, (err, decoded)=>{
		if(decoded){
			req.user_id = decoded.id;
			req.level = decoded.level;
			next()
		}else{
			// socket.sendmessage('timeout', {status:true, token:token, message:'Session Timeout'})
			res.status(201).send({status:false, code:400, message:'Token expired'})
		}
		})	
	}
}

exports.isauthenticatedadmin = (req, res, next) => {
	var secret_key = keys.key;
	var token = req.headers.authorization;
	jwt.verify(token, secret_key, (err, decoded) => {
			
		if (decoded) {

			req.user_id = decoded.id;
			req.level = decoded.level;
			next()
		} else {
			//socket.sendmessage('timeout', {status:true, token:token, message:'Session Timeout'})
			res.status(201).send({ status: false, code: 400, message: 'Token expired' })
		}
	})
}


exports.verify_token = (req, res, next) => {
	var token = req.headers.authorization;
	if (token == undefined || token == null || token == ''){
		res.status(201).send({status:false, code:400, message:'Unauthorized'})
		// res.status(401).sendFile(path.join(__dirname, '../views/error.html'))
	}else{
		next()
	}
}
exports.validate_session = (details, cb) => {
	var secret_key = keys.key;
	var token = details.access_token;
	jwt.verify(token, secret_key, (err, decoded) => {
		if (err)
			cb({ status: false })
		else
			cb({ status: true })
	})
}
