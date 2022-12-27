const db = require('../loaders/sequelize')
const { DataTypes } = require('sequelize');

const Car = db.define('Car', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  plateNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  policyNumber: {
    type: DataTypes.STRING,
  },
  policyStarts: {
    type: DataTypes.DATE
  },
  policyEnds: {
    type: DataTypes.DATE
  },
  appendix_number: {
    type: DataTypes.STRING
  },
  vin_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  policyCanceled: {
    type: DataTypes.BOOLEAN
  },
  insuranceCompanyId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  /* owner: {
    type: DataTypes.INTEGER,
    allowNull: false

  }, */
  ManufacturerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Manufacturers',
    }
  },
  CarModelId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'CarModels',
    }
  },
  ClientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Clients',
    }
  }
});
db.sync()

module.exports = Car