const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');


const Course = sequelize.define('Course', {
 teacherid: {
    type: DataTypes.INTEGER,
    allowNull: false,
   
   
  },
   categoryid: {
    type: DataTypes.INTEGER,
    allowNull: false,
   
   
  },
  coursename: DataTypes.STRING,
  subjectname: DataTypes.STRING,
  coursetype: DataTypes.STRING,
  courseduration: DataTypes.STRING,
  course: DataTypes.STRING,
  

}, {
  tableName: 'course',
  timestamps: true
});



module.exports = Course;
