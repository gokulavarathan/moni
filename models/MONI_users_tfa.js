const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MONI_users_tfa', {
    user_tfa_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'MONI_sresu',
        key: 'user_id'
      }
    },
    dataURL: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    otpURL: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tempSecret: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'MONI_users_tfa',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_tfa_pkey",
        unique: true,
        fields: [
          { name: "user_tfa_id" },
        ]
      },
    ]
  });
};
