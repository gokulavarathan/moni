const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MONI_refsnart_lanretni', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    from_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    to_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    from_unique_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    to_unique_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    currency: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    fee: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    total_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'MONI_refsnart_lanretni',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "internal_transfer_pkey",
        unique: true,
        fields: [
          { name: "id" },
          { name: "from_user_id" },
        ]
      },
    ]
  });
};
