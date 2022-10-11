const Sequelize = require("sequelize");
const db = require("../loaders/sequelize");


const InsuranceCompany = db.define("insuranceCompany", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
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
  package_request_count:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  package_discount_percentage:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  max_total_discount:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  discount_precent_after_policy_expires:{
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

db.sync()

// InsuranceCompany.hasMany(Insurance, { foreignKey: 'insuranceCompanyId' });

module.exports = InsuranceCompany;
