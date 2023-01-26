var email_pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

module.exports.register = (req, res, next)=>{
	if(req.body.email == undefined || req.body.email == null || req.body.email == '')
		res.status(201).send({status:false, code:400, message:'Email address is required'})
	else if(!email_pattern.test(req.body.email))
		res.status(201).send({status:false, code:400, message:'Invalid email address'})
	else if(req.body.password == undefined || req.body.password == null || req.body.password == '')
		res.status(201).send({status:false, code:400, message:'Password is required'})
	else if(req.body.password.length < 8 || req.body.password.length > 30)
		res.status(201).send({status:false, code:400, message:'Password should be 8-30 characters only'})
	else if(req.body.phone == undefined || req.body.phone == null || req.body.phone == '')
		res.status(201).send({status:false, code:400, message:'Telephone is required'})
	else
		next()
};

module.exports.login = (req, res, next)=>{
 	if(req.body.phone == undefined || req.body.phone == null || req.body.phone == '')
  	res.status(201).send({status:false, code:400, message:'Telephone  is required'})
	else if(req.body.password == undefined || req.body.password == null || req.body.password == '')
  	res.status(201).send({status:false, code:400, message:'Password is required'})
	else
  	next()
}

module.exports.reset_password = (req, res, next)=>{
	if(req.body.password == undefined || req.body.password == null || req.body.password == '')
		res.status(201).send({status:false, code:400, message:'Password is required'})
	else if(req.body.password.length < 8 || req.body.password.length > 30)
		res.status(201).send({status:false, code:400, message:'Password should be 8-30 characters only'})
	else if(req.body.confirm_password == undefined || req.body.confirm_password == null || req.body.confirm_password == '')
		res.status(201).send({status:false, code:400, message:'Confirm password is required'})
	else if(req.body.password !== req.body.confirm_password)
		res.status(201).send({status:false, code:400, message:'Password mismatched'})
	else
		next()
}

module.exports.forget_password = (req, res, next)=>{
 	if(req.body.phone == undefined || req.body.phone == null || req.body.phone == '')
    	res.status(201).send({status:false, code:400, message:'Telephone is required'})
	else
		next()
}


module.exports.change_password = (req, res, next)=>{
	if(req.body.old_password == undefined || req.body.old_password == null || req.body.old_password == '')
		res.status(201).send({status:false, code:400, message:'Old Password is required'})
	else if(req.body.new_password == undefined || req.body.new_password == null || req.body.new_password == '')
		res.status(201).send({status:false, code:400, message:'New Password is required'})
	else if(req.body.confirm_password == undefined || req.body.confirm_password == null || req.body.confirm_password == '')
		res.status(201).send({status:false, code:400, message:'Confirm Password is required'})
	else if(req.body.new_password.length < 8 || req.body.new_password.length > 30)
		res.status(201).send({status:false, code:400, message:'New Password should be 8-30 characters only'})
	else if(req.body.confirm_password == undefined || req.body.confirm_password == null || req.body.confirm_password == '')
		res.status(201).send({status:false, code:400, message:'Confirm password is required'})
	else if(req.body.new_password !== req.body.confirm_password)
		res.status(201).send({status:false, code:400, message:'Password mismatched'})
	else
		next()
}


module.exports.authentication = async (req, res, next) => {
  if (req.body.code == undefined || req.body.code == null || req.body.code == '')
    res.status(201).send({ status: false, code: 400, message: 'OTP code is required' })
  else if (isNaN(req.body.code))
    res.status(201).send({ status: false, code: 400, message: 'OTP should contain 6 digits only' })
  else if (req.body.code.length !== 6)
    res.status(201).send({ status: false, code: 400, message: 'OTP should contain 6 digits only' })
  else
    next()
}