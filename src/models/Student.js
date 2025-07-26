const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('./User');

const Student = sequelize.define('Student', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  enrollmentNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  course: {
    type: DataTypes.STRING,
    allowNull: true
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  timestamps: true
});

// Association
User.hasOne(Student, { foreignKey: 'userId' });
Student.belongsTo(User, { foreignKey: 'userId' });

module.exports = Student;