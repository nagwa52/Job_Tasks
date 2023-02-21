const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    employeeNumber: req.body.employeeNumber,
    password: bcrypt.hashSync(req.body.password, 8),
    RoleId:req.body.RoleId
  })
    .then((user) => {
      res.status(200).send({ message: "User was registered successfully!",user});
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      employeeNumber: req.body.employeeNumber,
    },
    include:[Role]
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
        res.status(200).send({
          id: user.id,
          employeeNumber: user.employeeNumber,
          roleName:user.role.name,
          accessToken: token,
        });
      // });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
