
var nodemailer = require('nodemailer');

var sendGridMail = require('@sendgrid/mail');

var sequelize=require('../configdetails_cc/ZXNhYmF0YWQ');
var DataTypes = require('sequelize'); 
var  EmailModel  = require('../models/MONI_email_template');
var  SiteModel  = require('../models/MONI_sitesettings');

const template = EmailModel(sequelize, DataTypes);
const site = SiteModel(sequelize, DataTypes);
SMTP_DET = require('../configdetails_cc/TUFJTF9EQVRB');


const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const client = mailgun.client({username: 'api', key: SMTP_DET.Mail.API_KEY});


var transporter = nodemailer.createTransport({
	host: SMTP_DET.Mail.Host,
	port: SMTP_DET.Mail.Port,
	secure: false,
	auth: {
		user: SMTP_DET.Mail.User,
		pass: SMTP_DET.Mail.Pass
	}
});

var from_address = 'Excited User <support@monifiex.com>',
	Newsletter = `Monifiex Newsletter <${ SMTP_DET.Mail.From }>`;
module.exports.send = async (data) => {
	var site_info = await site.findOne({
		where: { sitesettings_id: 1 },
	  });
	
	Object.assign(data.changes, {
		"##sitename##": site_info.sitename,
		"##SITENAME##": site_info.sitename,
		"##logo##": site_info.logo,
		"##link##": site_info.link,
		"##contactEmail##": site_info.contactEmail,
		"##CONTACTEMAIL##": site_info.contactEmail,
		"##copyright##": site_info.copyright,
		"##mobile##": site_info.mobile
	});

	
	 var response = await template.findOne({
		where: { title: data.template },
	  });
		if (response) {
			var content = response.content,
				subject = response.subject;

			for (var key in data.subject) {
				if (data.subject.hasOwnProperty(key)) {
					subject = subject.replace(key, data.subject[key])
				}
			}
			for (var key in data.changes) {
				if (data.changes.hasOwnProperty(key)) {
					content = content.replace(key, data.changes[key])
				}
			}
			content = content.replace(/##SITENAME##/g, site_info.sitename).replace(/##LOGO##/g, site_info.logo).replace(/##CONTACTEMAIL##/g, site_info.contactEmail).replace(/##COPYRIGHT##/g, site_info.copyright).replace(/##MOBILE##/g, site_info.mobile).replace(/##LINK##/g, site_info.sitelink)
			

			const messageData = {
				from: from_address,
				to: data.to,
				subject: subject,
			//	text: 'Testing some Mailgun awesomeness!', 
				html: content
			  };

		
			client.messages.create(SMTP_DET.Mail.DOMAIN, messageData)
			.then((res) => {
			 
			})
			.catch((err) => {
			  console.error(err);
			});



			/*transporter.sendMail(details).then(mail => {
				
				return true
			}).catch(err => {
				
				return false;
			})*/
		} else {
			return false;
		}
	
}




module.exports.newsletter = async (data) => {
	template.findOne({ title: data.template }, { content: 1, subject: 1 }, (err, response) => {
		if (response) {
			var content = response.content,
				subject = response.subject;

			for (var key in data.subject) {
				if (data.subject.hasOwnProperty(key)) {
					subject = subject.replace(key, data.subject[key])
				}
			}

			for (var key in data.changes) {
				if (data.changes.hasOwnProperty(key)) {
					content = content.replace(key, data.changes[key])
				}
			}

			var details = { from: Newsletter, to: data.to, subject: subject, html: content };
			sendGridMail.send(details).then(mail => {
				return true
			}).catch(err => {
				return false;
			})
		} else
			return false;
	})
}

module.exports.send_raw = async (data) => {
	var details = {
		from: from_address,
		to: data.to,
		subject: data.subject,
		html: data.content
	}

	sendGridMail.send(details).then(mail => {
		return true
	}).catch(err => {
		return false;
	})
}