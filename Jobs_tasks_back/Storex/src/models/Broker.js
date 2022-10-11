const { DataTypes } = require('sequelize');
const db = require("../loaders/sequelize");


const Broker = db.define('Broker',{

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  } 
});
db.sync()
module.exports = Broker;