module.exports = (sequelize, Sequelize) => {
    const Table = sequelize.define("tables", {
      Number: {
        type: Sequelize.INTEGER,
        unique: true
      },
      NumberOfSeats: {
        type: Sequelize.INTEGER,
        
      }
    });
  
    return Table;
  };