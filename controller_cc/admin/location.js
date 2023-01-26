
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
var  LocationModel  = require('../../models/MONI_location');
var TFA = require('../../helper/2fa');


const admin = AdminModel(sequelize, DataTypes);
const location = LocationModel(sequelize, DataTypes);

module.exports.location_list = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		location.findAll().then((response) => {
			if (response)
				res.status(200).send({ status: true, code: 200, data: response })
			else
				res.status(201).send({ status: false, code: 400, message: 'server not found' })
		})
	}
}


module.exports.add_location = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var location_data = await location.findOne({where:{ lat: req.body.lat }});
	
		if (location_data == null) {
		
			req.body.status = true;
				location.create(req.body).then((created) => {
					if (created) {
						res.status(200).send({ status: true, code: 200, message: 'Data added successfully' })
					}
					else if (!created)
						res.status(201).send({ status: false, code: 400, message: 'Document not added' })
					else
						res.status(201).send({ status: false, code: 400, message: 'server not found' })
				})
		}
		else {
			res.status(201).send({ status: false, code: 400, message: 'Already added.' })
		}
	}
}


module.exports.change_location_status = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var location_data = await location.findOne({where:{ id: req.params.id }})
		var status = !location_data.status ? true : false;
		location.update({ status: status },{where:{ id: location_data.id }}).then((updated) => {
			if (updated) {
				res.status(200).send({ status: true, code: 200, message: 'Status updated successfully' })
			}
			else if (!updated)
				res.status(201).send({ status: false, code: 400, message: 'Status not updated' })
			else
				res.status(201).send({ status: false, code: 400, message: 'server not found' })
		})
	}
}


module.exports.location_view = async(req,res)=>{
	if(Common._validate_origin(req, res)){
        var response = await location.findOne({
			where: { id: req.params.id },
		  });

	if(response)	
		res.send({status:true, code:200, data:response})
	else
		res.send({status:false, code:400, message:'No results found'})

}
}

module.exports.remove_location = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		location.destroy({where:{ id: req.params.id }}).then((deleted) => {
			if (deleted)
				res.status(200).send({ status: true, code: 200, message: 'Document removed successfully' })
			else
				res.status(201).send({ status: false, code: 400, message: 'server not found' })
		})
	}
}


module.exports.blocked_lists = (address) => {
	history.find({ ipaddress: address, status: true }, (err, response) => {
		if (response.length > 0) {
			response = response.map(element => {
				socket_config.sendmessage('ip-blocked', { status: true, block: true, message: 'Your ip is blocked', address: element.ipaddress, token: element.access_token })
			})
		}
		return;
	})
}	