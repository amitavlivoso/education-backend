const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('./User');

const Student = sequelize.define('Student', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    
    references: {
      model: User,
      key: 'id'
    }
  },
  enrollmentNumber: {
    type: DataTypes.STRING,
    allowNull: true,  
  },

  address:{
   type: DataTypes.STRING,
    allowNull: true
  },
   bankDetails: {
    type: DataTypes.JSON, 
    allowNull: true
  },
  socialMediaLink: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  education: {
    type: DataTypes.JSON, 
    allowNull: true
  },
  parentInfo: {
    type: DataTypes.JSON, 
    allowNull: true
  },
  
}, {
  timestamps: true
});

// Association
User.hasOne(Student, { foreignKey: 'userId' });
Student.belongsTo(User, { foreignKey: 'userId' });

module.exports = Student;