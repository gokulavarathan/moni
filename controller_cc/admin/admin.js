var Async = require('async');
var jwt = require('jsonwebtoken');
var encryptor = require('simple-encryptor')('TmV4YWJvb2sjJDEyM0VuY3J5cHRvcg');
var Common = require('../../helper/common');
var Mailer = require('../../helper/mailer');
var Encrypter = require('../../helper/encrypter'), Helper = require('../../helper/helper');
var keys = require('../../keyfiles/keystore');


var sequelize = require('../../configdetails_cc/ZXNhYmF0YWQ');
var DataTypes = require('sequelize');
var { Op } = require('sequelize');
var UserModel = require('../../models/MONI_sresu');
var WhileModel = require('../../models/MONI_while_list');
var PairModel = require('../../models/MONI_pair');
var AdminModel = require('../../models/MONI_admin');
var CryptoModel = require('../../models/MONI_otpyrc');
var BlockModel = require('../../models/MONI_block_list');
var CurrencyModel = require('../../models/MONI_currency');
var HistoryModel = require('../../models/MONI_history');
var UserKycModel = require('../../models/MONI_users_kyc');
var FaqModel = require('../../models/MONI_faq');
var TFA = require('../../helper/2fa');


const admin = AdminModel(sequelize, DataTypes);
const pair = PairModel(sequelize, DataTypes);
const block = BlockModel(sequelize, DataTypes);
const crypto = CryptoModel(sequelize, DataTypes);
const history = HistoryModel(sequelize, DataTypes);
const user = UserModel(sequelize, DataTypes);
const user_kyc = UserKycModel(sequelize, DataTypes);
const white_list = WhileModel(sequelize, DataTypes);
const currency = CurrencyModel(sequelize, DataTypes);
const faq = FaqModel(sequelize, DataTypes);

user_kyc.belongsTo(user, { foreignKey: 'user_id',as:'user' });
/*module.exports.get_users = async (req, res) => {
const admin = await sequelize.query("SELECT * FROM admin", { type: QueryTypes.SELECT });
res.status(200).json(admin)	
};*/



var AWS = require("aws-sdk");
var fs = require('fs');
var s3config = require("../../configdetails_cc/s3.env");




