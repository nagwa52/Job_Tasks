module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      employeeNumber: {
        type: Sequelize.INTEGER,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        
      }
    });
  
    return User;
  };