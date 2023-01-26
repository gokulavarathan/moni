const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MONI_currency', {
    currency_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    currency_symbol: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: "currency_symbol"
    },
    currency_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    currency_type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    USD_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    deposit_fee: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    deposit_min: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    deposit_max: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    withdraw_fee: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    withdraw_min: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    withdraw_max: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    internal_fee: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    internal_min: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    internal_max: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    external_fee: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    external_min: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    external_max: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    logo: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'MONI_currency',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "currency_pkey",
        unique: true,
        fields: [
          { name: "currency_id" },
        ]
      },
      {
        name: "currency_symbol",
        unique: true,
        fields: [
          { name: "currency_symbol" },
        ]
      },
    ]
  });
};