module.exports.loghistory = (req, res) => {
	history.findAll({ where: { category: "admin" } }).then((response) => {
		response = response.map(e => {
			e.email = Encrypter.decrypt_data(e.email);
			return e;
		})
		res.status(200).send({ status: true, data: response })
	})

}
module.exports.login = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		req.body.ipaddress = req.body.ipaddress || req.connection.remoteAddress || req.headers['x-forwarded-for'].split(',').pop().trim();		
		var ip_blocked = await block.findOne({ where: { category: 'ip', name: req.body.ipaddress } });
		if (ip_blocked && ip_blocked.status == true) {
			res.status(201).send({ status: false, code: 400, message: 'Your ip is blocked. Please contact Admin' })
		}
		else {
			var user_email = Encrypter.encrypt_data(req.body.username.toLowerCase());
			var user_pattern = Encrypter.encrypt_data(req.body.pattern);
			
			var response = await admin.findOne({
				where: { email: user_email },
			});
			
		
			if (!response) {
				
				res.status(201).send({ status: false, code: 400, message: 'User not found' });
			}
			else if (req.headers.tag != 'admin') {
				//	socket_config.sendmessage('account_lock', { message: 'Unauthorized request', status: true, data: req.body })
				res.status(201).send({ status: false, code: 400, message: 'Unauthorized' })
			}

			else if (!response.isactive)
				res.status(201).send({ status: false, code: 400, message: 'Hi ' + response.firstname + ', your account was blocked. Please contact admin to unblock your account.' })
			else if (response.pattern !== user_pattern) {
			
				res.status(201).send({ status: false, code: 400, message: 'Username or password or pattern is incorrect' })
			}
			else {
				Encrypter.password_dec(req.body.password, response.salt, (encrypted) => {
					//	if (encrypted.data != response.password) {
					if (encrypted.data != response.password) {
						if (response.attempt < 5) {
							var update_count = admin.update({ email: response.email, attempt: sequelize.literal('attempt + 1') }, {
								where: { admin_id: response.admin_id }
							});
						}
						else {
							var update_count = admin.update({ email: response.email, attempt: 0 }, {
								where: { admin_id: response.admin_id }
							});
							block.create({ category: 'ip', name: req.body.ipaddress, date: new Date() }, (err, block_ip) => {
								res.status(201).send({ status: false, code: 400, message: 'You Exceed the Login' })
								//socket_config.sendmessage('ip-blocked-admin', { status: true, block: true, message: 'Your ip is blocked', address: req.body.ipaddress })
							})
						}
						res.status(201).send({ status: false, code: 400, message: 'Password Incorrect' })
					}
					else {
						if (response.attempt >= 5) {
							res.status(201).send({ status: false, code: 400, message: 'You Exceed the Login' });
							return false;
						}
						var ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] ||
							req.connection.remoteAddress ||
							req.socket.remoteAddress ||
							req.connection.socket.remoteAddress;
						ip = ip.split(',')[0];
						ip = ip.split(':').slice(-1);
						let ipaddress = ip[0];
					
						white_list.findOne({ where: { address: ipaddress,status:true } }).then((response_) => {
							if (response_ == null) {
								res.status(201).send({ status: false, code: 400, message: 'Access denied' })
								return false;
							}

							//browser: req.body.deviceInfo.browser, version: req.body.deviceInfo.browser_version, os: req.body.deviceInfo.os, ipaddress: req.body.ipaddress
							var category_ = response.subadmin == null ? 'admin' : 'subadmin';
							var log_details = { category: category_, userId: response.admin_id, email: user_email, browser: req.body.deviceInfo.browser,os: req.body.deviceInfo.os,version: req.body.deviceInfo.version,ipaddress: req.body.ipaddress};
							if (!response.tfaverified) {
								req.body.ipaddress=req.body.ipaddress.replace("::ffff:", "");
								update_loghistory(req.body.ipaddress, log_details)							
								keys['login'].data.id = response.admin_id;
								var token = Helper.admin_create_payload(keys['login'].data, keys['key']);
								var update_token = admin.update({ access_token: token }, {
									where: { admin_id: response.admin_id }
								});
								var permission = response.permission;
								
								res.status(200).send({ status: true, code: 200, tfa: false, message: 'Hi admin, you have logged in successfully', token: token, role: response.role, permission: permission })

							}
							else {
								log_details.auth = true;
								req.body.ipaddress=req.body.ipaddress.replace("::ffff:", "");
								update_loghistory(req.body.ipaddress, log_details)
								keys['tfa_auth'].data.id = response.admin_id;
								var token = Helper.admin_create_payload(keys['tfa_auth'].data, keys['key']);
								var permission = response.permission;
								res.status(200).send({ status: true, code: 200, tfa: true, message: 'Hello admin, secondary authentication activated', token: token, permission: permission })
							}
						})
					}

				})

			}

		}
	}


};

async function update_loghistory(ip, log_details) {
	Helper._get_location_details(ip, (loc) => {
		log_details.location = loc.geoplugin_city + loc.geoplugin_regionName + loc.geoplugin_countryName;
		history.create(log_details, (err, created) => {
			return;
		});
	})
}


module.exports.check_ip = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var ip = req.body.ipAddress||req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] ||
							req.connection.remoteAddress ||
							req.socket.remoteAddress ||
							req.connection.socket.remoteAddress;
						ip = ip.split(',')[0];
						ip = ip.split(':').slice(-1);
						let ipaddress = ip[0];
						white_list.findOne({ where: { address: ipaddress,status:true } }).then((response_) => {
							if (response_ == null) {
								res.status(201).send({ status: false, code: 400, message: 'Ip Not Found' })
								return false;
							}
							else
							{
								res.status(201).send({ status: true, code: 200, message: 'Ip Found' })
								return false;
							}


						});
	}
}


