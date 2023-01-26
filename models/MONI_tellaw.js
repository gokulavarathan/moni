const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MONI_tellaw', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    USDT: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    BTC: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    ADA: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    LTC: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    DOT: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    BNB: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    ETH: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    LINK: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'MONI_tellaw',
    schema: 'public',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "wallet_pkey",
        unique: true,
        fields: [
          { name: "id" },
          { name: "user_id" },
        ]
      },
    ]
  });
};
