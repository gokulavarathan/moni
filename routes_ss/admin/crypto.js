const express = require('express');

var Middleware = {
	

	Admin: require('../../controller_cc/admin/admin'),
	Crypto: require('../../controller_cc/admin/crypto')
};

var Helper = {
	
	Auth: require('../../helper/auth'),
	Helper: require('../../helper/helper'),
	Validator: require('../../helper/validator'),
};
var router = express.Router();

// router.get(
// 	'/api/v1/admin/profile',
// 	Helper.Auth.verify_origin,
// 	Helper.Auth.isAdmin,
// 	Helper.Auth.isauthenticatedadmin,
// 	Middleware.Admin.view_profile
// );


router.post(
	'/api/v1/admin/deposit_amount',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Crypto.deposit
);

router.post(
	'/api/v1/admin/get_deposit_qrcode_data',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Crypto.get_deposit_amount
);



router.post(
	'/api/v1/admin/update_manual_withdraw',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Crypto.update_withdraw_wallet
);


router.get(
	'/api/v1/admin/manual_withdraw_list',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Crypto.withdraw_list
);

router.get(
	'/api/v1/admin/manual_history',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Crypto.manual_history
);

router.get(
	'/api/v1/admin/internal_history',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Crypto.internal_history
);



router.get(
	'/api/v1/admin/deposit_currency_fee',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Crypto.deposit_currency_fee
);


router.get(
	'/api/v1/admin/manual_history_view/:id',
	Helper.Auth.verify_origin, 
	Helper.Auth.isAdmin, 
	Helper.Auth.isauthenticatedadmin, 
	Middleware.Crypto.manual_history_view
)

// router.get('/api/v1/user/list', 
// 	//Helper.Auth.verify_origin, 
// 	Helper.Auth.verify_token,
// 	Helper.Auth.isAdmin,
// 	Helper.Auth.isauthenticatedadmin, 
// 	Middleware.Admin.user_list
// );




module.exports = router;