var Mailer = require('../../helper/mailer'),
	TFA = require('../../helper/2fa'),
	Common = require('../../helper/common'),
	Helper = require('../../helper/helper'),
	Encrypter = require('../../helper/encrypter');


var sequelize = require('../../configdetails_cc/ZXNhYmF0YWQ');
var DataTypes = require('sequelize'); 

var userModel = require('../../models/MONI_sresu');
const user = userModel(sequelize, DataTypes);

var usertfaModel = require('../../models/MONI_users_tfa');
const user_tfa = usertfaModel(sequelize, DataTypes);

module.exports.activate = async(req, res)=>{
	if(Common._validate_origin(req, res)){
	var user_phone = req.body.phone;
	var date = new Date();
	var user_data = await user.findOne({ where:{phone:req.body.phone} });
	
	if(!user_data)
		res.status(201).send({status:false, code:400, message:'User not found'});
	else if(!user_data.isActive)
		res.status(201).send({status:false, code:400, message:'Your account has been blocked. Please contact our support' });
	else if(user_data.phoneVerified)
		res.status(201).send({status:false, code:400, message:'Account already activated'});
	else{
		if(((date.getTime() - user_data.resetTime.getTime())/(1000 * 60)) > 1500)  //15
			res.status(201).send({status:false, code:400, message:'Your code was expired',  d: date.getTime(), dd:user_data.resetTime.getTime(), d1:((date.getTime() - user_data.resetTime.getTime())/(1000 * 60))  });
		else if(user_data.emailVerifiedToken !== req.body.code)
			res.status(201).send({status:false, code:400, message:'Invalid code'})
		else{
			var user_email = Encrypter.decrypt_data(user_data.email)
			// Create Wallet
				TFA.generate_tfa(user_email, async(err, tfa_data)=>{
				if(tfa_data){
					activated = await user.update( {phoneVerified:true, tfa:tfa_data}, { where:{user_id:user_data.user_id} }  );

					var optional = { created: new Date(), user_id:user_data.user_id,  };
					var tfa_data1 = Object.assign({}, tfa_data, optional);
					var response = await user_tfa.create(tfa_data1)
					
					if(activated){
					 	var mail_data = {
					 		"##date##":Helper.dateToDMY(new Date()),
					 		"##user##":user_data.firstname
					 	}, subject_data = {};
						Mailer.send({to:user_email, changes:mail_data, subject:subject_data, template:'register'})
						res.status(200).send({status:true, code:200, message:'Account activated successfully', data:tfa_data})
					}
					else{
						// Delete Wallet
							res.status(201).send({status:false, code:400, message:'Please try later'})
						
					}
				}else{
					// Delete Wallet
						res.status(201).send({status:false, code:400, message:'Please try later'})
					
				}	
				})
			
		}
	}
	}
}
