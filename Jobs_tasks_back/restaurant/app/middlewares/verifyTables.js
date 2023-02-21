const db = require("../models");
const Table = db.table;

checkDuplicateTableNumber = (req, res, next) => {
  // tableNumber
  Table.findOne({
    where: {
      Number: req.body.Number,
    },
  }).then((table) => {
    if (table) {
      res.status(400).send({
        message: "Failed! Table number is already in use!",
      });
      return;
    }
    next();
  });
};

const verifyTables = {
  checkDuplicateTableNumber: checkDuplicateTableNumber,
};

module.exports = verifyTables;
