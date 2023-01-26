const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MONI_order', {
    order_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pair: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    buyOrderId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sellOrderId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    filled: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    buyer: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    seller: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    buyer_fee: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    seller_fee: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    buyer_deducted_percent: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    seller_deducted_percent: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    buyer_deducted_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    seller_deducted_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    buyer_total: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    seller_total: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    isBuyerMaker: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "completed"
    },
    trans_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'MONI_order',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "order_pkey",
        unique: true,
        fields: [
          { name: "order_id" },
        ]
      },
    ]
  });
};
