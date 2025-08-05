const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Question = require("./Questions.js");

const Exam = sequelize.define("Exam", {
  teacher_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subject: DataTypes.STRING,
  chapter: DataTypes.STRING,
  total_count: DataTypes.INTEGER,
  estimated_time: DataTypes.INTEGER,
  selectedExamType: DataTypes.STRING,
 
}, {
  tableName: "exams",
  timestamps: true
});
Exam.hasMany(Question, {
  foreignKey: 'exam_id',
  as: 'questions'
});

module.exports = Exam;