module.exports.view_profile = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var response = await admin.findOne({
			where: { admin_id: req.user_id },
		});

		if (response) {
			response.email = Encrypter.decrypt_data(response.email);
			res.status(200).send({ status: true, code: 200, data: response })
		}
		else if (!response)
			res.status(201).send({ status: false, code: 200, message: 'User details not found' })
		else
			res.status(201).send({ status: false, code: 401, message: 'server not found' })
	}
}

module.exports.generate_tfa = async (req, res) => {
	if (Common._validate_origin(req, res)) {		
		var admin_data = await admin.findOne({
			where: { admin_id: req.user_id },
		});
		var admin_email = Encrypter.decrypt_data(admin_data.email)
		//var admin_email = admin_data.email
		
		await TFA.generate_tfa(admin_email, (err, tfa_data) => {
			if (tfa_data) {
				
				var updates = admin.update({ dataURL: tfa_data.dataURL, otpURL: tfa_data.otpURL, tempSecret: tfa_data.tempSecret }, {
					where: { admin_id: req.user_id }
				});
				if (updates)
					res.status(200).send({ status: true, code: 200, data:tfa_data,message: 'TFA updated successfully' })
				else
					res.status(201).send({ status: false, code: 400, message: 'TFA not generated. Please try later' })

			} else
				res.status(201).send({ status: false, code: 400, message: 'Network error. Unable to generate TFA' })
		})
	 
	}
}
module.exports.tfa = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var admin_data = await admin.findOne({
			where: { admin_id: req.user_id },
		});
		//var admin_data = await admin.findOne({ _id: req.user_id }, { email: 1, tfa: 1, tfaverified: 1 }).exec();
		if (!admin_data)
			res.status(201).send({ status: false, code: 400, message: 'No results found' })
		else {
			TFA.verify_tfa(req.body.code, admin_data.tempSecret, (verified) => {
				if (verified) {
					if (admin_data.tfaverified) {					
							
							
								var updates = admin.update({  tfaverified: false }, {
									where: { admin_id: req.user_id }
								});

								if (updates)
									res.status(200).send({ status: true, code: 200, message: 'TFA disabled successfully' })
								else
									res.status(201).send({ status: false, code: 400, message: 'Please try later' })

					}
					else {
						var updates = admin.update({ tfaverified: true }, {
							where: { admin_id: req.user_id }
						});

						if (updates)
							res.status(200).send({ status: true, code: 200, message: 'TFA enabled successfully' })
						else if (!updates)
							res.status(201).send({ status: false, code: 400, message: 'TFA enable failed. Please try later.' })
						else
							res.status(201).send({ status: false, code: 401, message: 'Please try later' })

					}
				} else
					res.status(201).send({ status: false, code: 400, message: 'OTP expired' })
			})
		}
	}
}
module.exports.verify_tfa_code = async (req, res) => {
	// if (Common._validate_origin(req, res)) {
	var adnin_data = await admin.findOne({
		where: { admin_id: req.user_id },
	});

	if (!adnin_data)
		res.status(201).send({ status: false, code: 400, message: 'Admin details not found' })
	else if (!adnin_data.isactive)
		res.status(201).send({ status: false, code: 400, message: 'Your account has blocked. Please contact our support' })
	else if (!adnin_data.tfaverified)
		res.status(201).send({ status: false, code: 400, message: 'Please enable your TFA service' })
	else {
		TFA.verify_tfa(req.body.code, adnin_data.tempSecret, (verified) => {
			if (verified)
				res.status(201).send({ status: true, code: 200, message: 'TFA verified successfully' })
			else
				res.status(201).send({ status: false, code: 400, message: 'OTP code expired' })
		})
	}
	// }
}
module.exports.forget_password = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var emails = Encrypter.encrypt_data(req.body.email.toLowerCase());
		var response = await admin.findOne({
			where: { email: emails },
		});

		if (!response)
			res.status(200).send({ status: false, code: 400, message: 'No results found' })
		else if (response) {
			res.status(200).send({ status: false, code: 400, message: 'Notification Sent' })
			//	var notification = notify.create({ email: 'admin', category: 'admin', message: 'Request to get password. Request sent by ' + req.body.email + 'on ' + Helper.dateToDMY(new Date()), date: new Date() });
		}
		else
			res.status(200).send({ status: false, code: 400, message: 'server not found' })

	}
}

