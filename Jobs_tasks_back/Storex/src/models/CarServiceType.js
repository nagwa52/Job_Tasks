const { DataTypes } = require("sequelize");
const db = require("../loaders/sequelize");

const CarServiceType = db.define("CarServiceType", {
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
  },
  base_cost: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cosr_per_km: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  car_type: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});
db.sync();

module.exports = CarServiceType;
