const { DataTypes } = require("sequelize");
const db = require("../loaders/sequelize");

const PromoCode = db.define("PromoCode", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  usageExpiryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  percentage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
db.sync();

module.exports = PromoCode;
