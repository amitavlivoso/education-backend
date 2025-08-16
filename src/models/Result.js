const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

//models/Result.js

  const Result = sequelize.define('Result', {
    examId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attempted: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    correct: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    wrong: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unattempted: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chapter: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     teacherId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Assuming teacherId can be null
    }
  });

    module.exports = Result;
