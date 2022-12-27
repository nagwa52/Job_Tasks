const db = require('../loaders/sequelize')
const { DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

const CarModel = db.define('CarModel', {
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
});

db.sync()

module.exports = CarModel
