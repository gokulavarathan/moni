const express = require('express');

var Middleware = {
	

	Subadmin: require('../../controller_cc/admin/subadmin'),
//	Profit: require('../../controller_cc/admin/profit')
};

var Helper = {
	
	Auth: require('../../helper/auth'),
	Helper: require('../../helper/helper'),
	Validator: require('../../helper/validator'),
};
var router = express.Router();
var router = express.Router();

router.get(
	'/api/v1/subadmin/list',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Subadmin.subadmin_list
);

router.get(
	'/api/v1/subadmin/change-status/:id',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Subadmin.change_subadmin_status
);

router.get(
	'/api/v1/subadmin/details/:id',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Subadmin.subadmin_data
);

router.get(
	'/api/v1/subadmin/remove/:id',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Subadmin.remove_subadmin
);

router.post(
	'/api/v1/subadmin/add-new',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	// Helper.Validator.add_subadmin,
	Middleware.Subadmin.add_subadmin
);

router.post(
	'/api/v1/subadmin/update',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	// Helper.Validator.validate_subadmin,
	Middleware.Subadmin.update_subadmin
);

module.exports = router;