var Mailer = require('../../helper/mailer'),
	Helper = require('../../helper/helper'),
	Common = require('../../helper/common'),
	Encrypter = require('../../helper/encrypter');



var sequelize = require('../../configdetails_cc/ZXNhYmF0YWQ');
var DataTypes = require('sequelize');
const { Op } =  require('sequelize');

var userModel = require('../../models/MONI_sresu');
const user = userModel(sequelize, DataTypes);

var historyModel = require('../../models/MONI_history');
const history = historyModel(sequelize, DataTypes);


var categoryModel = require('../../models/MONI_support_category');
const Category = categoryModel(sequelize, DataTypes);

var supportModel = require('../../models/MONI_support');
const Support = supportModel(sequelize, DataTypes);


var contact_usModel = require('../../models/MONI_contact_us');
const Contactus = contact_usModel(sequelize, DataTypes);


var AWS = require("aws-sdk");
var fs = require('fs');
var s3config = require("../../configdetails_cc/s3.env");




module.exports.user_detail = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var user_id = (req.user_id);
		var response = await user.findOne({ 
			attributes:['user_id','unique_id','phone','email','firstname','lastname','country','tfaVerified','tfa','phoneVerified','isActive'],
			where: { user_id: user_id } 
		}); 
		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'User not found' })
		else if (!response.phoneVerified)
			res.status(201).send({ status: false, code: 400, message: 'Your account is not yet activated' })
		else if (!response.isActive)
			res.status(201).send({ status: false, code: 400, message: 'Your account has been blocked. Please contact our support' })
		else {
			response.email = Encrypter.decrypt_data(response.email);
            res.status(200).send({ status: true, code: 200, data : response })

		}

	}
}


module.exports.profile_update = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var user_id = (req.user_id);
		var user_email = req.body.email;
		req.body.email = Encrypter.encrypt_data(req.body.email.toLowerCase());
		var email_exists = await user.findOne({ where:{ email: req.body.email }, attributes: ['email','user_id']  });
	
		if (email_exists && email_exists.user_id != user_id){
			res.status(201).send({ status: false, code: 400, message: 'This email address has already exist' })
		}else{
			var response = await user.update( {firstname: req.body.firstname,lastname: req.body.lastname }, {where: { user_id : user_id}});
			if (!response)
				res.status(201).send({ status: false, code: 400, message: 'Please try again' })
			else 
				res.status(200).send({ status: true, code: 200, message: 'profile updated successfully'  })

		}
	}
}


module.exports.get_category_list = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var date = new Date();
		var user_id = (req.user_id);
		var response = await Category.findAll({ where: { status: true } });
		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'Category not found' })
		else {
            res.status(200).send({ status: true, code: 200, message: 'Category List', data : response })
		}
	}
}

module.exports.support_create = async (req, res) => {

	var reqParam = req.body;
	

	try {

		let reqParam = req.body;
		var response = await user.findOne({ where: { unique_id: reqParam.unique_id } });
		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'User not found' })
		else if (reqParam.email == '')
			res.status(201).send({ status: false, code: 400, message: 'Please enter the Email' })
        else if (reqParam.name == '')
			res.status(201).send({ status: false, code: 400, message: 'Please enter the User name' })
		else if (reqParam.type == '')
			res.status(201).send({ status: false, code: 400, message: 'Please Select the Category' })
		else {

            let object = {
                'email': reqParam.email,
                'type': reqParam.type,
                'name': reqParam.name,
                'unique_id': reqParam.unique_id,
                'subject': reqParam.subject,
                'description' : reqParam.description,
                'status':"Pending",
                'created': new Date(),
            }
            
			
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
				if (req.files['file'] != null && req.files['file'] != undefined && req.files['file'] != "") {
					
					var supportImgLink = req.files['file'][0]
					var params = {
						Bucket: BUCKET_NAME,
						Key: 'image/' + new Date().valueOf() + '_' + supportImgLink.originalname,
						Body: supportImgLink.buffer,
						ACL: 'public-read'
					}
					s3bucket.upload(params, async (err, imgRes) => {
						if (err) {
							res.send({ status: false, message: err });
						}
						var supportImg = imgRes.Location;
						object['file'] = supportImg;
						
						var insertData = await Support.create(object);

						if (insertData) {
							res.json({ status: true, message: 'Your Support has been submitted successfully.' });
						} else {
							res.json({ status: false, message: 'Your Support submission has been failed.' });
						}
					})
				}else{
					var insertData = await Support.create(object);

					if (insertData) {
			
						res.json({ status: true, message: 'Your Support has been submitted successfully.' });
					} else {
						res.json({ status: false, message: 'Your Support submission has been failed.' });
					}
				}

                
            } else {
            
                var insertData = await Support.create(object);

                if (insertData) {
         
                    res.json({ status: true, message: 'Your Support has been submitted successfully.' });
                } else {
                    res.json({ status: false, message: 'Your Support submission has been failed.' });
                }
            }
					
			
		}

	} catch (e) {

		res.json({ status: false, message: 'Something went wrong.', data: e });
	}

}



// contact_us
module.exports.contact_us = async (req, res) => {
	var reqParam = req.body;
	try {

		let reqParam = req.body;
		if (reqParam.email == '')
			res.status(201).send({ status: false, code: 400, message: 'Please enter the Email' })
        else if (reqParam.name == '')
			res.status(201).send({ status: false, code: 400, message: 'Please enter the User name' })
		else if (reqParam.type == '')
			res.status(201).send({ status: false, code: 400, message: 'Please Select the Category' })
		else {

            let object = {
                'email': reqParam.email,
                'name': reqParam.name,
                'subject': reqParam.subject,
                'description' : reqParam.description,
                'status':"Pending",
                'created': new Date(),
            }
          
			
			var insertData = await Contactus.create(object);

			if (insertData) {

				
				res.json({ status: true, message: 'Your Request has been submitted successfully.Admin will contact soon' });
			} else {
				res.json({ status: false, message: 'Your Request submission has been failed.' });
			}
            
		}

	} catch (e) {

		res.json({ status: false, message: 'Something went wrong.', data: e });
	}

}