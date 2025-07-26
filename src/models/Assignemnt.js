const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Teacher=require('../models/Teacher');

const Assignment = sequelize.define('Assignment', {
 teacherid:{
     type: DataTypes.STRING,
    allowNull: false,
     references: { model: Teacher, key: "id" },
 },
  subject: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  chapter: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  assignmentname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  assignment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
   tableName: 'Assignmentdetails',
});

module.exports = Assignment;