module.exports.update_pattern = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var response = await admin.findOne({
			where: { admin_id: req.user_id },
		});
		if (!response)
			res.status(200).send({ status: false, code: 400, message: 'No results found' })
		else if (req.body.new_pattern != req.body.confirm_pattern)
			res.status(201).send({ status: false, code: 400, message: 'Pattern mismatched' })
		else if (response) {
			var encrypted = Encrypter.encrypt_data(req.body.new_pattern)
			if (response.pattern == encrypted)
				res.status(201).send({ status: false, code: 400, message: 'New password must be differ from previous' });
			else {
				var updated = admin.update({ pattern: encrypted }, {
					where: { admin_id: req.user_id }
				});

				if (updated)
					res.status(200).send({ status: true, code: 200, message: 'Pattern updated successfully' })
				else
					res.status(200).send({ status: false, code: 400, message: 'Pattern not updated' })

			}
		}
		else
			res.status(200).send({ status: false, code: 400, message: 'server not found' })

	}
}
module.exports.update_profile = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		req.body.email = Encrypter.encrypt_data(req.body.email);
		var updated = admin.update({ username:req.body.username,email:req.body.email}, {
			where: { admin_id: req.user_id }
		});
		if (updated)
			res.status(200).send({ status: true, code: 200, message: 'Profile updated successfully' })
		else if (!updated)
			res.status(201).send({ status: false, code: 400, message: 'Profile not updated' })
		else
			res.status(201).send({ status: false, code: 401, message: 'server not found' })

	}
}
module.exports.add_admin = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var user_email = req.body.email;
		req.body.email = Encrypter.encrypt_data(req.body.email.toLowerCase());
		
		var exists = await admin.findOne({
			where: { email: req.body.email },
		});

		if (!exists) {
			Encrypter.password_enc(req.body.password, (encrypted) => {

				TFA.generate_tfa(user_email, async (err, tfa_data) => {
					if (tfa_data) {
						var new_data = {
							username: req.body.username,
							email: req.body.email,
							salt: encrypted.salt,
							password: encrypted.encr.data,
							role: 'admin',
							pattern: Encrypter.encrypt_data(req.body.pattern),
							dataURL: tfa_data.dataURL,
							otpURL: tfa_data.otpURL,
							tempSecret: tfa_data.tempSecret,
							permission: req.body.permission,

						};
					} else {
						
						res.status(201).send({ status: false, code: 400, message: 'TFA Not Created' })
					}





					created = await admin.create(new_data);
					if (created) {
						var mail_data = {
							"##date##": Helper.dateToDMY(new Date()),
							"##username##": user_email,
							"##password##": req.body.password,
							"##pattern##": req.body.pattern,
							"##htusername##": Config.ht_access.user,
							"##htpassword##": Config.ht_access.pass
						}, subject_data = {};
						Mailer.send({ to: user_email, changes: mail_data, subject: subject_data, template: 'subadmin' });
						res.status(200).send({ status: true, code: 200, message: 'Admin added successfully' })
					}
					else
						res.status(201).send({ status: false, code: 400, message: 'Subadmin not created' })

				})
			})
		} else if (exists)
			res.status(201).send({ status: true, code: 400, message: 'This email already exists' })
		else
			res.status(201).send({ status: true, code: 400, message: 'Server not found' })
	}
}
module.exports.user_list = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var response = await user.findAll({order: [['created', 'DESC']]});
		if (response) {
			response = response.map(function (el) {
				el.email = Encrypter.decrypt_data(el.email);
				return el;
			})
			res.status(200).send({ status: true, code: 200, data: response })
		} else
			res.status(201).send({ status: false, code: 401, message: 'server not found' })

	}
}


