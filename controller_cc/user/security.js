var Mailer = require('../../helper/mailer'),
	Helper = require('../../helper/helper'),
	TFA = require('../../helper/2fa'),
	Common = require('../../helper/common'),
	socket_config = require('../../helper/config'),
	Encrypter = require('../../helper/encrypter');

var KeyFile = require('../../keyfiles/keystore');


var sequelize = require('../../configdetails_cc/ZXNhYmF0YWQ');
var DataTypes = require('sequelize');
const { Op } = require('sequelize');

var userModel = require('../../models/MONI_sresu');
const user = userModel(sequelize, DataTypes);

var userTFAModel = require('../../models/MONI_users_tfa');
const user_tfa = userTFAModel(sequelize, DataTypes);

var historyModel = require('../../models/MONI_history');
const history = historyModel(sequelize, DataTypes);

var userkycModel = require('../../models/MONI_users_kyc');
const user_kyc = userkycModel(sequelize, DataTypes);

var cryptoModel = require('../../models/MONI_otpyrc');
const crypto = cryptoModel(sequelize, DataTypes);

var walletModel = require('../../models/MONI_tellaw');
const wallet = walletModel(sequelize, DataTypes);

var transferModel = require('../../models/MONI_refsnart_lanretni');
const transfer = transferModel(sequelize, DataTypes);

var currencyModel = require('../../models/MONI_currency');
const currency = currencyModel(sequelize, DataTypes);

var externalModel = require('../../models/MONI_refsnart_lanretxe');
const external = externalModel(sequelize, DataTypes);

var pairModel = require('../../models/MONI_pair');
const pair = pairModel(sequelize, DataTypes);


var AWS = require("aws-sdk");
var fs = require('fs');
var s3config = require("../../configdetails_cc/s3.env");

module.exports.user_forget_password = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var user_phone = req.body.phone;

		var response = await user.findOne({ where: { phone: user_phone } });
		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'User not found' })
		else if (!response.phoneVerified)
			res.status(201).send({ status: false, code: 400, message: 'Your account is not yet activated' })
		else if (!response.isActive)
			res.status(201).send({ status: false, code: 400, message: 'Your account has been blocked. Please contact our support' })
		else {
			var user_email = Encrypter.decrypt_data(response.email);
			var user_code = Helper.otp();
			KeyFile['forget'].data.id = response.user_id;
			var token = Helper.create_payload(KeyFile['forget'].data, KeyFile['forget'].key);
			var update_code = await user.update({ verificationCode: user_code, resetTime: new Date() }, { where: { user_id: response.user_id } });
			Helper._get_location_details(req.headers['x-forwarded-for'], (loc) => {
				// var mail_data = {
				// 	'##code##': user_code,
				// 	'##datetime##': Helper.dateTime(loc['geoplugin_timezone']),
				// 	'##date##': Helper.dateToDMY(new Date()),
				// 	"##os##": `${req.headers["user-agent"].split(";")[1]}`,
				// 	"##user##": response.profileUpdated ? response.firstname : '',
				// 	"##device##": req.headers["user-agent"].split("(")[0],
				// 	"##ip##": req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress,
				// 	"##location##": loc.geoplugin_city + ', ' + loc.geoplugin_region + ', ' + loc.geoplugin_countryName,

				// }, subject_data = {};
				// var send = Mailer.send({ to: user_email, changes: mail_data, subject: subject_data, template: 'forget' });
				//SMS twilio
				res.status(200).send({ status: true, code: 200, message: 'Verification code send successfully', token: token, check_otp: user_code })
			})
		}

	}
}


module.exports.verify_confirmation_code = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var date = new Date();
		var user_id = (req.user_id);
		var response = await user.findOne({ where: { user_id: user_id } });
		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'User not found' })
		else if (!response.phoneVerified)
			res.status(201).send({ status: false, code: 400, message: 'Your account is not yet activated' })
		else if (!response.isActive)
			res.status(201).send({ status: false, code: 400, message: 'Your account has been blocked. Please contact our support' })
		// else if (((date.getTime() - response.resetTime.getTime()) / 1000) > 15 * 60)
		// 	res.status(201).send({ status: false, code: 400, message: 'Verification code expired' })
		else if (req.body.code != response.verificationCode)
			res.status(201).send({ status: false, code: 400, message: 'Your email verification code is wrong' })
		else {
			res.status(201).send({ status: true, code: 200, message: 'Verification completed successfully' })
		}

	}
}


module.exports.user_update_tfa = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var user_id = req.user_id;
		var user_data = await user.findOne({ where: { user_id: user_id } });
		if (!user_data)
			res.status(201).send({ status: false, code: 400, message: 'No results found' })
		else if (!user_data.isActive)
			res.status(201).send({ status: false, code: 401, message: 'Your account has been blocked. Please contact our support' })
		else {
			var user_email = Encrypter.decrypt_data(user_data.email);
			TFA.verify_tfa(req.body.code, user_data.tfa.tempSecret, async (tfa_verified) => {
				if (tfa_verified) {
					if (user_data.tfaVerified) {					
							
								var updated = await user.update({ tfaVerified: false }, { where: { user_id: user_id } });
								if (updated) {
									var mail_data = {
										"##date##": Helper.dateToDMY(new Date()),
										"##user##": user_data.firstname,
										"##status##": "disabled"
									}, subject_data = {};
									Mailer.send({ to: user_email, changes: mail_data, subject: subject_data, template: 'gauth_state' })
									res.status(200).send({ status: true, code: 200, message: 'TFA disabled successfully' })
								} else {
									res.status(201).send({ status: false, code: 400, message: 'Please try later' })
								}
							
						
					}
					else {
						var update_user = await user.update({ tfaVerified: true }, { where: { user_id: user_id } });
						if (update_user) {
							var mail_data = {
								"##date##": Helper.dateToDMY(new Date()),
								"##user##": user_data.firstname,
								"##status##": "enabled"
							}, subject_data = {};
							Mailer.send({ to: user_email, changes: mail_data, subject: subject_data, template: 'gauth_state' })
							res.status(200).send({ status: true, code: 200, message: 'TFA enabled successfully' })
						} else
							res.status(201).send({ status: false, code: 400, message: 'TFA enable failed. Please try later.' })
					}
				} else
					res.status(201).send({ status: false, code: 400, message: 'OTP expired' })
			})
		}
	}
}

