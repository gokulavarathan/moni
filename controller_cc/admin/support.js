var Async = require('async');
var Common = require('../../helper/common');
var Mailer = require('../../helper/mailer');
var Encrypter = require('../../helper/encrypter'),
Helper = require('../../helper/helper');


var sequelize=require('../../configdetails_cc/ZXNhYmF0YWQ');
var DataTypes = require('sequelize'); 

var  CategoryModel  = require('../../models/MONI_support_category');
const Category = CategoryModel(sequelize, DataTypes);

var  SupportModel  = require('../../models/MONI_support');
const Support = SupportModel(sequelize, DataTypes);

var contact_usModel = require('../../models/MONI_contact_us');
const Contactus = contact_usModel(sequelize, DataTypes);



//Add Category Types
module.exports.add_category = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var response = await Category.findOne({ where: { category: req.body.category } });
		if (response)
			res.status(201).send({ status: false, code: 400, message: 'Category Already Exist' })
		else{
			var new_data = {
				category : req.body.category,
                status: req.body.status,
				created: new Date()
			}
			var created = await Category.create(new_data);
				if(created){	
					res.status(200).send({status:true, code:200, message:'Category added successfully'})
				}
				else
					res.status(201).send({status:false, code:400, message:'Category not created, Please try later' })
				
		}
		
	}
}

//change Category Status
module.exports.category_status = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var response = await Category.findOne({ where: { id: req.body.category_id } });
		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'Category not found' })
		else{
			var new_data = {
				id : req.body.category_id,
                status: req.body.status
			}
			var created = await Category.update({ status : req.body.status }, { where :{id:req.body.category_id} });
				if(created){	
					res.status(200).send({status:true, code:200, message:'Category Status changed'})
				}
				else
					res.status(201).send({status:false, code:400, message:'Category status not changed, Please try later' })
				
		}
		
	}
}

//support list
module.exports.support_list = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var response = await Support.findAll({ where: {  },order: [ ['created', 'DESC'] ] });
		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'Support not found' })
		else{
			res.status(200).send({status:true, code:200, message:'Support List', data:response })
				
		}
		
	}
}

//support_category_list
module.exports.support_category_list = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var response = await Category.findAll({ where: {  }  });
		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'Category not found' })
		else{
			res.status(200).send({status:true, code:200, message:'Support Category List', data:response })
				
		}
		
	}
}


module.exports.support_view = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var response=await Support.findOne({ where:{ id:req.params.id}});
			if (response) {
				res.status(200).send({ status: true, code: 200, data: response })
			} else
				res.status(201).send({ status: false, code: 401, message: 'Data not found' })
		
	}
}

module.exports.support_update = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var support_data = await Support.findOne({ where:{ id:req.body.id}});
		var response = Support.update( {comments: req.body.comments, status:'Completed' }, {where: { id:req.body.id}});
			if (response) {
				var user_email = support_data.email;
				var mail_data = {
					"##date##": Helper.dateToDMY(new Date()),
					"##user##": support_data.name,
					"##comments##": req.body.comments,
					"##subject##":support_data.subject

				}, subject_data = {};
				Mailer.send({ to: user_email, changes: mail_data, subject: subject_data, template: 'support_ticket' });

				res.status(200).send({ status: true, code: 200, data: "Support details successfully updated." })
			} else
				res.status(200).send({ status: false, code: 200, message: 'Data not found' })		
	}
}

//contactus List
module.exports.contactus_list = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var response = await Contactus.findAll({ where: {  },order: [ ['created', 'DESC'] ] });
		if (!response)
			res.status(201).send({ status: false, code: 400, message: 'List not found' })
		else{
			res.status(200).send({status:true, code:200, message:'Contactus List', data:response })
				
		}
		
	}
}


module.exports.contactus_view = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var response=await Contactus.findOne({ where:{ id:req.params.id}});
			if (response) {
				res.status(200).send({ status: true, code: 200, data: response })
			} else
				res.status(201).send({ status: false, code: 401, message: 'Data not found' })
		
	}
}

module.exports.contactus_update = async (req, res) => {
	if (Common._validate_origin(req, res)) {
		var data = await Contactus.findOne({ where:{ id:req.body.id}});
		var response = Contactus.update( {comments: req.body.comments, status:'Completed' }, {where: { id:req.body.id}});
			if (response) {
				var user_email = data.email;
				var mail_data = {
					"##date##": Helper.dateToDMY(new Date()),
					"##user##": data.name,
					"##comments##": req.body.comments,
					"##subject##":data.subject

				}, subject_data = {};
				Mailer.send({ to: user_email, changes: mail_data, subject: subject_data, template: 'contact_us' });
				res.status(200).send({ status: true, code: 200, data: "Contactus details successfully updated." })
			} else
				res.status(200).send({ status: false, code: 200, message: 'Data not found' })		
	}
}