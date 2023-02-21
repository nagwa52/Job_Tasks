const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Role = db.role;

checkDuplicateemployeeNumber = (req, res, next) => {
  // employeeNumber
  User.findOne({
    where: {
      employeeNumber: req.body.employeeNumber,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! employeeNumber is already in use!",
      });
      return;
    }
    next();
  });
};

checkRolesExisted = (req, res, next) => {
  Role.findOne({
    where: {
      id: req.body.RoleId,
    },
  }).then((role) => {
    if (!role) {
      res.status(400).send({
        message: "Failed! Role does not exist = " + req.body.RoleId,
      });
      return;
    }
    next();
  });
};

const verifySignUp = {
  checkDuplicateemployeeNumber: checkDuplicateemployeeNumber,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
