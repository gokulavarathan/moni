const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MONI_cms', {
    cms_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    main_content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sub_content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    banner: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    creates: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    updates: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'MONI_cms',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cms_pkey",
        unique: true,
        fields: [
          { name: "cms_id" },
        ]
      },
    ]
  });
};