module.exports.user_reset_password = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var user_id = (req.user_id)
		var user_data = await user.findOne({ where: { user_id: user_id } });
		if (!user_data)
			res.status(201).send({ status: false, code: 400, message: 'User details not found' })
		else if (!user_data.phoneVerified)
			res.status(201).send({ status: false, code: 400, message: 'Your account is not yet activated' })
		else if (!user_data.isActive)
			res.status(201).send({ status: false, code: 400, message: 'Your account has been blocked. Please contact our support' })
		// else if (((date.getTime() - response.resetTime.getTime()) / 1000) > 15 * 60)
		// 	res.status(201).send({ status: false, code: 400, message: 'Verification code expired' })
		else if (req.body.code != user_data.verificationCode)
			res.status(201).send({ status: false, code: 400, message: 'Your verification code is wrong' })
		else if (req.body.password !== req.body.confirm_password)
			res.status(201).send({ status: false, code: 400, message: 'Password mismatched' })
		else {
			Encrypter.password_dec(req.body.password, user_data.salt, async (encrypted) => {
				if (encrypted.data == user_data.password)
					res.status(201).send({ status: false, code: 400, message: 'New password must be differ from previous one' });
				else {
					var update_password = await user.update({ password: encrypted.data }, { where: { user_id: user_data.user_id } });
					if (update_password) {
						Helper._get_location_details(req.headers['x-forwarded-for'], (loc) => {
							var mail_data = {
								'##datetime##': Helper.dateTime(loc['geoplugin_timezone']),
								'##date##': Helper.dateToDMY(new Date()),
								"##user##": user_data.firstname,
								"##device##": req.headers["user-agent"].split("(")[0],
								"##ip##": req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress,
								"##os##": `${req.headers["user-agent"].split(";")[1]}`,
								"##location##": loc.geoplugin_city + ', ' + loc.geoplugin_region + ', ' + loc.geoplugin_countryName
							}, subject_data = {};
							Mailer.send({ to: req.account_reset, changes: mail_data, subject: subject_data, template: 'change' })
						})
						// clear_all_sessions(user_data._id)
						res.status(200).send({ status: true, code: 200, message: 'Password updated successfully' })
					}
					else
						res.status(201).send({ status: false, code: 401, message: 'server not found' })
				}
			})
		}
	}
}



module.exports.user_update_password = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var user_id = req.user_id;
		var user_data = await user.findOne({ where: { user_id: user_id } })
		if (!user_data)
			res.status(201).send({ status: false, code: 400, message: 'No results found' })
		else if (!user_data.isActive)
			res.status(201).send({ status: false, code: 401, message: 'Your account has been blocked. Please contact our support' })
		else if (req.body.new_password != req.body.confirm_password)
			res.status(201).send({ status: false, code: 400, message: 'Password mismatched' })
		else {
			Encrypter.password_dec(req.body.old_password, user_data.salt, async (old_encrypted) => {
				Encrypter.password_dec(req.body.new_password, user_data.salt, async (encrypted) => {
					if (old_encrypted.data != user_data.password)
						res.status(201).send({ status: false, code: 400, message: 'Please enter Valid Old password ' });
					else if (encrypted.data == user_data.password)
						res.status(201).send({ status: false, code: 400, message: 'New password must be differ from previous one' });
					else {
						var user_email = Encrypter.decrypt_data(user_data.email);
						var update_password = await user.update({ password: encrypted.data }, { where: { user_id: user_data.user_id } });
						if (update_password) {
							Helper._get_location_details(req.headers['x-forwarded-for'], (loc) => {
								var mail_data = {
									"##date##": Helper.dateToDMY(new Date()),
									"##user##": user_data.firstname,
									'##datetime##': Helper.dateTime(loc['geoplugin_timezone']),
									"##device##": req.headers["user-agent"].split("(")[0],
									"##os##": `${req.headers["user-agent"].split(";")[1]}`,
									"##ip##": req.headers['x-forwarded-for'],
									"##location##": loc.geoplugin_city + ', ' + loc.geoplugin_region + ', ' + loc.geoplugin_countryName
								}, subject_data = {};
								Mailer.send({ to: user_email, changes: mail_data, subject: subject_data, template: 'change' })
							})
							// clear_all_sessions(user_data._id)
							res.status(200).send({ status: true, code: 200, message: 'Password updated successfully' })
						}
						else
							res.status(201).send({ status: false, code: 401, message: 'server not found' })
					}
				})
			})
		}
	}
}


module.exports.kyc_status = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var user_id = (req.user_id);
		var kyc_response = await user_kyc.findOne({ where: { user_id: user_id }, attributes:['proofname','front','back','selfie','proofstatus','selfiestatus'], });

		res.status(200).send({ status: true, code: 200, message: 'KYC details', data: kyc_response })

	}
}

