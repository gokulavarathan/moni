const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MONI_faq_category', {
    faq_category_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    main_category: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    icon: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sub_category: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'MONI_faq_category',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "faq_category_pkey",
        unique: true,
        fields: [
          { name: "faq_category_id" },
        ]
      },
    ]
  });
};
