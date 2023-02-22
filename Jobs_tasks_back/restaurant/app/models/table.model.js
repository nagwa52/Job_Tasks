module.exports = (sequelize, Sequelize) => {
  const Table = sequelize.define("tables", {
    Number: {
      type: Sequelize.INTEGER,
      unique: true,
    },
    NumberOfSeats: {
      type: Sequelize.INTEGER,
    },
    isOccupied: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    }
  });

  return Table;
};