module.exports.kyc_from_camera = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		

		try {

			let reqParam = req.body;
			// let reqType = reqParam.type;
			var user_id = (req.user_id);
			
			var response = await user.findOne({ where: { user_id: user_id } });
			var kyc_response = await user_kyc.findOne({ where: { user_id: user_id } });
			if (!response)
				res.status(201).send({ status: false, code: 400, message: 'User not found' })
			// else if (kyc_response)
			// 	res.status(201).send({ status: false, code: 400, message: 'kyc already created' })
			else if (!response.phoneVerified)
				res.status(201).send({ status: false, code: 400, message: 'Your account is not yet activated' })
			else if (reqParam.country == '')
				res.status(201).send({ status: false, code: 400, message: 'Please Select the Country' })
			else if (reqParam.proof_name == '')
				res.status(201).send({ status: false, code: 400, message: 'Please Select the Document' })
			// else if (req.files['frontImg'] == null || req.files['frontImg'] == undefined || req.files['frontImg'] == "")
			// 	res.status(201).send({ status: false, code: 400, message: 'Please Upload the Front Image' })
			// else if (req.files['backImg'] == null || req.files['backImg'] == undefined || req.files['backImg'] == "")
			// 	res.status(201).send({ status: false, code: 400, message: 'Please Upload the Back Image' })
			// else if (req.files['selfieImg'] == null || req.files['selfieImg'] == undefined || req.files['selfieImg'] == "")
			// 	res.status(201).send({ status: false, code: 400, message: 'Please Upload the Selfie Image' })
			else {
	
	
				const BUCKET_NAME = s3config.Bucket;
				const IAM_USER_KEY = s3config.accessKeyId;
				const IAM_USER_SECRET = s3config.secretAccessKey;
				let s3bucket = new AWS.S3({
					accessKeyId: IAM_USER_KEY,
					secretAccessKey: IAM_USER_SECRET,
					Bucket: BUCKET_NAME
				});
	
				var imgArray = [];
				if (Object.keys(req.files).length > 0) {
	
					if ((kyc_response.proofname == null && kyc_response.front == null && kyc_response.back == null && kyc_response.selfie == null) || (kyc_response.proofstatus == 2 && kyc_response.selfiestatus == 2)) {
						
						if (req.files['frontImg'] != null && req.files['frontImg'] != undefined && req.files['frontImg'] != "") {
							if (req.files['backImg'] != null && req.files['backImg'] != undefined && req.files['backImg'] != "") {
								if (req.files['selfieImg'] != null && req.files['selfieImg'] != undefined && req.files['selfieImg'] != "") {
									var frontImgLink = req.files['frontImg'][0]
	
	
									// s3bucket.uploadImage(frontImgLink, async function (imgRes) {
									var params = {
										Bucket: BUCKET_NAME,
										Key: 'image/' + new Date().valueOf() + '_' + frontImgLink.originalname,
										Body: frontImgLink.buffer,
										ACL: 'public-read'
									}
	
									s3bucket.upload(params, (err, imgRes) => {
										if (err) {
											res.send({ status: false, message: err });
										}
	
										var frontImg = imgRes.Location;
										
	
										var backImgLink = req.files['backImg'][0]
										// s3bucket.uploadImage(backImgLink, async function (imgRes) {
										var params = {
											Bucket: BUCKET_NAME,
											Key: 'image/' + new Date().valueOf() + '_' + backImgLink.originalname,
											Body: backImgLink.buffer,
											ACL: 'public-read'
										}
										s3bucket.upload(params, (err, imgRes) => {
											if (err) {
												res.send({ status: false, message: err });
											}
	
											var backImg = imgRes.Location;
	
											var selfieImgLink = req.files['selfieImg'][0]
											// s3bucket.uploadImage(selfieImgLink, async function (imgRes) {
											var params = {
												Bucket: BUCKET_NAME,
												Key: 'image/' + new Date().valueOf() + '_' + selfieImgLink.originalname,
												Body: selfieImgLink.buffer,
												ACL: 'public-read'
											}
											s3bucket.upload(params, async (err, imgRes) => {
												if (err) {
													res.send({ status: false, message: err });
												}
												var selfieImg = imgRes.Location;
												let object = {
													'front': frontImg,
													'back': backImg,
													'selfie': selfieImg,
													'user_id': req.user_id,
													'proofname': req.body.proof_name,
													'created': new Date(),
	
												}
												//var insertData = await user_kyc.create(object);//, async (err, insertData) => {
												var insertData = await user_kyc.update({
													'front': frontImg, 'back': backImg,
													'selfie': selfieImg, 'proofname': req.body.proof_name, 'created': new Date(),
													'proofstatus':0, 'selfiestatus':0
												},
													{ where: { user_id: req.user_id } });
	
												if (insertData) {
													var update = await user.update({ country: req.body.country }, { where: { user_id: req.user_id } });
													res.json({ status: true, message: 'Your kyc has been submitted successfully.' });
												} else {
													res.json({ status: false, message: 'Your kyc submission has been failed.' });
												}
												//});
											})
	
										})
	
									})
								} else {
									res.status(201).send({ status: false, code: 400, message: 'Please Upload the Selfie Image' })
								}
							} else {
	
								res.status(201).send({ status: false, code: 400, message: 'Please Upload the Back Image' })
							}
						} else {
							res.status(201).send({ status: false, code: 400, message: 'Please Upload the Front Image' })
						}
					} else if (kyc_response.proofstatus == 2) {
	
						if (req.files['frontImg'] != null && req.files['frontImg'] != undefined && req.files['frontImg'] != "") {
							if (req.files['backImg'] != null && req.files['backImg'] != undefined && req.files['backImg'] != "") {
	
								var frontImgLink = req.files['frontImg'][0]
								var params = {
									Bucket: BUCKET_NAME,
									Key: 'image/' + new Date().valueOf() + '_' + frontImgLink.originalname,
									Body: frontImgLink.buffer,
									ACL: 'public-read'
								}
	
								s3bucket.upload(params,async (err, imgRes) => {
									if (err) {
										res.send({ status: false, message: err });
									}
	
									var frontImg = imgRes.Location;
									
	
									var backImgLink = req.files['backImg'][0]
									// s3bucket.uploadImage(backImgLink, async function (imgRes) {
									var params = {
										Bucket: BUCKET_NAME,
										Key: 'image/' + new Date().valueOf() + '_' + backImgLink.originalname,
										Body: backImgLink.buffer,
										ACL: 'public-read'
									}
									s3bucket.upload(params,async (err, imgRes) => {
										if (err) {
											res.send({ status: false, message: err });
										}
										var backImg = imgRes.Location;
	
										var insertData = await user_kyc.update({
											'front': frontImg, 'back': backImg, 'proofname': req.body.proof_name, 'created': new Date(),
											'proofstatus':0
										},{ where: { user_id: req.user_id } });
	
										if (insertData) {
											var update = await user.update({ country: req.body.country }, { where: { user_id: req.user_id } });
											var user_email = Encrypter.decrypt_data(response.email);
											var mail_data = {
												"##date##": Helper.dateToDMY(new Date()),
												"##user##": response.firstname,
											}, subject_data = {};
											Mailer.send({ to: user_email, changes: mail_data, subject: subject_data, template: 'kyc_process' });
											res.json({ status: true, message: 'Your kyc has been submitted successfully.' });
										} else {
											res.json({ status: false, message: 'Your kyc submission has been failed.' });
										}
									})
								})
							} else {
								res.status(201).send({ status: false, code: 400, message: 'Please Upload the Back Image' })
							}
						} else {
							res.status(201).send({ status: false, code: 400, message: 'Please Upload the Front Image' })
						}
	
					} else if (kyc_response.selfiestatus == 2) {
						if (req.files['selfieImg'] != null && req.files['selfieImg'] != undefined && req.files['selfieImg'] != "") {
						
	
							var selfieImgLink = req.files['selfieImg'][0]
							var params = {
								Bucket: BUCKET_NAME,
								Key: 'image/' + new Date().valueOf() + '_' + selfieImgLink.originalname,
								Body: selfieImgLink.buffer,
								ACL: 'public-read'
							}
							s3bucket.upload(params, async (err, imgRes) => {
								if (err) {
									res.send({ status: false, message: err });
								}
								var selfieImg = imgRes.Location;
								
								var insertData = await user_kyc.update({
									'selfie': selfieImg, 'proofname': req.body.proof_name, 'created': new Date(),
									'selfiestatus':0
								},{ where: { user_id: req.user_id } });
	
								if (insertData) {
									var update = await user.update({ country: req.body.country }, { where: { user_id: req.user_id } });
									res.json({ status: true, message: 'Your kyc has been submitted successfully.' });
								} else {
									res.json({ status: false, message: 'Your kyc submission has been failed.' });
								}
							})
								
						} else {
							res.status(201).send({ status: false, code: 400, message: 'Please Upload the Selfie Image' })
						}
					}else{
						res.json({ "status": false, "message": "please try again" })
					}
	
				}
				else {
					res.json({ "status": false, "message": "please upload all fields" })
				}
	
	
	
				// 	uploadKyc(req, function (response) {
	
				// 		if (response) {
	
				// 			res.json({ status: true, message: 'Your kyc has been submitted successfully.' });
				// 		} else {
				// 			res.json({ status: false, message: 'Your kyc submission has been failed.' });
				// 		}
				// 	})
			}
	
		} catch (e) {
	
			res.json({ status: false, message: 'Something went wrong.', data: e });
		}
		res.status(200).send({ status: true, code: 200, message: 'KYC Updated Successfully'})

	}
}


