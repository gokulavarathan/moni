const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MONI_admin_permission', {
    admin_permission_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    module: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    module_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    submodule: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    write: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    status: {
      type: DataTypes.SMALLINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'MONI_admin_permission',
    schema: 'public',
    timestamps: false
  });
};
