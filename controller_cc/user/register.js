
var Helper = require('../../helper/helper'),
	Mailer = require('../../helper/mailer'),
	Common = require('../../helper/common'),
	Encrypter = require('../../helper/encrypter');

var KeyFile = require('../../keyfiles/keystore');

var twilio_config = require("../../configdetails_cc/twilio.env");

var sequelize = require('../../configdetails_cc/ZXNhYmF0YWQ');
var DataTypes = require('sequelize'); 

var userModel = require('../../models/MONI_sresu');
const user = userModel(sequelize, DataTypes);

var  BlockModel  = require('../../models/MONI_block_list');
const block = BlockModel(sequelize, DataTypes);

var walletModel = require('../../models/MONI_tellaw');
const wallet = walletModel(sequelize, DataTypes);

var userkycModel = require('../../models/MONI_users_kyc');
const user_kyc = userkycModel(sequelize, DataTypes);


module.exports.user_signup = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var check = req.body.email.split('@')[1].toLowerCase();
		var email_blocked = await block.findOne({ where:{ category: 'email', name: check, status: true } });
		
		if (email_blocked)
			res.status(201).send({ status: false, code: 400, message: 'Your email extension is restricted on site' , data:email_blocked  })
		else {
			var user_email = req.body.email;
			var user_phone = req.body.phone;
			req.body.email = Encrypter.encrypt_data(req.body.email.toLowerCase());
			var email_exists = await user.findOne({ where:{ email: req.body.email }, attributes: ['email']  });
			var phone_exists = await user.findOne({ where:{ phone: req.body.phone }, attributes: ['phone'] });
			if (email_exists)
				res.status(201).send({ status: false, code: 400, message: 'This email address has already exist' })
			else if (phone_exists)
				res.status(201).send({ status: false, code: 400, message: 'This phone number has already exist' })
			else {
				var verification_code = Helper.otp();
				Encrypter.password_enc(req.body.password, async(encrypted) => {
					var optional = { created: new Date(), salt: encrypted.salt, emailVerifiedToken: verification_code, cronExecuted: new Date() };
					req.body = Object.assign({}, req.body, optional);
					req.body.resetTime = new Date();
					var uni_id = Encrypter.uni_id();
					req.body.unique_id = ('MON' + uni_id);
					req.body.password = encrypted.encr.data;
					 req.body.favourite = {"USDT":0,"BTC":0,"ADA":0,"LTC":0,"DOT":0,"BNB":0,"ETH":0,"LINK":0};
					var response = await user.create(req.body)
				
						if (!response)
							res.status(201).send({ status: false, code: 400, message: 'Your registration has been denied' })
						else {
							var response1 = await wallet.create({'user_id': response.user_id })
							var responsse2 = await user_kyc.create({'user_id': response.user_id, 'created': new Date() })



							KeyFile['register'].data.id = user_phone;
							var token = Helper.create_payload(KeyFile['register'].data, KeyFile['key']);
							//twilio
							res.status(200).send({ status: true, tfa: false, code: 200, message: 'Kindly check your Mobile to get your activation code!', token: token, 
							 check_otp:verification_code })
						}
					// })
				})
			}
		}
	}
}





module.exports.resend = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var user_data = await user.findOne({ where:{phone: req.body.phone } });
			if (!user_data)
				res.status(201).send({ status: false, code: 400, message: 'User not found' })
			if(!user_data)
				res.status(201).send({status:false, code:400, message:'User not found'});
			else if(!user_data.isActive)
				res.status(201).send({status:false, code:400, message:'Your account has been blocked. Please contact our support' });
			else if(user_data.phoneVerified)
				res.status(201).send({status:false, code:400, message:'Account already activated'});
			else {
				var verification_code = Helper.otp();
				var user_email = Encrypter.decrypt_data(user_data.email);
				var user_phone = user_data.phone;
				KeyFile['register'].data.id = user_phone;
				var token = Helper.create_payload(KeyFile['register'].data, KeyFile['key']);
				await user.update({ emailVerifiedToken: verification_code, resetTime: new Date() }, { where: { user_id : user_data.user_id } });
					//twilio
					res.status(200).send({ status: true, code: 200, message: 'verification code send successfully.', token: token, check_otp:verification_code })
				
			}
		
	}
}