module.exports.submit_kyc = async (req, res) => {

	try {

		let reqParam = req.body;
		// let reqType = reqParam.type;
		var user_id = (req.user_id);
	
		var response = await user.findOne({ where: { user_id: user_id } });
		var kyc_response = await user_kyc.findOne({ where: { user_id: user_id } });
		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'User not found' })
		// else if (kyc_response)
		// 	res.status(201).send({ status: false, code: 400, message: 'kyc already created' })
		else if (!response.phoneVerified)
			res.status(201).send({ status: false, code: 400, message: 'Your account is not yet activated' })
		else if (reqParam.country == '')
			res.status(201).send({ status: false, code: 400, message: 'Please Select the Country' })
		else if (reqParam.proof_name == '')
			res.status(201).send({ status: false, code: 400, message: 'Please Select the Document' })
		// else if (req.files['frontImg'] == null || req.files['frontImg'] == undefined || req.files['frontImg'] == "")
		// 	res.status(201).send({ status: false, code: 400, message: 'Please Upload the Front Image' })
		// else if (req.files['backImg'] == null || req.files['backImg'] == undefined || req.files['backImg'] == "")
		// 	res.status(201).send({ status: false, code: 400, message: 'Please Upload the Back Image' })
		// else if (req.files['selfieImg'] == null || req.files['selfieImg'] == undefined || req.files['selfieImg'] == "")
		// 	res.status(201).send({ status: false, code: 400, message: 'Please Upload the Selfie Image' })
		else {


			const BUCKET_NAME = s3config.Bucket;
			const IAM_USER_KEY = s3config.accessKeyId;
			const IAM_USER_SECRET = s3config.secretAccessKey;
			let s3bucket = new AWS.S3({
				accessKeyId: IAM_USER_KEY,
				secretAccessKey: IAM_USER_SECRET,
				Bucket: BUCKET_NAME
			});

			var imgArray = [];
			if (Object.keys(req.files).length > 0) {

				if ((kyc_response.proofname == null && kyc_response.front == null && kyc_response.back == null && kyc_response.selfie == null) || (kyc_response.proofstatus == 2 && kyc_response.selfiestatus == 2)) {
					
					if (req.files['frontImg'] != null && req.files['frontImg'] != undefined && req.files['frontImg'] != "") {
						if (req.files['backImg'] != null && req.files['backImg'] != undefined && req.files['backImg'] != "") {
							if (req.files['selfieImg'] != null && req.files['selfieImg'] != undefined && req.files['selfieImg'] != "") {
								var frontImgLink = req.files['frontImg'][0]


								// s3bucket.uploadImage(frontImgLink, async function (imgRes) {
								var params = {
									Bucket: BUCKET_NAME,
									Key: 'image/' + new Date().valueOf() + '_' + frontImgLink.originalname,
									Body: frontImgLink.buffer,
									ACL: 'public-read'
								}

								s3bucket.upload(params, (err, imgRes) => {
									if (err) {
										res.send({ status: false, message: err });
									}

									var frontImg = imgRes.Location;					

									var backImgLink = req.files['backImg'][0]
									// s3bucket.uploadImage(backImgLink, async function (imgRes) {
									var params = {
										Bucket: BUCKET_NAME,
										Key: 'image/' + new Date().valueOf() + '_' + backImgLink.originalname,
										Body: backImgLink.buffer,
										ACL: 'public-read'
									}
									s3bucket.upload(params, (err, imgRes) => {
										if (err) {
											res.send({ status: false, message: err });
										}

										var backImg = imgRes.Location;

										var selfieImgLink = req.files['selfieImg'][0]
										// s3bucket.uploadImage(selfieImgLink, async function (imgRes) {
										var params = {
											Bucket: BUCKET_NAME,
											Key: 'image/' + new Date().valueOf() + '_' + selfieImgLink.originalname,
											Body: selfieImgLink.buffer,
											ACL: 'public-read'
										}
										s3bucket.upload(params, async (err, imgRes) => {
											if (err) {
												res.send({ status: false, message: err });
											}
											var selfieImg = imgRes.Location;
											let object = {
												'front': frontImg,
												'back': backImg,
												'selfie': selfieImg,
												'user_id': req.user_id,
												'proofname': req.body.proof_name,
												'created': new Date(),

											}
											//var insertData = await user_kyc.create(object);//, async (err, insertData) => {
											var insertData = await user_kyc.update({
												'front': frontImg, 'back': backImg,
												'selfie': selfieImg, 'proofname': req.body.proof_name, 'created': new Date(),
												'proofstatus':0, 'selfiestatus':0
											},
												{ where: { user_id: req.user_id } });

											if (insertData) {
												var update = await user.update({ country: req.body.country }, { where: { user_id: req.user_id } });
												res.json({ status: true, message: 'Your kyc has been submitted successfully.' });
											} else {
												res.json({ status: false, message: 'Your kyc submission has been failed.' });
											}
											//});
										})

									})

								})
							} else {
								res.status(201).send({ status: false, code: 400, message: 'Please Upload the Selfie Image' })
							}
						} else {

							res.status(201).send({ status: false, code: 400, message: 'Please Upload the Back Image' })
						}
					} else {
						res.status(201).send({ status: false, code: 400, message: 'Please Upload the Front Image' })
					}
				} else if (kyc_response.proofstatus == 2) {

					if (req.files['frontImg'] != null && req.files['frontImg'] != undefined && req.files['frontImg'] != "") {
						if (req.files['backImg'] != null && req.files['backImg'] != undefined && req.files['backImg'] != "") {

							var frontImgLink = req.files['frontImg'][0]
							var params = {
								Bucket: BUCKET_NAME,
								Key: 'image/' + new Date().valueOf() + '_' + frontImgLink.originalname,
								Body: frontImgLink.buffer,
								ACL: 'public-read'
							}

							s3bucket.upload(params,async (err, imgRes) => {
								if (err) {
									res.send({ status: false, message: err });
								}

								var frontImg = imgRes.Location;
							
								var backImgLink = req.files['backImg'][0]
								// s3bucket.uploadImage(backImgLink, async function (imgRes) {
								var params = {
									Bucket: BUCKET_NAME,
									Key: 'image/' + new Date().valueOf() + '_' + backImgLink.originalname,
									Body: backImgLink.buffer,
									ACL: 'public-read'
								}
								s3bucket.upload(params,async (err, imgRes) => {
									if (err) {
										res.send({ status: false, message: err });
									}
									var backImg = imgRes.Location;

									var insertData = await user_kyc.update({
										'front': frontImg, 'back': backImg, 'proofname': req.body.proof_name, 'created': new Date(),
										'proofstatus':0
									},{ where: { user_id: req.user_id } });

									if (insertData) {
										var update = await user.update({ country: req.body.country }, { where: { user_id: req.user_id } });
										var user_email = Encrypter.decrypt_data(response.email);
										var mail_data = {
											"##date##": Helper.dateToDMY(new Date()),
											"##user##": response.firstname,
										}, subject_data = {};
										Mailer.send({ to: user_email, changes: mail_data, subject: subject_data, template: 'kyc_process' });
										res.json({ status: true, message: 'Your kyc has been submitted successfully.' });
									} else {
										res.json({ status: false, message: 'Your kyc submission has been failed.' });
									}
								})
							})
						} else {
							res.status(201).send({ status: false, code: 400, message: 'Please Upload the Back Image' })
						}
					} else {
						res.status(201).send({ status: false, code: 400, message: 'Please Upload the Front Image' })
					}

				} else if (kyc_response.selfiestatus == 2) {
					if (req.files['selfieImg'] != null && req.files['selfieImg'] != undefined && req.files['selfieImg'] != "") {
					

						var selfieImgLink = req.files['selfieImg'][0]
						var params = {
							Bucket: BUCKET_NAME,
							Key: 'image/' + new Date().valueOf() + '_' + selfieImgLink.originalname,
							Body: selfieImgLink.buffer,
							ACL: 'public-read'
						}
						s3bucket.upload(params, async (err, imgRes) => {
							if (err) {
								res.send({ status: false, message: err });
							}
							var selfieImg = imgRes.Location;
							
							var insertData = await user_kyc.update({
								'selfie': selfieImg, 'proofname': req.body.proof_name, 'created': new Date(),
								'selfiestatus':0
							},{ where: { user_id: req.user_id } });

							if (insertData) {
								var update = await user.update({ country: req.body.country }, { where: { user_id: req.user_id } });
								res.json({ status: true, message: 'Your kyc has been submitted successfully.' });
							} else {
								res.json({ status: false, message: 'Your kyc submission has been failed.' });
							}
						})
							
					} else {
						res.status(201).send({ status: false, code: 400, message: 'Please Upload the Selfie Image' })
					}
				}else{
					res.json({ "status": false, "message": "please try again" })
				}

			}
			else {
				res.json({ "status": false, "message": "please upload all fields" })
			}


			
			// 	uploadKyc(req, function (response) {

			// 		if (response) {

			// 			res.json({ status: true, message: 'Your kyc has been submitted successfully.' });
			// 		} else {
			// 			res.json({ status: false, message: 'Your kyc submission has been failed.' });
			// 		}
			// 	})
		}

	} catch (e) {

		res.json({ status: false, message: 'Something went wrong.', data: e });
	}

}





