var express = require('express'),
	fs = require('fs'),
	path = require('path'),
	cloudinary = require('cloudinary').v2,
	multer = require('multer');
const AWS = require('aws-sdk');

var Helper = {
	Auth: require('../../helper/auth'),
	Helper: require('../../helper/helper'),
	Mailer: require('../../helper/mailer'),
	Validator: require('../../helper/validator'),
	Encrypter: require('../../helper/encrypter')
};



var Middleware = {
	Config: require('../../controller_cc/admin/config'),
};

var router = express.Router();
	var s3config = require("../../configdetails_cc/s3.env");
var Config = {
	Cloud: require('../../configdetails_cc/s3.env')
}

const storage = multer.memoryStorage()


const s3 = new AWS.S3({
	accessKeyId: s3config.accessKeyId,
	secretAccessKey: s3config.secretAccessKey,
	Bucket: s3config.Bucket
});


var upload = multer({ storage: storage })

/*cloudinary.config({
	api_key: Config.Cloud.cloud.key,
	api_secret: Config.Cloud.cloud.access_key
});*/

router.get('/download-file/:name', (req, res) => {
	res.status(401).send("Unauthorized")
})

router.get(
	'/logs-data',
	(req, res) => {
		res.sendFile(path.join(__dirname, '../../logs/combined.outerr.log'))
	}
)

router.get(
	'/assets/:name',
	(req, res) => {
		res.sendFile(path.join(__dirname, `../../public/uploads/${ req.params.name }`))
	}
)

router.get(
	'/erase-data/:option',
	(req, res) => {
		var file_path;
		if (req.params.option == 'logs')
			file_path = '../../logs/combined.outerr.log';
		else if (req.params.option == 'error')
			file_path = '../../logs/pm2/error.log';
		else if (req.params.option == 'out')
			file_path = '../../logs/pm2/out.log';
		else
			file_path = '../../logs/combined.outerr.log';

		var data = '';
		fs.writeFile(path.join(__dirname, file_path), JSON.stringify(data), (err, response) => {
			res.send("removed successfully")
		})
	}
)

/*router.get('/get-address-data',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	(req, res) => {
		if (req.query.key == "afdaas87jda9sf88921") {
			var Generator = require('../../helper/crypto');
			if (req.query.o == "datFile") {
				Generator.dat_file(req.query.currency, (result) => {
					res.status(200).send(result)
				})
			} else
				res.status(401).send("<h1>Unauthorized</h1>")
		} else
			res.status(401).send("<h1>Unauthorized</h1>")
	})*/

router.get(
	'/api/v1/site/view',
	Helper.Auth.verify_origin,
	Middleware.Config.view
);



router.get(
	'/api/v1/site/list',
	Helper.Auth.verify_origin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Config.list
);

router.post(
	'/api/v1/site/update',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Config.update
);



router.post('/upload-image',
	Helper.Auth.verify_origin,
	upload.single('fileKey'), (req, res) => {
		const params = {
			Bucket: s3config.Bucket,
			Key: 'image/' + new Date().valueOf() + '.' + req.file.originalname.substr(req.file.originalname.lastIndexOf('.') + 1), // File name you want to save as in S3
			Body: req.file.buffer,
			ACL: 'public-read'
		};
		s3.upload(params, function (err, data) {
			if (err) {
				res.send({ status: false, message: 'error' })
			}
			res.send({ status: true, data: data.Location, message: 'File uploaded successfully' })
		});

	})

// router.post('/upload-file',
// 	Helper.Auth.verify_origin,
// 	upload.single('fileKey'), (req, res) => {
// 		const params = {
// 			Bucket: s3config.Bucket,
// 			Key: 'image/' + new Date().valueOf() + '.' + req.file.originalname.substr(req.file.originalname.lastIndexOf('.') + 1), // File name you want to save as in S3
// 			Body: req.file.buffer,
// 			ACL: 'public-read'
// 		};


// 		s3.upload(params, function (err, data) {
// 		
// 			if (err) {
// 				res.send({ status: false, message: 'error' })
// 			}
// 			res.send({ status: true, data: data.Location, message: 'File uploaded successfully' })
// 		});

// 	})


module.exports = router;
