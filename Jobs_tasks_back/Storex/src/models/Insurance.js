const Sequelize = require("sequelize");
const db = require("../loaders/sequelize");

const Insurance = db.define("insurance", {
     id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
});
db.sync()

module.exports = Insurance;