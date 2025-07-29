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
      model: 'Users', // Must match table name Sequelize auto-uses (pluralized form)
      key: 'id',
    },
  },
  address: DataTypes.STRING,
  subject: DataTypes.STRING,
  experience: DataTypes.STRING,
}, {
  tableName: 'teacherdetails',
  timestamps: true
});

// ✅ Define association here (this is okay in the model file)
Teacher.belongsTo(User, { foreignKey: 'userid' });
User.hasOne(Teacher, { foreignKey: 'userid' });

module.exports = Teacher;
