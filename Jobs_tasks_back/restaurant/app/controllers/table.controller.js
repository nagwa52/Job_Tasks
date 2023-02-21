const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Table = db.table;


exports.retrieveTables = (req,res,next) => {
  Table.findAll()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tables."
      });
    });
};
exports.addTable = (req, res) => {
  Table.create({
    Number: req.body.Number,
    NumberOfSeats: req.body.NumberOfSeats,
  })
    .then((table) => {
      res.status(200).send({ message: "Table was added  successfully!",table});
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
exports.deleteTable = (req, res) => {
  const id = req.params.id;

  Table.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Table was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Table with id=${id}. Maybe Table was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Table with id=" + id
      });
    });
};