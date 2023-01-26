var DB_Config = require('./ZGJjcmVkZWaWFs');


module.exports = {	

	dbconnection:`postgres://${ DB_Config.demo_db.user_name }:${ DB_Config.demo_db.password }@${ DB_Config.demo_db.host }:${ DB_Config.demo_db.port }/${ DB_Config.demo_db.db_name }`,
	
	port: 8192
}