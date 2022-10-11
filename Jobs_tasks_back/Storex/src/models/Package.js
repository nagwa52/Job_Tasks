const {DataTypes} = require("sequelize")

const db = require("../loaders/sequelize")

const Package = db.define("Package", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    enName : {
        type: DataTypes.STRING,
        allowNull:false
    },
    arName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fees:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    maxDiscountPerTime:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    numberOfDiscountTimes:{
        type:DataTypes.INTEGER
    },
    discountPercentage:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})

db.sync()

module.exports = Package