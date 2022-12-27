const { DataTypes } = require('sequelize');
// const sequelize = require('../loaders/sequelize');
const db = require("../loaders/sequelize");

const User = db.define('User',{

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  PhoneNumber:{
    type: DataTypes.STRING,
    unique:true,
    allowNull: true,
    // validate:{
    //   isInt:  {
    //     msg: "Must be an integer number of pennies"
    //   },
    // }
  },
  // dataProfile:{
  //   type: DataTypes.INTEGER,
  //   allowNull: false
  // }, 
  email:{
    type: DataTypes.STRING,
    unique:true,
    // validate:{
    //   isEmail: {
    //     msg:"Enter Valid Email!"
    //   },
    // }
  },
  password:{
    type: DataTypes.STRING,
    validate:{
      min: 8,
    }
    ,allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  blocked:{
    type:DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue:false
  },
},{
  timestamps:true
})
db.sync()
module.exports = User;
