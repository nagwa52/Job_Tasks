const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.table = require("../models/table.model.js")(sequelize, Sequelize);
db.reservation = require("../models/reservation.model.js")(sequelize, Sequelize);

db.user.belongsTo(db.role, {
  foreignKey: 'RoleId'
});

db.ROLES = ["employee", "admin"];

module.exports = db;