module.exports.get_deposit = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var date = new Date();
		var user_id = (req.user_id);
		var response = await user.findOne({ where: { user_id: user_id } });
		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'User not found' })
		else if (!response.phoneVerified)
			res.status(201).send({ status: false, code: 400, message: 'Your account is not yet activated' })
		else if (!response.isActive)
			res.status(201).send({ status: false, code: 400, message: 'Your account has been blocked. Please contact our support' })
		else if (response.unique_id != req.body.unique_id)
			res.status(201).send({ status: false, code: 400, message: 'Invalid BarCode, Please contact our support' })
		else {
			var user_email = Encrypter.decrypt_data(response.email);
			var amount = await crypto.sum('amount', { where: { user_id: user_id.toString(), status: "Inprogress", type: "Deposit" } });
			if (amount == null)
				amount = 0;

			if (amount > 0) {

				var update_amount = await wallet.increment({ USDT: amount }, { where: { user_id: user_id } });
				if (update_amount) {

					var mail_data = {
						"##date##": Helper.dateToDMY(new Date()),
						"##user##": response.firstname,
						"##amount##": amount
					}, subject_data = {};
					Mailer.send({ to: user_email, changes: mail_data, subject: subject_data, template: 'deposit' });
					var response = await crypto.update({ status: "Completed" }, { where: { user_id: user_id, type: "Deposit" } });
					res.status(200).send({ status: true, code: 200, message: 'Wallet Updated Successfully' })
				} else {
					res.status(201).send({ status: false, code: 400, message: 'Please try later' })
				}

			} else {
				res.status(201).send({ status: false, code: 400, message: 'Already  Wallet Updated' })
			}


		}

	}
}


