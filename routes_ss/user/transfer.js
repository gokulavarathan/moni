var express = require('express'),
	router = express.Router(),
	cloudinary = require('cloudinary').v2,
	path = require('path'),
	multer = require('multer'),
	AWS = require("aws-sdk"),
	fs = require('fs');

    var Middleware = {
        Transfer: require('../../controller_cc/user/transfer')
        
    };
var Helper = {
	Auth: require('../../helper/auth'),
	Validator: require('../../helper/validator'),
	Hel: require('../../helper/helper')
}
router.post(
	'/api/v1/external',
	//Helper.Auth.verify_origin,
	//Helper.Validator.register,
	Middleware.Transfer.external
);
router.get(
	'/api/v1/binance_info',
	//Helper.Auth.verify_origin,
	//Helper.Validator.register,
	Middleware.Transfer.binance_info
);
router.post(
	'/api/v1/get_deposit_address',
//	Helper.Auth.verify_origin,	
	Middleware.Transfer.get_deposit_address
);

router.post(
	'/api/v1/check_address',
//	Helper.Auth.verify_origin,	
	Middleware.Transfer.get_deposit_address
);
router.post(
	'/api/v1/user/get_external_transfer',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	Middleware.Transfer.get_external_transfer
);


module.exports = router;