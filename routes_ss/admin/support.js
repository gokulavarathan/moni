const express = require('express');

var Middleware = {
	
	Support: require('../../controller_cc/admin/support')
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

router.get(
	'/api/v1/admin/support_category_list',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Support.support_category_list
);

router.post(
	'/api/v1/admin/add_support_type',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Support.add_category
);

router.post(
	'/api/v1/admin/change_support_type',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Support.category_status
);

router.get(
	'/api/v1/admin/support_list',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Support.support_list
);

router.get(
	'/api/v1/admin/supportview/:id',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Support.support_view
);


router.post(
	'/api/v1/admin/support_update',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Support.support_update
);

router.get(
	'/api/v1/admin/contactus_list',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Support.contactus_list
);

router.get(
	'/api/v1/admin/contactus_view/:id',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Support.contactus_view
);


router.post(
	'/api/v1/admin/contactus_update',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Support.contactus_update
);

module.exports = router;