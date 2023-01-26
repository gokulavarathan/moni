const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MONI_admin', {
    admin_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    role: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    subadmin: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pattern: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    salt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    permission: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    attempt: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 0
    },
    tfa: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tfaverified: {
      type: DataTypes.BOOLEAN,
      allowNull: true
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
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'MONI_admin',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "admin_id",
        unique: true,
        fields: [
          { name: "admin_id" },
        ]
      },
    ]
  });
};