module.exports.approve_kyc = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var user_data = await user_kyc.findOne({
			where: { user_id: req.params.id },
		});
	
		var data = {};
		if (req.params.page === 'proof')
			user_data.proofstatus = 1;
		else if (req.params.page === 'selfie')
			user_data.selfiestatus = 1;
		else
			res.status(201).send({ status: false, code: 400, message: 'Unable to approve KYC proof' })

		if (user_data.proofstatus == 1 && user_data.selfiestatus == 1) {
			user_data.kycVerified = true;
		}


		var users_data = await user.findOne({
			where: { user_id: req.params.id },
		});
		var user_email = Encrypter.decrypt_data(users_data.email);

		/*var update_count = admin.update({ email: response.email,attempt:0 }, {
								where: { admin_id: response.admin_id}
							  });*/
		if (req.params.page === 'proof'){
			var updated = await user_kyc.update({ proofstatus: user_data.proofstatus }, { where: { user_id: user_data.user_id } });
			
			if (user_data.proofstatus == 1 && user_data.selfiestatus == 1) {
				user_data.kycVerified = true;			
				var updated1 = await user.update({ kycVerified: true }, { where: { user_id: user_data.user_id } });
			}
			

			if (updated && user_data.kycVerified == true) {
				//socket_config.sendmessage('kyc_updates', { unique_id: user_data.unique_id, _id: user_data._id, message: "KYC verified successfully" })
				var mail_data = {
					'##user##': user_data.kycVerified ? user_data.firstname : '',
					'##date##': Helper.dateToDMY(new Date())
				}, subject_data = {};
				Mailer.send({ to: user_email, changes: mail_data, subject: subject_data, template: 'kycapprove' })
				res.status(200).send({ status: true, code: 200, message: 'Proof are approved. KYC service activated to ' + user_email })
			}
			else if (updated)
				res.status(200).send({ status: true, code: 200, message: 'KYC proof approved successfully' })
			else if (!updated)
				res.status(201).send({ status: false, code: 400, message: 'Unable to approve KYC proof' })
			else
				res.status(201).send({ status: false, code: 401, message: 'server not found' })
		}
		else {
			var updated = await user_kyc.update({ selfiestatus: user_data.selfiestatus }, { where: { user_id: user_data.user_id } });

			if (user_data.proofstatus == 1 && user_data.selfiestatus == 1) {
				user_data.kycVerified = true;
				var updated1 = await user.update({ kycVerified: true }, { where: { user_id: user_data.user_id } });
			}

			if (updated && user_data.kycVerified == true) {
				//socket_config.sendmessage('kyc_updates', { unique_id: user_data.unique_id, _id: user_data._id, message: "KYC verified successfully" })
				var mail_data = {
					'##user##': user_data.kycVerified ? user_data.firstname : '',
					'##date##': Helper.dateToDMY(new Date())
				}, subject_data = {};
				Mailer.send({ to: user_email, changes: mail_data, subject: subject_data, template: 'kycapprove' })
				res.status(200).send({ status: true, code: 200, message: 'Proof are approved. KYC service activated to ' + user_email })
			}
			else if (updated)
				res.status(200).send({ status: true, code: 200, message: 'KYC proof approved successfully' })
			else if (!updated)
				res.status(201).send({ status: false, code: 400, message: 'Unable to approve KYC proof' })
			else
				res.status(201).send({ status: false, code: 401, message: 'server not found' })

		}
	}
}

module.exports.approve_kycc = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var subject_data = 'Monifiex testing';
		var mail_data = {
			'##user##': 'user',
			'##date##': Helper.dateToDMY(new Date())
		}, subject_data = {};
		var user_email = '';
		Mailer.send({ to: user_email, changes: mail_data, subject: subject_data, template: 'kycapprove' })
		res.status(200).send({ status: true, code: 200, message: 'Proof are approved. KYC service activated to ' })

	}
}

