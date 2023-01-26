const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MONI_location', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lat: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lang: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'MONI_location',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "location_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
