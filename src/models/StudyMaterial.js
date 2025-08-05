const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const StudyMaterial = sequelize.define('StudyMaterial', {
  teacherId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  examType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false
  },
  chapter: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
    tableName: 'study_materials',
timestamps: true
});

module.exports = StudyMaterial;