module.exports.user_details = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var user_id = req.params.id;

		const user_data = await sequelize.query('SELECT * FROM "MONI_sresu" u LEFT JOIN "MONI_users_kyc" uk ON uk.user_id=u.user_id WHERE u.user_id=' + user_id, { type: DataTypes.SELECT, nest: true, raw: true });
		/*var user_data = await user.findOne({
			where: { user_id: user_id },
		  });*/
		//var log_history = await history.find({ userId: user_id }).sort({ date: -1 }).exec();
		if (!user_data)
			res.status(201).send({ status: false, code: 400, message: 'User details not found' })
		else {

			user_data[0].email = Encrypter.decrypt_data(user_data[0].email);
			//var user_datas=JSON.stringify(user_data);
			res.status(200).send({ status: true, code: 200, data: user_data })
		}
	}
}
module.exports.reject_kyc = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		// var user_data = await user.findOne({ _id: req.params.id }).exec()
		var user_data = await user_kyc.findOne({
			where: { user_id: req.params.id },
		});
		var data = {}, document_data = '';

		if (req.params.page === 'proof')
			user_data.proofstatus = 2;
		else if (req.params.page === 'selfie')
			user_data.selfiestatus = 2;
		else
			res.status(201).send({ status: false, code: 400, message: 'Unable to approve KYC proof' })

	
		if (req.params.page == "proof")
			var selected_proof = user_data.proofname;
		else
			var selected_proof = "selfie";

		/*	if (user_data.kyc.proofstatus == 0 && user_data.kyc.selfiestatus == 0) {
				user_data.kyc.proofname = '';
				user_data.kyc.Date = '';
				user_data.firstname = '';
				user_data.username = '';
				user_data.lastname = '';
				user_data.kyc.proofnumber = '';
				user_data.address = '';
				user_data.city = '';
				user_data.state = '';
				user_data.age = null;
				user_data.pincode = null;
				user_data.gender = '';
				user_data.dob = '';
				user_data.country = '';
				user_data.accountConfirm = false;
				user_data.termsCondition = false;
			}*/



		// var reason = "<ul>" + req.body.reason.map(e => { return "<li>" + e + "</li>" }).join("") + "</ul>";
		var reason = req.body.reason;

		var users_data = await user.findOne({
			where: { user_id: req.params.id },
		});
		var user_email = Encrypter.decrypt_data(users_data.email);

		if (req.params.page === 'proof') {
			var updated = await user_kyc.update({ proofstatus: 2 }, { where: { user_id: user_data.user_id } });
			var updated1 = await user.update({ kycVerified: false }, { where: { user_id: user_data.user_id } });
			if (updated) {
				var message = `${reason}`;
				var mail_data = {
					'##user##': user_data.proofstatus == 2 ? user_data.firstname : '',
					'##date##': Helper.dateToDMY(new Date()),
					"##reason##": message,
					"##proof##": selected_proof
				}, subject_data = { "##proof##": selected_proof };
				Mailer.send({ to: user_email, changes: mail_data, subject: subject_data, template: 'kycreject' })
				res.status(200).send({ status: true, code: 200, message: 'Proof rejected successfully' })
			}
			else
				res.status(201).send({ status: false, code: 401, message: 'Unable to reject KYC proof' })
		}
		else {

			var updated = await user_kyc.update({ selfiestatus: 2 }, { where: { user_id: user_data.user_id } });
			if (updated) {
				var message = `${reason}`;
				var mail_data = {
					'##user##': user_data.profileUpdated == true ? user_data.firstname : '',
					'##date##': Helper.dateToDMY(new Date()),
					"##reason##": message,
					"##proof##": selected_proof
				}, subject_data = { "##proof##": selected_proof };
				Mailer.send({ to: user_email, changes: mail_data, subject: subject_data, template: 'kycreject' })
				res.status(200).send({ status: true, code: 200, message: 'Proof rejected successfully' })
			}
			else
				res.status(201).send({ status: false, code: 401, message: 'Unable to reject KYC proof' })


		}

	}
}

