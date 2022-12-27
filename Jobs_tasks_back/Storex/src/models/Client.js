const { DataTypes } = require('sequelize');
const db = require("../loaders/sequelize");


const Client = db.define('Client',{
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  active:{
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  confirmed:{
    type:DataTypes.BOOLEAN
  }
  
});
db.sync()

module.exports = Client;
