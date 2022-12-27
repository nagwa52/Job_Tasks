const {DataTypes} = require("sequelize")

const db = require("../loaders/sequelize")

const ClientPackage = db.define("ClientPackage", {
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
    numberOfDiscountedRequests:{
        type:DataTypes.INTEGER
    },
    paymentMethod:{
        type:DataTypes.STRING,
        validate:{
            isIn: [["cash","card-to-driver","online-card","online-wallet"]]
        }
    },
    paymentStatus:{
        type:DataTypes.STRING,
        validate:{
            isIn:[["pending","not-paid","paid","draft","need-refund","refund-done"]]
        }
    },
    PaymentResponse:{
        type:DataTypes.JSONB
    },
    order_id:{
        type:DataTypes.STRING
    },
    PaymentToken:{
        type:DataTypes.STRING
    }
})

db.sync()

module.exports = ClientPackage