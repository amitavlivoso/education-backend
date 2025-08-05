const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Question = sequelize.define("Question", {
  exam_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'exams',
      key: 'id'
    }
  },
  question_text: DataTypes.TEXT,
  options: DataTypes.JSON,
  correct_option: DataTypes.CHAR(1)
}, {
  tableName: "questions",
  timestamps: true
});

module.exports = Question;
