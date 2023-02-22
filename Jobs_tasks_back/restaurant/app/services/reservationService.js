const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Table = db.table;
const Reservation = db.reservation;

const dateTimeValidator = require("../utils/DateAndTimeValidator");

const retrieveReservation = (req,res,next) => {
  Reservation.findAll()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reservations."
      });
    });
};

const validateTime = (currDate, resDate, resTime) => {
  if (resDate === dateTimeValidator.asDateString(currDate)) {
    if (resTime < dateTimeValidator.asTimeString(currDate)) {
      throw {
        status: 400,
        message: "ERROR: Given time is in the past!",
      };
    }
  }
};

const checkClosingOpeningTime = (resTime) => {
  if (resTime > "23:59:00") {
    throw {
      status: 400,
      message:
        "Reservation must be made at least an hour before closing time (12:00 AM)",
    };
  } else if (resTime < "12:00:59") {
    throw {
      status: 400,
      message: "You can't make reservation before opening time! (12:00 AM)",
    };
  }
};

const isFieldEmpty = (payload) => {
  if (
    !payload.resDate ||
    !payload.resTime||
    !payload.people
  ) {
    throw {
      status: 400,
      message: "Please fill in all fields!",
    };
  }
};

const registerReservation = async (payload) => {
  isFieldEmpty(payload);
  validateTime(new Date(), payload.resDate, payload.resTime);
  checkClosingOpeningTime(payload.resTime);
  return await (payload);
};

// const editReservation = async (reservationId, reservationDAO, payload) => {
//   const reservation = await reservationDAO.findReservationById(reservationId);
//   if (!reservation)
//     throw {
//       status: 404,
//       message: "Reservation not found!",
//     };
//   validateTime(new Date(), payload.resDate, payload.resTime);
//   checkClosingOpeningTime(payload.resTime);
//   return await reservationDAO.updateReservation(reservationId, payload);
// };

// const cancelReservation = async (reservationId, reservationDAO) => {
//   const reservation = await reservationDAO.findReservationById(reservationId);
//   if (reservation) return await reservationDAO.deleteReservation(reservation);

//   throw {
//     status: 400,
//     message: "Given reservation doesn't exist!",
//   };
// };

const compareResDateToCurrDate = (resDate, currDate) => {
  return resDate > currDate ? 1 : resDate < currDate ? -1 : 0;
};

const chooseTable = async (
  reservationId,
  tableId,
) => {
  let reservation = await Reservation.findReservationById(reservationId);
  if (!reservation) {
    throw {
      status: 404,
      message: "Reservation not found!",
    };
  }
  const table = await Table.findTableById(tableId);

  const currDate = new Date();
  const currDateStr = dateTimeValidator.asDateString(currDate);

  /**
   * if the reservation day is in the future (compared to current date)
   *  => throw error
   */
  if (compareResDateToCurrDate(reservation.resDate, currDateStr) === 1) {
    throw {
      status: 400,
      message: "Booking a table is only available on the reservation date!",
    };
  }

  /**
   * if the reservation day is in the past (compared to current date)
   *  => update the reservation's status to 'missed'
   */

  if (compareResDateToCurrDate(reservation.resDate, currDateStr) === -1) {
    throw {
      status: 400,
      message: "Booking a table is is missed",
    };
  }

  /**
   * If the reservation day is equal to current day
   *  and reservation time is the past (compared to current date - 30 minutes)
   *  => update the reservation's status to missed
   */
  if (compareResDateToCurrDate(reservation.resDate, currDateStr) === 0) {
    const currTimePlus30minsStr = dateTimeValidator.asTimeString(
      new Date(currDate.setMinutes(currDate.getMinutes() - 2))
    );
    // if (currTimePlus30minsStr > reservation?.resTime) {
    //   reservation = await reservationDAO.setReservationStatus(
    //     reservation,
    //     "missed"
    //   );
    // }
  }
  /**
   *
   * If the given table is already occupied throw an error
   */
  if (table.isOccupied)
    throw {
      status: 400,
      message: "Given table is already reserved!",
    };

  /**
   *
   * If the given reservation's party size is bigger than the table's capacity =>
   *  throw Error
   *  else => create the record
   */
  if (reservation.people > table.NumberOfSeats)
    throw {
      status: 400,
      message: "Reservation's party size is too big for this table!",
    };

  return await reservationDAO.setReservationTable(reservationId, tableId);
};
const deleteReservation = async (reservation) => {
  return await reservation.destroy();
};
const cancelReservation = async (reservationId, reservationDAO) => {
  const reservation = await reservationDAO.findReservationById(reservationId);
  if (reservation) return await reservationDAO.deleteReservation(reservation);

  throw {
    status: 400,
    message: "Given reservation doesn't exist!",
  };
};
module.exports = {
  retrieveReservation,
  registerReservation,
  cancelReservation,
  chooseTable,
};
