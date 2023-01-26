var Async = require('async');


var Common = require('../../helper/common');


var sequelize=require('../../configdetails_cc/ZXNhYmF0YWQ');
var DataTypes = require('sequelize'); 

var  CmsModel  = require('../../models/MONI_cms');
const cms = CmsModel(sequelize, DataTypes);


module.exports.cms_list = async (req, res)=>{

	if(Common._validate_origin(req, res)){
        await cms.findAll({   
          }).then((results)=>{
		res.status(200).send({status:true, data:results, code:200})	
	}).catch(error=>{
		res.status(200).send({status:false, code:400, message:'server not found'})
	})
}
}

module.exports.cms_view = async (req, res) => {
	if (Common._validate_origin(req, res)) {

		var response = await cms.findOne({ attributes: ['cms_id', 'category', 'title', 'main_content', 'creates'], where: { cms_id: req.params.id } });
		if (response) {
			res.status(200).send({ status: true, code: 200, data: response })
		} else
			res.status(201).send({ status: false, code: 400, message: 'server not found' })

	}
}

module.exports.cms_update = async (req, res) => {


	if (Common._validate_origin(req, res)) {

		var response = await cms.update(req.body, { where: { cms_id: req.body.cms_id } });
		if (response) {
			res.status(200).send({ status: true, code: 200, message: "cms details successfully updated." })
		} else
			res.status(200).send({ status: false, code: 400, message: 'server not found' })
	} 
}



