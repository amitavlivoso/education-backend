const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('./User');

const Teacher = sequelize.define('Teacher', {
 teacherid: {
    type: DataTypes.INTEGER,
    allowNull: false,
   
  },
  subject: DataTypes.STRING,
  chapter: DataTypes.STRING,
  assignmentname: DataTypes.STRING,
  assignment: DataTypes.STRING,
}, {
  tableName: 'assignment',
  timestamps: true
});



module.exports = Teacher;
