const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MONI_history', {
    history_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "admin"
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "1"
    },
    browser: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    version: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    device: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "pc"
    },
    method: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    os: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ipaddress: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    access_token: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    logout: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    auth: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    latitude: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    longitude: {
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
    tableName: 'MONI_history',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "history_pkey",
        unique: true,
        fields: [
          { name: "history_id" },
        ]
      },
    ]
  });
};