module.exports.change_password = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var admin_data = await admin.findOne({ where: { admin_id: req.user_id } })
		if (!admin_data)
			res.status(201).send({ status: false, code: 400, message: 'user not found' })
		else if (req.body.new_password != req.body.confirm_password)
			res.status(201).send({ status: false, code: 400, message: 'Password mismatched' })
		else {
			Encrypter.password_dec(req.body.new_password, admin_data.salt, (encrypted) => {
				Encrypter.password_dec(req.body.old_password, admin_data.salt, (encrypted_old) => {
					if (encrypted_old.data == admin_data.password) {

						if (encrypted.data == admin_data.password)
							res.status(201).send({ status: false, code: 400, message: 'New password must be differ from previous' });
						else {

							admin.update({ password: encrypted.data }, { where: { admin_id: admin_data.admin_id } }).then((response) => {
								if (response) {
									var admin_email = Encrypter.decrypt_data(admin_data.email);
									var phisingCode = '';
									Mailer.send({ to: admin_email, changes: { '##anticode##': phisingCode, '##date##': Helper.dateToDMY(new Date()) }, template: 'changepassword' })
									res.status(200).send({ status: true, code: 200, message: 'Hi ' + admin_data.username + ', your password updated successfully' })
								}
								else if (response.nModified == 0)
									res.status(201).send({ status: true, code: 400, message: 'Your new password not updated' })
								else
									res.status(201).send({ status: false, code: 401, message: 'server not found' })
							})


						}
					}
					else {
						res.status(201).send({ status: false, code: 401, message: 'Old password is incorrect' })
					}
				})
			})
		}
	}
}

module.exports.add_whiteip = async (request, res) => {
	var ip = request.headers['cf-connecting-ip'] || request.headers['x-forwarded-for'] ||
		request.connection.remoteAddress ||
		request.socket.remoteAddress ||
		request.connection.socket.remoteAddress;
	ip = ip.split(',')[0];
	ip = ip.split(':').slice(-1);
	let ipaddress = ip[0];
	white_list.findOne({ where: { address: ipaddress } }).then((response) => {
		if (response == null) {
			white_list.create({ address: ipaddress, status: true, date: new Date(), udate: new Date() }).then((added) => {
				if (added)
					res.json({ status: true, ip: "IP added successfully." });
			})

		}
		else {
			res.json({ status: true, data: "Already added." });
		}

	})

}


module.exports.currency_list = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var response = await currency.findAll();
		if (response) {
			res.status(200).send({ status: true, code: 200, data: response })
		} else
			res.status(201).send({ status: false, code: 401, message: 'server not found' })

	}
}



module.exports.currency_view = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var response = await currency.findOne({ where: { currency_id: req.params.id } });
		if (response) {
			res.status(200).send({ status: true, code: 200, data: response })
		} else
			res.status(201).send({ status: false, code: 401, message: 'server not found' })

	}
}

module.exports.currency_update = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var response = currency.update(req.body, { where: { currency_id: req.body.currency_id } });
		if (response) {
			res.status(200).send({ status: true, code: 200, message: "currency details successfully updated." })
		} else
			res.status(200).send({ status: false, code: 200, message: 'server not found' })
	}
}


module.exports.pair_list = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		// var response=await pair.findAll()
		var response = await pair.findAll({
			attributes: ['pair_id', 'firstcurrency',
				'secondcurrency', 'marketprice', 'lastprice', 'min_amount',
				'max_amount', 'pair', 'buyerfee', 'sellerfee', 'status', 'high', 'low', 'volume', 'priceChangePercent']
		});
		if (response) {
			res.status(200).send({ status: true, code: 200, data: response })
		} else
			res.status(201).send({ status: false, code: 401, message: 'server not found' })

	}
}



module.exports.pair_view = async (req, res) => {
	if (Common._validate_origin(req, res)) {		
		var response = await pair.findOne({ attributes: ['pair_id', 'firstcurrency', 'secondcurrency', 'marketprice', 'lastprice', 'marketprice', 'min_amount', 'max_amount', 'pair', 'buyerfee', 'sellerfee', 'status'], where: { pair_id: req.params.id } });
		if (response) {
			res.status(200).send({ status: true, code: 200, data: response })
		} else
			res.status(201).send({ status: false, code: 401, message: 'server not found' })

	}
}

module.exports.pair_update = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var response = pair.update(req.body, { where: { pair_id: req.body.pair_id } });
		if (response) {
			res.status(200).send({ status: true, code: 200, data: "pair details successfully updated." })
		} else
			res.status(200).send({ status: false, code: 200, message: 'server not found' })
	}
}


