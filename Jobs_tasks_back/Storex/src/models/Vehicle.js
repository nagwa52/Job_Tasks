const { DataTypes } = require("sequelize");
const db = require("../loaders/sequelize");

const Vehicle = db.define("Vehicle", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Vec_plate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Vec_name: {
    type: DataTypes.STRING,
  },
  Vec_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Vec_num: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  PhoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  IMEI: {
    type: DataTypes.STRING,
  },
});
db.sync();

module.exports = Vehicle;
