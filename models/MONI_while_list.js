const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MONI_while_list', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: "while_list_id_key"
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: "while_list_address_key"
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    udate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'MONI_while_list',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "id",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "while_list_address_key",
        unique: true,
        fields: [
          { name: "address" },
        ]
      },
      {
        name: "while_list_id_key",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
