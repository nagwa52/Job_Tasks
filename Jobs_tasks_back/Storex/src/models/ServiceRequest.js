const { DataTypes } = require('sequelize')
const moment = require("moment")
const db = require("../loaders/sequelize")

const ServiceRequest = db.define("ServiceRequest",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    PhoneNumber:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    deferredPayment:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    location:{
        type:DataTypes.JSONB
    },
    status:{
        type:DataTypes.STRING,
        validate:{
            isIn: [["open","confirmed","canceled","not_available","accepted","arrived","started","done"]]
        }
    },
    fees:{
        type:DataTypes.INTEGER,
    },
    startTime:{
        type:DataTypes.DATE,
        defaultValue:moment(Date.now()).format()
    },
    startServiceTime:{
        type:DataTypes.DATE
    },
    endTime:{
        type:DataTypes.DATE
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
    comment:{
        type:DataTypes.STRING
    },
    rating:{
        type:DataTypes.INTEGER
    },
    rated:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    originalFees:{
        type:DataTypes.INTEGER
    },
    discount:{
        type:DataTypes.INTEGER,
    },
    discountPercentage:{
        type:DataTypes.INTEGER,
    },
    policyAndPackage:{
        type:DataTypes.JSONB
    }
})
db.sync()

module.exports = ServiceRequest
