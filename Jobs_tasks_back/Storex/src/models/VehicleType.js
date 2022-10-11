const db = require('../loaders/sequelize')
const { DataTypes } = require('sequelize');

const VehicleType = db.define('VehicleType', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  TypeName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
db.sync()

module.exports = VehicleType