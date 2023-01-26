var Helper = require('../../helper/helper'),
	Mailer = require('../../helper/mailer'),
	Encrypter = require('../../helper/encrypter');

var KeyFile = require('../../keyfiles/keystore'),
	TFA = require('../../helper/2fa'),
	Common = require('../../helper/common'),
	socket_config = require('../../helper/config');

	var sequelize = require('../../configdetails_cc/ZXNhYmF0YWQ');
	var DataTypes = require('sequelize'); 
	
	var userModel = require('../../models/MONI_sresu');
	const user = userModel(sequelize, DataTypes);

	var  BlockModel  = require('../../models/MONI_block_list');
	const block = BlockModel(sequelize, DataTypes);

	var HistoryModel = require('../../models/MONI_history');
	const history = HistoryModel(sequelize, DataTypes);

var total_attempt = 5;

module.exports.user_signin = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		req.body.ipaddress = req.body.ipaddress || req.headers['x-forwarded-for'].split(',').pop().trim() || req.connection.remoteAddress;
		var ip_blocked = await block.findOne({ where:{category: 'ip', name: req.body.ipaddress } });
		if (ip_blocked && ip_blocked.status == true) {
			//socket_config.sendmessage('ip-blocked', { block: true, message: 'Your ip is blocked', address: req.body.ipaddress });
			res.status(201).send({ status: false, code: 400, message: 'Your ip is blocked. Please contact our support' })
		}
		else {
			var user_phone = req.body.phone;
			var response = await user.findOne({ where:{phone: user_phone } });
			if (!response)
				res.status(201).send({ status: false, code: 400, message: 'User not found' })
			else if (!response.phoneVerified)
				res.status(201).send({ status: false, code: 400, message: 'Your account is not yet activated' })
			else if (!response.isActive)
				res.status(201).send({ status: false, code: 400, message: 'Your account has been blocked. Please contact our support.' })
			else {
				Encrypter.password_dec(req.body.password, response.salt, async (encrypted) => {
					if (encrypted.data != response.password) {
						if (response.attempt < total_attempt) {
							response.attempt = response.attempt + 1;
							var attempt_updated = total_attempt - response.attempt;
							var update_count = await user.increment( { attempt: 1 }, {where:{ user_id: response.user_id } });
							if (attempt_updated > 0)
								res.status(201).send({ status: false, code: 400, message: `The password you entered is incorrect. You have ${attempt_updated} more chances left` })
							else
								res.status(201).send({ status: false, code: 400, message: `Your account has been blocked. Please contact our support` })
						} else {
							var user_email = Encrypter.decrypt_data(response.email)
							var create_block = await block.create({ name: req.body.ipaddress, category: 'ip', date: new Date() })
							var block_ip = user.update( { isActive: false }, {where:{ user_id: response.user_id } }  );
								var mail_data = {
									"##date##": Helper.dateToDMY(new Date()),
									"##user##":  response.firstname,
									"##action##": "deactivated"
								}, subject_data = {};
								Mailer.send({ to: user_email, changes: mail_data, subject: subject_data, template: 'account_state' })
								//socket_config.sendmessage('ip-blocked', { block: true, message: 'Your account has been blocked', address: req.body.ipaddress })
							// })
							res.status(201).send({ status: false, code: 400, message: `Your account has been blocked. Please contact our support` })
						}
					}
					else {
						var user_email = Encrypter.decrypt_data(response.email)
						var log_details = { category: 'user', phone: user_phone, email: user_email, user_id: response.user_id, browser: req.body.deviceInfo.browser, version: req.body.deviceInfo.browser_version, os: req.body.deviceInfo.os, ipaddress: req.body.ipaddress, device: req.body.device };
						if (!response.tfaVerified) {
							KeyFile['login'].data['id'] = response.user_id;
							var token = Helper.create_payload(KeyFile['login'].data, KeyFile['login'].key);
							log_details.access_token = token;
							req.body.ipaddress=req.body.ipaddress.replace("::ffff:", "");
							update_loghistory(req.body.ipaddress, log_details)
							// this.create_loghistory(req.body.ipaddress, log_details, response)
							var update_token = await user.update({ attempt: 0 }, {where: { user_id: response.user_id }  });
							res.status(200).send({ status: true, code: 200, tfa: false, message: 'Hi ' + response.firstname + ', you have logged in successfully', token: token })
						}
						else {
							KeyFile['tfa_auth'].data['id'] = response.user_id;
						
							var token = Helper.create_payload(KeyFile['tfa_auth'].data, KeyFile['tfa_auth'].key);
							log_details.access_token = token;
							req.body.ipaddress=req.body.ipaddress.replace("::ffff:", "");
							update_loghistory(req.body.ipaddress, log_details)
							var update_token = await user.update({ attempt: 0 }, {where: { user_id: response.user_id }  });
							res.status(200).send({ status: true, code: 200, tfa: true, message: 'Hello secondary authentication activated', token: token })
						}
					}
				})
			}
		}
	}
}
async function update_loghistory(ip, log_details) {
	Helper._get_location_details(ip, (loc) => {
		log_details.location = loc.geoplugin_city + loc.geoplugin_regionName + loc.geoplugin_countryName;
		history.create(log_details, (err, created) => {
			return;
		});
	})
}
module.exports.authentication = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var user_id = req.user_id;
		var response = await user.findOne({  where :{ user_id: user_id} });
		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'User not found' })
		else {
		
			TFA.verify_tfa(req.body.code, response.tfa.tempSecret, (verified) => {
				if (!verified)
					res.status(201).send({ status: false, code: 400, message: 'Your Google verification code is wrong' })
				else {
					//var login = req.headers.tag == 'admin'?keys.admin:keys.login;
					KeyFile['login'].data['id'] = response.user_id;
					var token = Helper.create_payload(KeyFile['login'].data, KeyFile['login'].key);
					//login.data.level = response.level;
					//var token = jwt.sign(login.data, login.key, {expiresIn:"1d"});
					//update_loghistory(token, response._id, response.email)
					res.status(200).send({ status: true, code: 200, message: 'Hi ' + response.firstname + ', you have logged in successfully', token: token })
				}
			})
		}
	}
}

/*
async function update_loghistory(token, id, email) {
	history.findOne({ userId: id, auth: true }).sort({ date: -1 }).then(async (response) => {
		if (response) {
			var update_Data = await history.updateOne({ _id: response._id }, { $set: { access_token: token } }).exec();
		}
		return;
	})
}


module.exports.create_loghistory = async(ip, log_details, user_info)=>{
	//if(Common._validate_origin(req, res)){
	var existData = await history.findOne({userId:log_details.userId, ipaddress:ip}).exec();

	Helper._get_location_details(ip, (loc)=>{
		log_details.location = loc.city+', '+loc.region+', '+loc.country;
		loc.geoplugin_latitude = parseFloat(loc.loc).toFixed(4);
		loc.geoplugin_longitude = parseFloat(loc.loc).toFixed(4);
		log_details.latitude = ('0' + loc.loc);
		log_details.longitude = ('0' + loc.loc);

		history.create(log_details, (err, created)=>{
			if(!created){
				var data = {
					"##device##":`${created.browser} ${created.version}`, 
					"##ip##":ip, 
					"##location##":log_details.location, 
					"##date##":Helper.dateToDMY(new Date()), 
					"##os##":`${log_details.os}`,
					"##user##":user_info.profileUpdated == true?user_info.firstname:'',
				}, subject_data = {};
				Mailer.send({to:Encrypter.decrypt_data(log_details.email), changes:data, subject:subject_data, template:'new_device'});	
			}
			return;
		});	
	})
//}
}*/