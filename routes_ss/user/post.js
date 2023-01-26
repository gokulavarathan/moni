var express = require('express'),
	router = express.Router(),
	cloudinary = require('cloudinary').v2,
	path = require('path'),
	multer = require('multer'),
	AWS = require("aws-sdk"),
	fs = require('fs');

var Middleware = {
	Register: require('../../controller_cc/user/register'),
	Activation: require('../../controller_cc/user/activate'),
	Login: require('../../controller_cc/user/login'),
	Security:require('../../controller_cc/user/security'),
	Internal:require('../../controller_cc/user/internal_transfer'),
	Support:require('../../controller_cc/user/support')
};


var Helper = {
	Auth: require('../../helper/auth'),
	Validator: require('../../helper/validator'),
	Hel: require('../../helper/helper')
}




router.post(
	'/api/v1/register',
	Helper.Auth.verify_origin,
	Helper.Validator.register,
	Middleware.Register.user_signup
);


router.post(
	'/api/v1/resend_otp',
	Helper.Auth.verify_origin,
	Middleware.Register.resend
);

router.post(
	'/api/v1/activate_account',
	Helper.Auth.verify_origin,
	Middleware.Activation.activate
);


router.post(
	'/api/v1/login',
	Helper.Auth.verify_origin,
	Helper.Validator.login,
	Middleware.Login.user_signin
);

router.post(
	'/api/v1/user/change_password',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	Helper.Validator.change_password,
	Middleware.Security.user_update_password
);
router.post(
	'/api/v1/user/user_generate_tfa',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,	
	Middleware.Security.user_generate_tfa
);


router.post(
	'/api/v1/forget',
	Helper.Auth.verify_origin,
	Helper.Validator.forget_password,
	Middleware.Security.user_forget_password
);

router.post(
	'/api/v1/password-reset-verification',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	//Helper.Validator.authentication,
	Middleware.Security.verify_confirmation_code
);

  // s3 bucket config
  const storage = multer.memoryStorage()
  const upload = multer({ storage: storage });


router.post(
	'/api/v1/reset-password',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.ForgetAuth,
	Helper.Validator.reset_password,
	Middleware.Security.user_reset_password
);


router.post(
	'/api/v1/user/confirm-account',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.secondaryAuth,

	Helper.Validator.authentication, 
	Middleware.Login.authentication
);

router.post(
	'/api/v1/user/update-tfa',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	//Helper.Validator.verify_code,
	Helper.Validator.authentication, 
	Middleware.Security.user_update_tfa
);


router.get(
	'/api/v1/user/kyc_status',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	Middleware.Security.kyc_status
);


router.post("/api/v1/kyc_update", 
		Helper.Auth.verify_origin,
		Helper.Auth.verify_token,
		Helper.Auth.isauthenticated,
		upload.fields([{name:'frontImg'},{name:'backImg'},{name:'selfieImg'}]),
		Middleware.Security.submit_kyc
); 
router.post("/api/v1/kyc_from_camera", 
		Helper.Auth.verify_origin,
		Helper.Auth.verify_token,
		Helper.Auth.isauthenticated,
		upload.fields([{name:'frontImg'},{name:'backImg'},{name:'selfieImg'}]),
		Middleware.Security.kyc_from_camera
); 


router.post(
	'/api/v1/user/deposit_barcode',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	Middleware.Security.get_deposit
);


router.get(
	'/api/v1/user/fee_list',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	Middleware.Security.fee_list
);

router.post(
	'/api/v1/user/manual_withdraw',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	Middleware.Security.manual_withdraw_amount
);

router.get(
	'/api/v1/user/get_manual_withdraw_qrcode',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	Middleware.Security.manual_withdraw_qrcode
);


router.post(
	'/api/v1/user/manual_history',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	Middleware.Security.manual_history
);

router.get(
	'/api/v1/user/manual_deposit_history',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	Middleware.Security.manual_deposit_history
);

router.get(
	'/api/v1/user/manual_withdraw_history',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	Middleware.Security.manual_withdraw_history
);

router.get(
	'/api/v1/user/get_balance',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	Middleware.Security.user_balance
);

router.post(
	'/api/v1/user/internal_transfer',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	Middleware.Internal.internal_user_transfer
);

router.post(
	'/api/v1/user/get_internal',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	Middleware.Internal.get_internal_transfer
);


router.get(
	'/api/v1/user/wallet',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	Middleware.Security.wallet_details
);


router.get(
	'/api/v1/user/get_support_category',
	Helper.Auth.verify_origin,
	// Helper.Auth.verify_token,
	// Helper.Auth.isauthenticated,
	Middleware.Support.get_category_list
);

router.post(
	'/api/v1/user/support',
	Helper.Auth.verify_origin,
	// Helper.Auth.verify_token,
	// Helper.Auth.isauthenticated,
	upload.fields([{name:'file'}]),
	Middleware.Support.support_create
);


router.post(
	'/api/v1/user/contact_us',
	Helper.Auth.verify_origin,
	// Helper.Auth.verify_token,
	// Helper.Auth.isauthenticated,
	Middleware.Support.contact_us
);

router.get(
	'/api/v1/user_detail',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	Middleware.Support.user_detail
);

router.post(
	'/api/v1/user/profile_update',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	Middleware.Support.profile_update
);

router.get(
	'/api/v1/user/favourite',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	Middleware.Security.favourite_list
);

router.post(
	'/api/v1/user/add_favourite',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	Middleware.Security.add_favourite
);

router.post(
	'/api/v1/user/remove_favourite',
	Helper.Auth.verify_origin,
	Helper.Auth.verify_token,
	Helper.Auth.isauthenticated,
	Middleware.Security.remove_favourite
);
router.post(
	'/api/v1/user/get_responsebb',		
	Middleware.Security.get_responseb
	); 
	router.post(
		'/api/v1/user/get_responsebbb',		
		Middleware.Security.get_responseb
		); 

module.exports = router;