module.exports.withdraw_fee_list = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var currency_data = await currency.findOne({ where: { currency_symbol: 'USDT' } });

		res.status(200).send({ status: true, code: 200, message: 'Fee details', data: currency_data })

	}
}

module.exports.fee_list = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var currency_data = await currency.findOne({ where: {} });

		res.status(200).send({ status: true, code: 200, message: 'Fee details', data: currency_data })

	}
}


module.exports.manual_withdraw_amount = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var currency_data = await currency.findOne({ where: { currency_symbol: 'USDT' } });
		var user_id = (req.user_id);
		var response = await user.findOne({ where: { user_id: user_id } });
		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'User not found' })
		else if (!response.phoneVerified)
			res.status(201).send({ status: false, code: 400, message: 'Your account is not yet activated' })
		else if (!response.isActive)
			res.status(201).send({ status: false, code: 400, message: 'Your account has been blocked. Please contact our support' })
		else if (parseFloat(currency_data.withdraw_min) > parseFloat(req.body.amount))
			res.status(201).send({ status: false, code: 400, message: 'Minimum Withdraw is ' + (currency_data.withdraw_min) + ' USDT' })
		else if (currency_data.withdraw_max < req.body.amount)
			res.status(201).send({ status: false, code: 400, message: 'Maximum Withdraw is ' + (currency_data.withdraw_max) + ' USDT' })
		else {

			Encrypter.password_dec(req.body.password, response.salt, async (encrypted) => {
				if (encrypted.data != response.password) {
					res.status(201).send({ status: false, code: 400, message: 'Invalid Password, Please try again' })
				} else {

					var amount = await crypto.sum('amount', { where: { user_id: user_id.toString(), status: "Inprogress", type: "Withdraw" } });
					if (amount == null)
						amount = 0;

					
					var user_wallet = await wallet.findOne({ where: { user_id: user_id } });
					if (user_wallet.USDT < (parseFloat(req.body.amount) + parseFloat(amount))) {
						res.status(201).send({ status: false, code: 400, message: 'Insufficient Balance' })
					} else {
						var fee = ((req.body.amount * currency_data.withdraw_fee) / 100).toFixed(8);
						var new_data = {
							user_id: user_id,
							unique_id: response.unique_id,
							type: 'Withdraw',
							amount: req.body.amount,
							total_amount: (parseFloat(req.body.amount) - parseFloat(fee)),
							fee: fee,
							currency: req.body.currency,
							status: 'Inprogress',
							branch: req.body.branch,
							created: new Date()
						}
						var created = await crypto.create(new_data);
						if (created) {
							res.status(200).send({ status: true, code: 200, message: 'Withdraw Request successfully send' })
						}
						else
							res.status(201).send({ status: false, code: 400, message: 'Withdraw not created, Please try later' })

					}
				}
			})
		}

	}
}




module.exports.manual_withdraw_qrcode = async (req, res) => {
	if (Common._validate_origin(req, res)) {


		var user_id = (req.user_id);
		var response = await user.findOne({ where: { user_id: user_id } });
		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'User not found' })
		else if (!response.phoneVerified)
			res.status(201).send({ status: false, code: 400, message: 'Your account is not yet activated' })
		else if (!response.isActive)
			res.status(201).send({ status: false, code: 400, message: 'Your account has been blocked. Please contact our support' })
		else {

			var amount = await crypto.sum('amount', { where: { user_id: user_id.toString(), status: "Inprogress", type: "Withdraw" } });
			if (amount == null)
				amount = 0;

			res.status(200).send({ status: true, code: 200, amount: amount, unique_id: response.unique_id })

		}

	}
}


module.exports.manual_history = async (req, res) => {
	if (Common._validate_origin(req, res)) {		
		var user_id = (req.user_id);
		const deposit_count = await crypto.count({ where: {   
            user_id:user_id.toString(),type:'deposit'
            }    
        });
		const withdraw_count = await crypto.count({ where: {   
            user_id:user_id.toString(),type:'withdraw'
            }    
        });
		const tot_count = await crypto.count({ where: {   
            user_id:user_id.toString()
            } });
		let limit=req.body.limit==0?tot_count:req.body.limit;
        let offset=req.body.offset==0?0:req.body.offset;
		var response = await user.findOne({ where: { user_id: user_id } });
		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'User not found' })
		else if (!response.phoneVerified)
			res.status(201).send({ status: false, code: 400, message: 'Your account is not yet activated' })
		else if (!response.isActive)
			res.status(201).send({ status: false, code: 400, message: 'Your account has been blocked. Please contact our support' })
		else {

			var history = await crypto.findAll({ where: { user_id: user_id.toString() },offset: offset, limit: limit });
			if (history)
				res.status(200).send({ status: true, code: 200, tot_count:tot_count,data: history,deposit_count:deposit_count,withdraw_count:withdraw_count })
			else
				res.status(201).send({ status: false, code: 400, message: 'No Records Found' })

		}

	}
}

