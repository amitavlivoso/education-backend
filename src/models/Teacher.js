const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Teacher = sequelize.define('Teacher', {
 userid:{
     type: DataTypes.STRING,
    allowNull: false,
    //  references: { model: User, key: "id" },
 },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
   tableName: 'teacherdetails',
});

module.exports = Teacher;
