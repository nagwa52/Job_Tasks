const Sequelize = require("sequelize");
const db = require("../loaders/sequelize");

const AccidentType = db.define("accidentType", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  en_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ar_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  requiredImages: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
});
db.sync()

module.exports = AccidentType;
