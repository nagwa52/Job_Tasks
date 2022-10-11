const { DataTypes } = require('sequelize');
const db = require("../loaders/sequelize");


const CorporateCompany = db.define("CorporateCompany",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      en_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ar_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      discount_ratio:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deferredPayment:{
        type: DataTypes.BOOLEAN,
        
      }
})
db.sync()

module.exports = CorporateCompany