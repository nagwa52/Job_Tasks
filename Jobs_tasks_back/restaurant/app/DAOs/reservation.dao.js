const db = require("../models");
const Reservation = db.reservation;
const Table = db.table;
const { flattenArrayObjects } = require("../utils/flattenObject");

const findAllReservations = async () => {
  const reservations = await Reservation.findAll({
  });
  return flattenArrayObjects(reservations);
};

const findReservationById = async (reservationId) => {
  const reservation = await Reservation.findOne({
    where: {
      id: reservationId,
    },
  });

  return reservation;
};


const createReservation = async (resDetails) => {
  const { resDate, resTime, people } = resDetails;
  const result = await db.sequelize.transaction(async (t) => {
    const reservation = await Reservation.create(
      {
        resDate: resDate,
        resTime: resTime,
        people: people,
      },
      { transaction: t }
    );

    return reservation;
  });
  return result;
};

const updateReservation = async (reservationId, resDetails) => {
  const [result, metadata] = await Reservation.update(resDetails, {
    where: {
      id: reservationId,
    },
  });

  return result;
};

const deleteReservation = async (reservation) => {
  return await reservation.destroy();
};

const setReservationTable = async (reservationId, tableId) => {
  await Table.update(
    {
      isOccupied: true,
      reservationId: reservationId,
    },
    {
      where: {
        id: tableId,
      },
    }
  );
};

module.exports = {
  findAllReservations,
  createReservation,
  updateReservation,
  deleteReservation,
  findReservationById,
  setReservationTable,
};
