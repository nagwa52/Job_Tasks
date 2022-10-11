const { DataTypes } = require('sequelize');
const db = require("../loaders/sequelize");

const ServiceRequestDriver = db.define('ServiceRequestDriver',{
})
db.sync()
module.exports = ServiceRequestDriver;
