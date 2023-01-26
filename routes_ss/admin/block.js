const express = require('express');

var Middleware = {
	Block: require('../../controller_cc/admin/block'),
	// Home: require('../../controller_cc/admin/home')
};

var Helper = {
	Auth: require('../../helper/auth'),
	Helper: require('../../helper/helper'),
	Validator: require('../../helper/validator'),
};

var router = express.Router();

router.get(
	'/api/v1/country-list', 
	Helper.Auth.verify_origin, 
	Middleware.Block.country_list
);

router.post(
	'/api/v1/ip-block', 
	Helper.Auth.verify_origin, 
	Middleware.Block.verify_ip_block
)

router.get(
	'/api/v1/ip-block/list', 
	Helper.Auth.verify_origin, 
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin, 
	Middleware.Block.ip_list
)

router.get(
	'/api/v1/ip-block/change/:id', 
	Helper.Auth.verify_origin, 
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin, 
	Middleware.Block.block_change_status
)

router.get(
	'/api/v1/ip-block/remove/:id', 
	Helper.Auth.verify_origin, 
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin, 
	Middleware.Block.block_remove
)

router.get(
	'/api/v1/mail-block/list', 
	Helper.Auth.verify_origin, 
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin, 
	Middleware.Block.email_list
)

router.post(
	'/api/v1/ip-block/update', 
	Helper.Auth.verify_origin, 
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin, 
	Middleware.Block.block_update
)

router.post(
	'/api/v1/verify-ip',
	Helper.Auth.verify_origin,
	Middleware.Block.verify_ip
);

router.get(
	'/api/v1/country-block/list', 
	Helper.Auth.verify_origin, 
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Block.country_list
)

router.get(
	'/api/v1/country-block/view/:id', 
	Helper.Auth.verify_origin, 
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Block.get_country_details
)

router.get(
	'/api/v1/country-block/change/:id', 
	Helper.Auth.verify_origin, 
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Block.block_country
)

router.get(
	'/api/v1/country-block/remove/:id', 
	Helper.Auth.verify_origin, 
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Block.remove_country,
)

router.post(
	'/api/v1/country-block/update', 
	Helper.Auth.verify_origin, 
	Helper.Auth.isAdmin,
	Helper.Auth.isauthenticatedadmin,
	Middleware.Block.block_update
)


router.get(
	'/api/v1/ip-white/list', 
	Helper.Auth.verify_origin, 
	// Helper.Auth.isAdmin,
	// Helper.Auth.isauthenticatedadmin, 
	Middleware.Block.ip_whitelist
)

router.get(
	'/api/v1/ip-white/change/:id', 
	Helper.Auth.verify_origin, 
	// Helper.Auth.isAdmin,
	// Helper.Auth.isauthenticatedadmin, 
	Middleware.Block.white_change_status
)

router.get(
	'/api/v1/ip-white/remove/:id', 
	Helper.Auth.verify_origin, 
	// Helper.Auth.isAdmin,
	// Helper.Auth.isauthenticatedadmin, 
	Middleware.Block.white_remove
)

router.post(
	'/api/v1/ip-white/update', 
	Helper.Auth.verify_origin, 
	// Helper.Auth.isAdmin,
	// Helper.Auth.isauthenticatedadmin, 
	Middleware.Block.white_update
)

module.exports = router;