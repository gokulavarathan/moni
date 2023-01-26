const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MONI_edart', {
    trade_id: {
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
    email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pair: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    firstcurrency: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    secondcurrency: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    filled: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 0
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    pending: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 0
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    type: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    ordertype: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    trigger_type: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    level: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    temp: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    fee: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    binanceOrderId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    binanceClientId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    trans_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    udate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    executedbal: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'MONI_edart',
    schema: 'public',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "trade_pkey",
        unique: true,
        fields: [
          { name: "trade_id" },
        ]
      },
    ]
  });
};
