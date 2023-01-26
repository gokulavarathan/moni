const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MONI_block_list', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
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
    tableName: 'MONI_block_list',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "block_list_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
