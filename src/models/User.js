const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
   phone: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [10, 15] 
    }
  },
   role: {
    type: DataTypes.ENUM('teacher', 'student','admin'),
    allowNull: false,
    defaultValue: 'student'
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: true
  },
  otpExpiry: {
    type: DataTypes.DATE,
    allowNull: true
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});
sequelize.sync({ alter: true });
module.exports = User;
