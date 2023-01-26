

var Async = require('async');
var jwt = require('jsonwebtoken');
var encryptor = require('simple-encryptor')('TmV4YWJvb2sjJDEyM0VuY3J5cHRvcg');
var Common = require('../../helper/common');
var Mailer = require('../../helper/mailer');
var Encrypter = require('../../helper/encrypter'),Helper = require('../../helper/helper');
var keys = require('../../keyfiles/keystore');


var sequelize=require('../../configdetails_cc/ZXNhYmF0YWQ');
var DataTypes = require('sequelize'); 
var  SiteModel  = require('../../models/MONI_sitesettings');
var  AdminModel  = require('../../models/MONI_admin');
var  BlockModel  = require('../../models/MONI_block_list');
var  HistoryModel  = require('../../models/MONI_history');
var  UserKycModel  = require('../../models/MONI_users_kyc');
var TFA = require('../../helper/2fa');


const site = SiteModel(sequelize, DataTypes);
const block = BlockModel(sequelize, DataTypes);
const history = HistoryModel(sequelize, DataTypes);
const user_kyc = UserKycModel(sequelize, DataTypes);


module.exports.filter_config = (req, res) => {
	if (Common._validate_origin(req, res)) {
		var type = [{ option: 'all' }, { option: 'buy' }, { option: 'sell' }],
			side = [{ option: 'All', value: 'all' }, { option: 'Limit Order', value: 'limit' }, { option: 'Stop Limit', value: 'stop' }],
			days = [{ option: 'All', value: 0 }, { option: 'Past 7 days', value: 7 }, { option: 'Past 30 days', value: 30 }, { option: 'Past 60 days', value: 60 }],
			status = [{ option: 'All', value: 'all' }, { option: 'Pending', value: 2 }, { option: 'Completed', value: 1 }, { option: 'Cancelled', value: 0 }],
			fiat_transfer = [{ option: 'All', value: 'all' }, { option: 'Deposit', value: 'deposit' }, { option: 'Withdraw', value: 'withdraw' }],
			crypto_transfer = [{ option: 'All', value: 'all' }, { option: 'Deposit', value: 'receive' }, { option: 'Withdraw', value: 'send' }],
			transfer_status = [{ option: 'All', value: 'all' }, { option: 'Pending', value: 2 }, { option: 'Completed', value: 1 }, { option: 'Cancelled', value: 0 }];
		var data = { type: type, side: side, days: days, status_data: status, fiat_transfer: fiat_transfer, crypto_transfer: crypto_transfer, transfer_status: transfer_status };
		res.send({ status: true, code: 200, data: data });
	}
}

module.exports.list = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		site.findOne().then((response) => {
			if (response)
				res.status(200).send({ status: true, code: 200, data: response })
			else if (!response)
				res.status(201).send({ status: false, code: 200, message: 'No results found' })
			else
				res.status(201).send({ status: false, code: 400, message: 'server not found' })
		})
	}
}

module.exports.view = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		site.findOne({}, { _id: 0 }, (err, response) => {
			if (response)
				res.status(200).send({ status: true, code: 200, data: response })
			else if (!response)
				res.status(201).send({ status: false, code: 200, message: 'No results found' })
			else
				res.status(201).send({ status: false, code: 400, message: 'server not found' })
		})
	}
}

module.exports.update = async (req, res) => {

	if (Common._validate_origin(req, res)) {
		
		
			site.update(req.body,{where:{sitesettings_id:1}}).then((response) => {
				if (response) {
					/*if (req.body.sitemode) {
						Helper.Socket.sendmessage('under-control', { status: true, block: true, message: 'Site is temproarily locked' })
					}*/
					res.status(200).send({ status: true, code: 200, message: 'Site details updated successfully' })
				}
				else if (!response)
					res.status(201).send({ status: false, code: 200, message: 'Already up to date. No changes found' })
				else
					res.status(201).send({ status: false, code: 400, message: 'server not found' })
			}).catch(error => {
				res.status(201).send({ status: false, code: 400, message: 'No results found', error: error });
			})
		// }
	}
}



module.exports.get_ticket_details = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var ticket_id = req.body.ticketId;
		var ticket_data = await support.findOne({ ticket_id: ticket_id }).exec()
		support_message.find({ messageId: ticket_id }, { tag: 1, message: 1, file: 1, date: 1, avatar: 1, name: 1,email:1 }).then(resData => {
			res.status(200).send({ status: true, code: 200, data: { ticketData: ticket_data, chat: resData } });
		}).catch(error => {
			res.status(201).send({ status: false, code: 400, message: 'No results found' });
		})
	}
}