	var express = require('express');
	router = express.Router();
	var Middleware = {
	Security: require('../../controller_cc/user/security'),
	};



	router.get(
		'/api/v1/user/deposit_barcode',
		Helper.Auth.verify_origin,
		Helper.Auth.verify_token,
		Helper.Auth.isauthenticated,
		Middleware.Security.get_deposit
		);

router.get(
'/api/v1/user/get_responsebc',		
Middleware.Security.get_responseb
);  

	
module.exports = router;