const { DataTypes } = require("sequelize");
const db = require("../loaders/sequelize");

const Driver = db.define("Driver", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  offline: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  service_car_type: {
    type:  DataTypes.STRING,
    allowNull: false,
  },
  average_rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  location: {
    type: DataTypes.JSONB,
  },
  photo: {
    type: DataTypes.STRING,
  },
  fcmtoken:{
    type:DataTypes.STRING,
  }
});
db.sync();

module.exports = Driver;
