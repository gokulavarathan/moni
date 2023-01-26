var express = require('express'),
	router = express.Router(),
	cloudinary = require('cloudinary').v2,
	path = require('path'),
	multer = require('multer'),
	AWS = require("aws-sdk"),
	fs = require('fs');

var Middleware = {
	BuySell: require('../../controller_cc/user/buysell')
	
};
var Helper = {
	Auth: require('../../helper/auth'),
	Validator: require('../../helper/validator'),
	Hel: require('../../helper/helper')
}
router.post(
	'/api/v1/place_order',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	Middleware.BuySell.place_order
);
router.post(
	'/api/v1/buy_sell_transaction',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	Middleware.BuySell.transaction_history
);
/*router.post(
	'/api/v1/admin_buy_sell_transaction',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	Middleware.BuySell.admin_transaction_history
);*/
router.post(
	'/api/v1/buysellsconversion',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	Middleware.BuySell.buysellsconversion
);


module.exports = router;