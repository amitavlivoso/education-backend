const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');


const Coursecategory = sequelize.define('Coursecategory', {
 teacherid: {
    type: DataTypes.INTEGER,
    allowNull: false,
   
   
  },
  categorytype: DataTypes.STRING,
  price: DataTypes.INTEGER,

}, {
  tableName: 'coursecategory',
  timestamps: true
});



module.exports = Coursecategory;
