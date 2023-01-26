


const express = require('express');

var Middleware = {
	Cms: require('../../controller_cc/admin/cms')
};

var Helper = {
	
	Auth: require('../../helper/auth'),
	Helper: require('../../helper/helper'),
	Validator: require('../../helper/validator'),
};
var router = express.Router();


/*router.get(
	'/file/:name', 
	Middleware.Home.download_file
);*/



router.get(
	'/api/v1/cms_list', 
	Helper.Auth.verify_origin, 
	Middleware.Cms.cms_list
);

router.get(
	'/api/v1/cms/list', 
	Helper.Auth.verify_origin, 
	Helper.Auth.isAdmin, 
	Helper.Auth.isauthenticatedadmin,
	Middleware.Cms.cms_list
);


router.get(
	'/api/v1/admin/cmsview/:id',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Cms.cms_view
);

router.post(
	'/api/v1/admin/cmsupdate',
	Helper.Auth.verify_origin,
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Cms.cms_update
);

module.exports = router;