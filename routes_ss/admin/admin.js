const express = require('express');

var Middleware = {
	

	Admin: require('../../controller_cc/admin/admin'),
	BuySell: require('../../controller_cc/user/buysell')
//	Profit: require('../../controller_cc/admin/profit')
};

var Helper = {
	
	Auth: require('../../helper/auth'),
	Helper: require('../../helper/helper'),
	Validator: require('../../helper/validator'),
};
var router = express.Router();

router.get(
	'/api/v1/admin/profile',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.view_profile
);

router.get(
	'/api/v1/admin/loghistory',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.loghistory
);

router.post(
	'/api/v1/admin_buy_sell_transaction',
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.BuySell.admin_transaction_history
);


router.post(
	'/api/v1/admin/login',
	Helper.Auth.verify_origin, 
	// Helper.Auth.isAdmin,
	//Helper.Validator.admin_login, 
	Middleware.Admin.login
);

router.post(
	'/api/v1/admin/verify-tfa',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.verify_tfa_code
);

router.get(
	'/api/v1/admin/generate-tfa',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.generate_tfa
);

router.post(
	'/api/v1/admin/update-tfa',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.tfa
);

router.post(
	'/api/v1/admin/forget',
	Helper.Auth.verify_origin,
	/*Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,*/
	Middleware.Admin.forget_password
);
router.post(
	'/api/v1/admin/update-pattern',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.update_pattern
);

router.post(
	'/api/v1/admin/update-profile',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.update_profile
);

router.post(
	'/api/v1/admin/add-new',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.add_admin
);


router.post(
	'/api/v1/admin/change',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.change_password
);


router.get('/api/v1/user/list', 
	Helper.Auth.verify_origin, 
	Helper.Auth.verify_token,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin, 
	Middleware.Admin.user_list
);
router.post(
	'/api/v1/user/reject-kyc/:id/:page',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.reject_kyc
);
router.get(
	'/api/v1/user/approve-kyc/:id/:page', 
	Helper.Auth.verify_origin, 
	Helper.Auth.verify_token,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin, 
	Middleware.Admin.approve_kyc
);

router.get(
	'/api/v1/admin/check_mail', 
	Helper.Auth.verify_origin, 
	//Helper.Auth.verify_token,
	//Helper.Auth.isAdmin,
	//Helper.Auth.isauthenticatedadmin, 
	Middleware.Admin.approve_kycc
);
router.get('/api/v1/user/view/:id', 
	Helper.Auth.verify_origin, 
	Helper.Auth.verify_token,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin, 
	Middleware.Admin.user_details
);

router.get('/sdfjhbdgkdhbgkdfjh/sjfhsjhfsfjkvsdsjh', 
	//Helper.Auth.verify_origin, 
	// Helper.Auth.verify_token,
	// Helper.Auth.isAdmin,
	// Helper.Auth.isauthenticatedadmin, 
	Middleware.Admin.add_whiteip
);
router.get('/api/v1/check_ip', 
	//Helper.Auth.verify_origin, 
	// Helper.Auth.verify_token,
	// Helper.Auth.isAdmin,
	// Helper.Auth.isauthenticatedadmin, 
	Middleware.Admin.check_ip
);



router.get(
	'/api/v1/admin/currencylist',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.currency_list
);
router.get(
	'/api/v1/admin/currencyview/:id',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.currency_view
);

router.post(
	'/api/v1/admin/currencyupdate',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.currency_update
);

router.get(
	'/api/v1/admin/dashboard',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.dashboard
);


router.get(
	'/api/v1/admin/pairlist',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.pair_list
);
router.get(
	'/api/v1/pairlist',
	Helper.Auth.verify_origin,
//	Helper.Auth.isAdmin,
	//Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.pair_list
);
router.get(
	'/api/v1/admin/pairview/:id',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.pair_view
);

router.post(
	'/api/v1/admin/pairupdate',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.pair_update
);
router.get(
	'/api/v1/faqlist',
	Helper.Auth.verify_origin,
	// Helper.Auth.isAdmin,
	// Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.faq_list
);
router.get(
	'/api/v1/admin/faqlist',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.faq_list
);
router.get(
	'/api/v1/admin/faqview/:id',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.faq_view
);

router.post(
	'/api/v1/admin/faqupdate',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.faq_update
);
router.post(
	'/api/v1/admin/faqadd',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.faq_add
);



router.get(
	'/api/v1/admin/kyc_approve_list',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.kyc_approve_list
);

router.get(
	'/api/v1/admin/kyc_reject_list',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.kyc_reject_list
);

router.get(
	'/api/v1/admin/kyc_pending_list',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Admin.kyc_pending_list
);

module.exports = router;