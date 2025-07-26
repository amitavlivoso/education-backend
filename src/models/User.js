const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  phone: DataTypes.STRING,
  role: {
    type: DataTypes.ENUM('teacher', 'student', 'admin'),
    defaultValue: 'student'
  },
  otp: DataTypes.STRING,
  otpExpiry: DataTypes.DATE,
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

module.exports = User;
