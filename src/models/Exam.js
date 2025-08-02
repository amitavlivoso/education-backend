const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Question = require("./Questions.js");

const Exam = sequelize.define("Exam", {
  subject: DataTypes.STRING,
  chapter: DataTypes.STRING,
  total_count: DataTypes.INTEGER,
  estimated_time: DataTypes.INTEGER
}, {
  tableName: "exams",
  timestamps: true
});
Exam.hasMany(Question, {
  foreignKey: 'exam_id',
  as: 'questions'
});

module.exports = Exam;
