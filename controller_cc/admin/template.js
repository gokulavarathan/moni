var sequelize=require('../../configdetails_cc/ZXNhYmF0YWQ');
var DataTypes = require('sequelize'); 
var templateModel = require('../../models/MONI_email_template');
const template = templateModel(sequelize, DataTypes);

var	Common = require('../../helper/common');

module.exports.list = async(req,res)=>{
	if(Common._validate_origin(req, res)){
        /*var response = await template.findAll({
			where: {title:1, subject:1, date:1, status:1 },

		  });
		 where: { status:true }, 
		  */
		  var response =  await template.findAll({
			
		  });
 		  
	if(response)	
		res.send({status:true, code:200, data:response})
	else
		res.send({status:false, code:400, message:'No results found'})

}
}

module.exports.view = async(req,res)=>{
	if(Common._validate_origin(req, res)){
        var response = await template.findOne({
			where: { email_template_id: req.params.id },
		  });

	if(response)	
		res.send({status:true, code:200, data:response})
	else
		res.send({status:false, code:400, message:'No results found'})

}
}

module.exports.update = async(req,res)=>{
	if(Common._validate_origin(req, res)){
	if(req.body._id == '' || req.body._id == undefined || req.body._id == null){
		template.findOne(                
              { where:{title:req.body.title.toLowerCase()},}, (err, exist)=>{
		if(exist)
			res.send({status:true, code:200, message:'Template already exists'})
		else{
			var data = {
				title:req.body.title,
				subject:req.body.subject,
				content:req.body.content,
				date:new Date(),
			};
			template.create(data, (err, response)=>{
			if(response)	
				res.send({status:true, code:200, data:response, message:'Template created successfully'})
			else if(!response)
				res.send({status:false, code:200, message:'Template not created'})
			else
				res.send({status:false, code:400, message:'No results found'})
			})
		}
		})
	}
	else{
        var data = {
            title:req.body.title,
            subject:req.body.subject,
            content:req.body.content,
            date:new Date(),
        };
		
        var response = template.update({ 'title':req.body.title,'subject':req.body.subject,'content':req.body.content }, {
            where: { email_template_id:req.body._id}
          });		
		if(response)
			res.send({status:true, code:200, message:'Updated successfully'})	
		
		else
			res.send({status:false, code:400, message:'No results found'})
		
	}
}
}

module.exports.change = async(req,res)=>{
	if(Common._validate_origin(req, res)){
	var template_id =req.params.id;
	var template_data = await template.findOne({
        where: { email_template_id: req.params.id },
      });
	let status = template_data.status == true?false:true; 
    var response = template.update({ status:status }, {
        where: { email_template_id:template_id}
      });	

	if(response)
		res.send({status:true, code:200, message:'Updated successfully'})	
	else
		res.send({status:false, code:400, message:'No results found'})

}
}

module.exports.delete = async(req,res)=>{
	if(Common._validate_origin(req, res)){
        var response = template.destroy({
            where: { email_template_id:template_id}
          });
  
	if(response)
		res.send({status:true, code:200, message:'Deleted successfully'})	
	else
		res.send({status:false, code:400, message:'No results found'})
	
}
}

 /*module.exports.update_all = async(req,res)=>{
	if(Common._validate_origin(req, res)){
	template.updateMany({},{$set:{status:req.params.status}}, (err, response)=>{
	if(response.nModified == 0)	
		res.send({status:true, code:200, message:'No changes found'})
	else if(response.nModified > 0)
		res.send({status:true, code:200, message:'Template updated '+response.nModified+'.'})
	else
		res.send({status:false, code:400, message:'server not found'})
	})
}
}*/