module.exports = (sequelize, Sequelize) => {
    const Reservation = sequelize.define("reservations", {
      id:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    resDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    resTime: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    people: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          arg: true,
          msg: "Should be an integer value!",
        },
        min: {
          args: [1],
          msg: "One person at least!",
        },
        max: {
          args: [12],
          msg: "Maximum 12 people per reservation!",
        },
      },
    },
    })
    return Reservation;
  };