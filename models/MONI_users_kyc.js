const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MONI_users_kyc', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'MONI_sresu',
        key: 'user_id'
      }
    },
    proofname: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    front: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    back: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    selfie: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    proofstatus: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    selfiestatus: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    upi_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    frontstatus: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    backstatus: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    user_tfa_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'MONI_users_kyc',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_kyc_pkey",
        unique: true,
        fields: [
          { name: "user_tfa_id" },
        ]
      },
    ]
  });
};
