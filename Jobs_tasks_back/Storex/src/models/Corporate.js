const { DataTypes } = require('sequelize');
const db = require("../loaders/sequelize");


const Corporate = db.define('Corporate',{

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  } 
});
db.sync()
module.exports = Corporate;