module.exports.manual_deposit_history = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var user_id = (req.user_id);
		var response = await user.findOne({ where: { user_id: user_id } });
		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'User not found' })
		else if (!response.phoneVerified)
			res.status(201).send({ status: false, code: 400, message: 'Your account is not yet activated' })
		else if (!response.isActive)
			res.status(201).send({ status: false, code: 400, message: 'Your account has been blocked. Please contact our support' })
		else {

			var history = await crypto.findAll({ where: { user_id: user_id.toString(), type: "Deposit" } });
			if (history)
				res.status(200).send({ status: true, code: 200, data: history })
			else
				res.status(201).send({ status: false, code: 400, message: 'No Records Found' })

		}

	}
}

module.exports.manual_withdraw_history = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var user_id = (req.user_id);
		var response = await user.findOne({ where: { user_id: user_id } });
		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'User not found' })
		else if (!response.phoneVerified)
			res.status(201).send({ status: false, code: 400, message: 'Your account is not yet activated' })
		else if (!response.isActive)
			res.status(201).send({ status: false, code: 400, message: 'Your account has been blocked. Please contact our support' })
		else {

			var history = await crypto.findAll({ where: { user_id: user_id.toString(), type: "Withdraw" } });
			if (history)
				res.status(200).send({ status: true, code: 200, data: history })
			else
				res.status(201).send({ status: false, code: 400, message: 'No Records Found' })

		}

	}
}



module.exports.user_balance = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var user_id = (req.user_id);	
		var response = await user.findOne({ where: { user_id: user_id } });
		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'User not found' })
		else if (!response.phoneVerified)
			res.status(201).send({ status: false, code: 400, message: 'Your account is not yet activated' })
		else if (!response.isActive)
			res.status(201).send({ status: false, code: 400, message: 'Your account has been blocked. Please contact our support' })
		else {

			var balance = await wallet.findOne({
				where: { user_id: user_id },
				attributes: ['USDT', 'BTC', 'ADA', 'LTC', 'DOT', 'BNB', 'ETH', 'LINK']
			});
			
			var currency_data = await currency.findAll({
				where: {
					currency_symbol: {
					  [Op.in]: ['USDT', 'BTC', 'ADA', 'LTC', 'DOT', 'BNB', 'ETH', 'LINK']
					}
				  },attributes: ['currency_symbol', 'logo']			
				
			});
		var final_data=[];
		await currency_data.forEach(currency => {				
				let symb=currency.currency_symbol;				
				final_data[symb]={ 
					"currency_symbol":currency.currency_symbol,
					"logo":currency.logo,
					"balance":balance[symb]
				};		
				
			});

			const mobile_data = Object.assign({}, final_data);
			
			res.status(200).send({ status: true, code: 200, balance: balance,currency_data:currency_data,mobile_data:mobile_data})

		}
	}
}


var currency_val = []
var balance_data = [];
var user_balance = [];
var usd_balance_conversion = [];
var pair_balance_data = [];
var usd_total = 0;
var usd_percent = [];
var currency_data = '';

module.exports.wallet_details = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var user_id = (req.user_id);
		
		var response = await user.findOne({ where: { user_id: user_id } });
		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'User not found' })
		else if (!response.phoneVerified)
			res.status(201).send({ status: false, code: 400, message: 'Your account is not yet activated' })
		else if (!response.isActive)
			res.status(201).send({ status: false, code: 400, message: 'Your account has been blocked. Please contact our support' })
		else {

			var balance = await wallet.findOne({
				where: { user_id: user_id },
				attributes: ['USDT', 'BTC', 'ADA', 'LTC', 'DOT', 'BNB', 'ETH', 'LINK']
			});

			var currency_data = await currency.findAll({
				attributes: ['currency_symbol', 'USD_price','logo']
			});

			usd_total = 0;

			for (let i = 0; i < currency_data.length; i++) {

				//GET CURRENCY INFORMATION
				var temp = currency_data[i].currency_symbol;
				if(temp!=='USDT')
				{
				  pair_balance_data[i]= await pair.findOne({
					attributes: [ 'firstcurrency',
					'secondcurrency', 'marketprice', 'lastprice', 'min_amount',
					'max_amount', 'pair', 'buyerfee', 'sellerfee', 'status', 'high', 'low', 'volume', 'priceChangePercent'],
					where: {
						firstcurrency: {
						  [Op.in]: [temp]
						}
					  } ,raw:true	
					
				});
				pair_balance_data[i].balance=balance[temp];	
				pair_balance_data[i].logo=currency_data[i].logo;	
			//	pair_balance_data[temp][temp+'_bal'] = balance[temp];			
				pair_balance_dataa=pair_balance_data;
				}
		
			
					
							

				currency_val[temp] = currency_data[i].USD_price;
				user_balance[temp] = balance[temp];
				usd_balance_conversion[temp] = (currency_data[i].USD_price * balance[temp]).toFixed(8);
				usd_total = parseFloat(usd_total) + parseFloat(usd_balance_conversion[temp]);
				usd_total = usd_total.toFixed(8);
				if (i == (currency_data.length - 1)) {
					

					var history = await crypto.findAll({
						where: { user_id: user_id.toString() },
						attributes: ['type', 'amount', 'fee', 'total_amount', 'currency', 'status', 'created'],
						order: [
							['created', 'DESC'],
						]
					});

					var transfer_list = await transfer.findAll({
						where: { [Op.or]: [{ from_user_id: user_id }, { to_user_id: user_id }] },
						attributes: ['amount', 'fee', 'total_amount', 'currency', 'status', 'created', 'from_unique_id', 'to_unique_id'],
						order: [['created', 'DESC']]
					})
					const transfer_list1 = transfer_list.map(object => {
						return { ...object.dataValues, type: 'Internal' };
					});


					var external_list = await external.findAll({
						where: { user_id: user_id.toString() },
						attributes: ['amount', 'fee', 'total_amount', 'currency', 'status', 'created', 'binance_transaction_id', 'address'],
						order: [['created', 'DESC']]
					})
					const external_list1 = external_list.map(object => {
						return { ...object.dataValues, type: 'External' };
					});
					//var all = [...history, ...transfer_list1, ...external_list1];
					var all = [...history, ...transfer_list1, ...external_list1];


					var all1 = all.sort(
						(objA, objB) => Number(new Date(objB.created)) - Number(new Date(objA.created)),
					);
					//all1 = Object.assign({}, all1[0]);	  

					setTimeout(async function () {

						await call_wallet_percent((result) => {
							if (result.status) {

								const user_balance1 = Object.assign({}, user_balance);
								const pb = Object.assign({}, pair_balance_data);
								const usd_balance_conversion1 = Object.assign({}, usd_balance_conversion);
								const usd_percent1 = Object.assign({}, usd_percent);
								
								res.status(200).send({
									status: true, code: 200,
									balance: user_balance1,
									balance_usd: usd_balance_conversion1,
									total_usd: usd_total,
									balance_percent: usd_percent1,
									manual_deposit_withdraw_count: history.length,
									wallet_history: all1,
									unique_id: response.unique_id,
									mobile_data:pb
								})

							} else {
								res.status(201).send({ status: false, code: 400, message: 'Please try again' })
							}
						})

					}, 1000)

				}

			}

		}
	}
}


