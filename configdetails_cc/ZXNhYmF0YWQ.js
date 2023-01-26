var Sequelize = require('sequelize'); 
var config = require('./UasjNASDHwRE');

   var opts = {
    timezone:"+05:30",
    logging:false,
    define: {       
        freezeTableName: true
    },
    hooks: {
      beforeDefine: function (columns, model) {
        model.tableName = model.tableName;
      }
  }
}
    const sequelize=new Sequelize(config.dbconnection,opts);

    try {
      sequelize.authenticate();
    
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }


  module.exports = sequelize;