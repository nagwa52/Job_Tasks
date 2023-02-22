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
  app.post(
    "/api/reservations/register",
    [authJwt.verifyToken,authJwt.isAdmin],
    reservationController.registerHandler
  );
  app.post("/api/reservations/choose-table/:reservationId", 
  [authJwt.verifyToken,authJwt.isAdmin],
  reservationController.chooseTableHandler
);
};
