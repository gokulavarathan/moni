const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MONI_pair', {
    pair_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    firstcurrency: {
      type: DataTypes.TEXT,
      allowNull: true,
      references: {
        model: 'MONI_currency',
        key: 'currency_symbol'
      }
    },
    secondcurrency: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    marketprice: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    lastprice: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    high: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    low: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    volume: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    volume_first: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    change: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    udate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    coinget: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    buyerfee: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    sellerfee: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    feetype: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    buyliquidity: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    buyliquidityreward: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    sellliquidity: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    sellliquidityreward: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    tradespotlimit: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    tradespotmarket: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    tradespotstop: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    tradespottrigger: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    tradespotbuy: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    tradespotsell: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    min_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    max_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    min_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    max_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    bot_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    liquidity: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    binance_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    binance_change: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    binance_high: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    binance_low: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    binance_volume: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    binance_open: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    binance_close: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    pairs_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    pair: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    priceChangePercent: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    currency_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'MONI_pair',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pair_pkey",
        unique: true,
        fields: [
          { name: "pair_id" },
        ]
      },
    ]
  });
};
