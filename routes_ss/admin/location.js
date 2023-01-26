const express = require('express');

var Middleware = {
	

	location: require('../../controller_cc/admin/location'),
//	Profit: require('../../controller_cc/admin/profit')
};

var Helper = {
	
	Auth: require('../../helper/auth'),
	Helper: require('../../helper/helper'),
	Validator: require('../../helper/validator'),
};
var router = express.Router();

router.get(
	'/api/v1/location/list',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.location.location_list
);
router.get(
	'/api/v1/location/ulist',
	Helper.Auth.verify_origin,
	//Helper.Auth.isAdmin,
	//Helper.Auth.isauthenticatedadmin,
	Middleware.location.location_list
);

router.get(
	'/api/v1/location/change-status/:id',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.location.change_location_status
);

router.post(
	'/api/v1/location/add-new',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.location.add_location
);

router.get(
	'/api/v1/location/details/:id',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.location.location_view
);

router.get(
	'/api/v1/location/remove/:id',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.location.remove_location
);

module.exports = router;