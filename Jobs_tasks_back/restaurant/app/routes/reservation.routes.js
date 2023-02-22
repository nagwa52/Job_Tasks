const { authJwt } = require("../middlewares");
const reservationController = require("../controllers/reservation.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/api/reservations/all",
    [authJwt.verifyToken,authJwt.isAdmin],
    reservationController.getAllHandler
  );
  // app.post(
  //   "/api/tables/add",
  //   [authJwt.verifyToken,authJwt.isAdmin,verifyTables.checkDuplicateTableNumber],
  //   controller.addTable
  // );
  // app.delete(
  //   "/api/tables/delete/:id",
  //   [authJwt.verifyToken,authJwt.isAdmin],
  //   controller.deleteTable
  // );
};
