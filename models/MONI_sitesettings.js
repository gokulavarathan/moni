const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MONI_sitesettings', {
    fiat: {
      type: DataTypes.JSON,
      allowNull: true
    },
    crypto: {
      type: DataTypes.JSON,
      allowNull: true
    },
    links: {
      type: DataTypes.JSON,
      allowNull: true
    },
    sitename: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    copyright: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contactEmail: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    facebook: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    youtube: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    twitter: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    telegram: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    telegramGrp: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    linkedin: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sitemode: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    logo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    favicon: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    support: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    api_Data: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sitelink: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sitesettings_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    mobile: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'MONI_sitesettings',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "sitesettings_pkey",
        unique: true,
        fields: [
          { name: "sitesettings_id" },
        ]
      },
    ]
  });
};
