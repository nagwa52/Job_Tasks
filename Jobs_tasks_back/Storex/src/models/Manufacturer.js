const { DataTypes } = require('sequelize');
const db = require('../loaders/sequelize')

const Manufacturer = db.define("Manufacturer",{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
    en_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      ar_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
})
db.sync()


module.exports = Manufacturer