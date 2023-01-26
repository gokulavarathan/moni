const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MONI_sresu', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: "users_user_id_key"
    },
    avatar: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address1: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    emailVerifiedToken: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    salt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    firstname: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lastname: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    mobile: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    country: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pincode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    currency: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    profileUpdated: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    passcode: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    passcodeStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    passcodeUpdated: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cronExecuted: {
      type: DataTypes.DATE,
      allowNull: true
    },
    referrer: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    referrals: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    referral_code: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    kycVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    favourites: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    payment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    resetTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    resetcode: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    operation: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    verificationCode: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    tfaVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    bank_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    termsCondition: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    accountConfirm: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    attempt: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    p2pstatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    p2pattempts: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 5
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true
    },
    phoneVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    tfa: {
      type: DataTypes.JSON,
      allowNull: true
    },
    unique_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    favourite: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'MONI_sresu',
    schema: 'public',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "users_user_id_key",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
