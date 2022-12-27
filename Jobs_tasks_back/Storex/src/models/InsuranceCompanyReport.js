const { DataTypes } = require("sequelize");
const db = require("../loaders/sequelize");
const InsuranceCompanyReport = db.define(
    "InsuranceCompanyReport",
    {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        report :{
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
);
db.sync()
module.exports = InsuranceCompanyReport;