const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('./User');

const Teacher = sequelize.define('Teacher', {
   id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
      references: {
      model: User,
      key: 'id'
    }
  },
  address: DataTypes.STRING,
  subject: DataTypes.STRING,
  experience: DataTypes.STRING,
}, {
  tableName: 'teacherdetails',
  timestamps: true
});



module.exports = Teacher;
