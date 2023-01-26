const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MONI_faq', {
    faq_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    main_category: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sub_category: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tags: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    logo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    url: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    author: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    creates: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatess: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'MONI_faq',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "faq_pkey",
        unique: true,
        fields: [
          { name: "faq_id" },
        ]
      },
    ]
  });
};
