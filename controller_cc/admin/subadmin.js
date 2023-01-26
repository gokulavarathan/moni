var Async = require('async');
var jwt = require('jsonwebtoken');
var encryptor = require('simple-encryptor')('TmV4YWJvb2sjJDEyM0VuY3J5cHRvcg');
var Common = require('../../helper/common');
var Mailer = require('../../helper/mailer');
var Encrypter = require('../../helper/encrypter'),Helper = require('../../helper/helper');
var keys = require('../../keyfiles/keystore');


var sequelize=require('../../configdetails_cc/ZXNhYmF0YWQ');
var DataTypes = require('sequelize'); 
var  UserModel  = require('../../models/MONI_sresu');
var  AdminModel  = require('../../models/MONI_admin');
var  BlockModel  = require('../../models/MONI_block_list');
var  HistoryModel  = require('../../models/MONI_history');
var  UserKycModel  = require('../../models/MONI_users_kyc');
var TFA = require('../../helper/2fa');


const admin = AdminModel(sequelize, DataTypes);
const block = BlockModel(sequelize, DataTypes);
const history = HistoryModel(sequelize, DataTypes);
const user = UserModel(sequelize, DataTypes);
const user_kyc = UserKycModel(sequelize, DataTypes);


module.exports.add_subadmin = async (req, res) => {
	const permission1 = Object.assign({}, req.body.permission);

	if (Common._validate_origin(req, res)) {
		var user_email = req.body.email;
		req.body.email = Encrypter.encrypt_data(req.body.email.toLowerCase());
		var exists = await admin.findOne({where:{ email: req.body.email }});
		var admin1 = await admin.findOne({where:{ subadmin: "subadmin" }});
		if(admin1 == null){
			admin1 = 1;
		}
		else
		admin1 = admin1 + 1;
		// var count = 0;
		if (!exists) {
			// count = count + 1


			Encrypter.password_enc(req.body.password, (encrypted) => {
				TFA.generate_tfa(user_email, async (tfa_data) => {
					var new_data = {
						username: req.body.username,
						email: req.body.email,
						salt: encrypted.salt,
						password: encrypted.encr.data,
						role: 'subadmin',
						// role:'subadmin',
						subadmin: 'subadmin',
						pattern: Encrypter.encrypt_data(req.body.pattern),
						tfa: tfa_data,
						permission: JSON.stringify(permission1),
						created_at: new Date()
					};

					admin.create(new_data).then((created) => {
						if (created) {

							var mail_data = {
								"##date##": Helper.dateToDMY(new Date()),
								"##email##": Encrypter.decrypt_data(req.body.email),
								"##username##": req.body.username,
								"##password##": req.body.password,
								"##pattern##": req.body.pattern,
								"##htusername##": keys.ht_access.user,
								"##htpassword##": keys.ht_access.pass
							}, subject_data = {};

							Mailer.send({ to: user_email, changes: mail_data, subject: subject_data, template: 'subadmin' });
							res.status(200).send({ status: true, code: 200, message: 'Subadmin added successfully' })
						}
						else
							res.status(201).send({ status: false, code: 400, message: 'Subadmin not created' })
					});
				})
			})
		} else if (exists)
			res.status(201).send({ status: true, code: 400, message: 'This email already exists' })
		else
			res.status(201).send({ status: true, code: 400, message: 'Server not found' })
	}
}

module.exports.update_subadmin = (req, res) => {
	if (Common._validate_origin(req, res)) {
		const permission1 = Object.assign({}, req.body.permission);
		var new_data = {
						username: req.body.username,
						permission: JSON.stringify(permission1),
					};
		admin.update(new_data,{where:{ admin_id: req.body.id }}).then((response) => {
			if (response)
				res.status(200).send({ status: true, code: 200, message: 'Subadmin updated successfully' })
			else if (!response)
				res.status(201).send({ status: true, code: 201, message: 'Already upto date. No changes found' })
			else
				res.status(201).send({ status: false, code: 400, message: 'Server not found' })
		})
	}
}

module.exports.subadmin_list = async (req, res) => {
	if (Common._validate_origin(req, res)) {
			await admin.findAll({where:{subadmin:"subadmin"}}).then((response)=>{
				if (response) {
				response = response.map(e => {
					e.email = Encrypter.decrypt_data(e.email);
					return e;
				})
				res.status(200).send({ status: true, code: 200, data: response })
			}
			else
				res.status(201).send({ status: false, code: 400, message: 'Server not found' })


			}).catch(err=>{
				res.status(201).send({ status: false, code: 400, message: 'Server not found' })
			});
			
	}
}

module.exports.subadmin_data = (req, res) => {
	if (Common._validate_origin(req, res)) {
		admin.findOne({where:{ admin_id: req.params.id }}).then((response) => {
			if (response) {
				response.email = Encrypter.decrypt_data(response.email);
				res.status(200).send({ status: true, code: 200, data: response })
			} else if (!response)
				res.status(201).send({ status: false, code: 400, message: 'No results found' })
			else
				res.status(201).send({ status: false, code: 400, message: 'Server not found' })
		})
	}
}

module.exports.change_subadmin_status = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var admin_data = await admin.findOne({where:{ admin_id: req.params.id }});
		var status = admin_data.isactive ? false : true;
		admin.update({isactive: status},{where:{ admin_id: admin_data.admin_id }}).then( async (updated) => {
			if (updated) {
				/*if (!status) {
					var history_data = await history.find({where:{ userId: admin_data.admin_id, category: 'admin', status: true }});
					history_data = history_data.map(e => {
						socket_config.sendmessage('block_account', { message: 'Your account has been blocked', status: true, token: e.access_token, block: true })
					})
				}*/
				res.status(200).send({ status: true, code: 200, message: 'Subadmin updated successfully' })
			}
			else if (!updated)
				res.status(200).send({ status: false, code: 400, message: 'Subadmin not updated' })
			else
				res.status(201).send({ status: false, code: 401, message: 'Server not found' })
		})
	}
}

module.exports.remove_subadmin = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var deleteAdmin = await admin.destroy({where:{ admin_id: req.params.id }});
		if(deleteAdmin)
		res.status(200).send({ status: true, code: 200, message: 'Subadmin removed successfully' })
		else
		res.status(401).send({ status: true, code: 200, message: 'Subadmin not removed' })
	}
}