const { DataTypes } = require('sequelize');
const sequelize = require("../loaders/sequelize");

const CarAccidentReports = sequelize.define('CarAccidentReports',{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
  });


module.exports = CarAccidentReports;