module.exports.faq_list = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		// var response=await faq.findAll()
		var response = await faq.findAll({ attributes: ['faq_id', 'title', 'content', 'status'] });
		if (response) {
			res.status(200).send({ status: true, code: 200, data: response })
		} else
			res.status(201).send({ status: false, code: 401, message: 'server not found' })

	}
}



module.exports.faq_view = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var response = await faq.findOne({ attributes: ['faq_id', 'title', 'content', 'status'], where: { faq_id: req.params.id } });
		if (response) {
			res.status(200).send({ status: true, code: 200, data: response })
		} else
			res.status(201).send({ status: false, code: 401, message: 'server not found' })

	}
}

module.exports.faq_update = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var response = faq.update(req.body, { where: { faq_id: req.body.faq_id } });
		if (response) {
			res.status(200).send({ status: true, code: 200, data: "faq details successfully updated." })
		} else
			res.status(200).send({ status: false, code: 200, message: 'server not found' })
	}
}



module.exports.faq_add = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var response = faq.create(req.body);
		if (response) {
			res.status(200).send({ status: true, code: 200, data: "faq successfully added." })
		} else
			res.status(200).send({ status: false, code: 200, message: 'server not found' })
	}
}


module.exports.dashboard = async (req, res) => {
	var userlist = await user.findAll();
	var deposit = await crypto.findAll({ where: { type: "Deposit" } });
	var withdraw = await crypto.findAll({ where: { type: "Withdraw" } });
	var approve = await user_kyc.findAll({ where: { proofstatus: 1, selfiestatus: 1 } });
	var reject =await user_kyc.findAll({ where: { [Op.or]: [{ proofstatus: 2 }, { selfiestatus: 2 }] } });
	var pending = await user_kyc.findAll({
		where: { [Op.or]: 
			[{ [Op.and]: [{ proofstatus: 0 }, { front: {  [Op.not]: null } }]  },
			{ [Op.and]: [{ selfiestatus: 0 }, { selfie: {  [Op.not]: null } }]  }] 	
		} });
	var admin_login = await history.findAll({ where: { category: "admin" } });
	res.status(200).send({ status: true, code: 200, users_count: userlist.length, deposit_count: deposit.length, withdraw_count: withdraw.length, 
		approve_count: approve.length, reject_count:  reject.length, pending_count:  pending.length,  admin_loginhistory_count: admin_login.length, })
}




module.exports.kyc_approve_list = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var response = await user_kyc.findAll({
			where: { proofstatus: 1, selfiestatus: 1 },
			include: [{
				model: user,
			    as:'user',
				attributes: ['user_id', 'firstname', 'lastname', 'phone', 'unique_id'],

			}], order: [['created', 'DESC']]
		});

		if (response) {
			res.status(200).send({ status: true, code: 200, data: response })
		} else
			res.status(201).send({ status: false, code: 401, message: 'server not found' })

	}
}


module.exports.kyc_reject_list = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var response = await user_kyc.findAll({
			where: { [Op.or]: [{ proofstatus: 2 }, { selfiestatus: 2 }] },
			include: [{
				model: user,
				as:'user',
				attributes: ['user_id', 'firstname', 'lastname', 'phone', 'unique_id'],

			}], order: [['created', 'DESC']]
		});

		if (response) {
			res.status(200).send({ status: true, code: 200, data: response })
		} else
			res.status(201).send({ status: false, code: 401, message: 'server not found' })

	}
}
module.exports.kyc_pending_list = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		
		var response = await user_kyc.findAll({
			where: { [Op.or]: 
				[{ [Op.and]: [{ proofstatus: 0 }, { front: {  [Op.not]: null } }]  },
				{ [Op.and]: [{ selfiestatus: 0 }, { selfie: {  [Op.not]: null } }]  }]
			},
			include: [{
				model: user,
				as:'user',
				attributes: ['user_id', 'firstname', 'lastname', 'phone', 'unique_id'],

			}], order: [['created', 'DESC']]
		});

		if (response) {
			res.status(200).send({ status: true, code: 200, data: response })
		} else
			res.status(201).send({ status: false, code: 401, message: 'server not found' })

	}
}