// async function call_wallet_percent(cb) {
call_wallet_percent = async (cb) => {

	var currency_data = await currency.findAll({
		attributes: ['currency_symbol', 'USD_price']
	});
	for (let i = 0; i < currency_data.length; i++) {

		var temp = currency_data[i].currency_symbol;
		usd_percent[temp] = ((parseFloat(usd_balance_conversion[temp]) * 100) / parseFloat(usd_total)).toFixed(2);
		if (i == (currency_data.length - 1)) {

			cb({
				status: true, code: 200,
				balance: user_balance,
				balance_usd: usd_balance_conversion,
				total_usd: usd_total,
				balance_percent: usd_percent
			})
		}
	}



}




var pair_data = '';
module.exports.favourite_list = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var user_id = (req.user_id);
		
		var user_response = await user.findOne({ where: { user_id: user_id } });
		if (!user_response)
		{
			 res.status(200).send({ status: false, code: 200, message: "User Not Found"})
		}
		else
		{
		var fav = user_response.favourite;
			pair_data = await pair.findAll({
			attributes: ['pair_id', 'firstcurrency',
				'secondcurrency', 'marketprice', 'lastprice', 'min_amount',
				'max_amount', 'pair', 'buyerfee', 'sellerfee', 'status', 'high', 'low', 'volume', 'priceChangePercent']
		});

		var balance = await wallet.findOne({
			where: { user_id: user_id },
			attributes: ['USDT', 'BTC', 'ADA', 'LTC', 'DOT', 'BNB', 'ETH', 'LINK']
		});

		
		var currency_data = await currency.findAll({
			attributes: ['currency_symbol', 'USD_price','logo']
		});
		var currency_list = []
		await currency_data.map(function (el) {
			currency_list[el.dataValues.currency_symbol] = el.dataValues.logo;
		
		})
		var usdt_list=[];
		usdt_list.balance=balance['USDT'];
		usdt_list.logo=currency_list['USDT'];
		usdt_list.favourite=fav['USDT'];
		const usdt_balance = Object.assign({}, usdt_list);

		

		usd_total = 0;
		var pair_details = [];
		for (let i = 0; i < pair_data.length; i++) {
			var temp = []
			var cur = pair_data[i].firstcurrency;
			temp = pair_data[i].dataValues;
			temp.balance = balance[cur]; 
			temp.logo = currency_list[cur]; 
			temp.favourite = fav[cur]
			pair_details[i] = temp;

		
		}
		//if (i == (pair_data.length - 1)) {
			res.status(200).send({ status: true, code: 200, data: pair_details,usdt: usdt_balance })
		//}
	}

	}
}



module.exports.add_favourite = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var user_id = (req.user_id);
		var currency = req.body.currency;
		var response = await user.findOne({ where: { user_id: user_id } });
		var fav = response.favourite;
		fav[currency] = 1;
		var update = await user.update({ favourite: fav }, { where: { user_id: user_id } });

		res.status(200).send({ status: true, code: 200, data: fav, message: 'Favourite Added Successfully'})

	}
}

module.exports.remove_favourite = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var user_id = (req.user_id);
		var currency = req.body.currency;
		var response = await user.findOne({ where: { user_id: user_id } });
		var fav = response.favourite;
		fav[currency] = 0;

		var update = await user.update({ favourite: fav }, { where: { user_id: user_id } });

		res.status(200).send({ status: true, code: 200, data: fav, message: 'Favourite Removed Successfully'})

	}
}
module.exports.user_generate_tfa = async (req, res) => {
	if (Common._validate_origin(req, res)) {
	var user_id = (req.user_id);
	var user_data = await user.findOne({ where:{user_id:user_id} });	
	if(!user_data)
		res.status(201).send({status:false, code:400, message:'User not found'});
	else if(!user_data.isActive)
		res.status(201).send({status:false, code:400, message:'Your account has been blocked. Please contact our support' });
	
	else{		
		var user_email = Encrypter.decrypt_data(user_data.email)
			// Create Wallet
				TFA.generate_tfa(user_email, async(err, tfa_data)=>{
				if(tfa_data){
					activated = await user.update( {tfa:tfa_data}, { where:{user_id:user_data.user_id} }  );
					var optional = { created: new Date(), user_id:user_data.user_id,  };
					var tfa_data1 = Object.assign({}, tfa_data, optional);
					var response = await user_tfa.update(tfa_data1,{ where:{user_id:user_data.user_id} })
					
					if(activated){
					 
						res.status(200).send({status:true, code:200,  data:tfa_data})
					}
				}
			})
		
	}
}
}

module.exports.get_responseb = async (req, res) => {
		console.log("responseee",req.body);
		console.log("responseee dataass",req.data);
		console.log("==========================>FUll REquest",req);
		res.status(200).send({ status: true});
}
