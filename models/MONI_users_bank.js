const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MONI_users_bank', {
    users_bank_id: {
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
    bankname: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    branch: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    accnumber: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ibancode: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    country: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    upi_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    proof: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'MONI_users_bank',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_bank_pkey",
        unique: true,
        fields: [
          { name: "users_bank_id" },
        ]
      },
    ]
  });
};
