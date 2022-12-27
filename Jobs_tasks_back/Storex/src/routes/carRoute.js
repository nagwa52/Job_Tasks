const express = require("express")
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/AppError")
const userService = require("../services/userService");
const CarService = require("../services/carService")
const clientService = require("../services/clientService")
const auth = require('../middlewares/auth')
const restricted = require("../middlewares/restriction")
const validation = require("../middlewares/validations/CarValidation")
const validate = require('../middlewares/validation'); 
const router = express.Router()



router.get('/', auth , restricted(1,3,4) , catchAsync(async (req, res) => {
    const insuranceCompanyId = req.body.insuranceCompanyId

    const carService = new CarService()
    const cars = await carService.getInsuranceCars(Number(insuranceCompanyId));
    res.status(200).json({
        status: "success",
        cars: cars
    })
}))

router.delete('/', auth , restricted(1,3,4) ,catchAsync(async (req, res) => {
    const id = req.body.id
    const carService = new CarService()
    await carService.deleteInsuranceCar(Number(id));
    res.status(200).json({
        status: "success",
    })
}))
// validate(validation.carValidation)
// , auth , restricted(1,3,4)
router.post('/create' ,validate(validation.carValidation),catchAsync(async (req, res, next) => {
    const { car, phoneNumber, email , name} = req.body
    const User = await userService.findUserByPhoneNumber(phoneNumber);
    const carService = new CarService()
    if (User) {
        const client = await clientService.getClientByUserId(User.id)
        const newCar = await carService.addNewCar(client.id, car);
        res.status(201).json({
            status: "success",
            car: newCar
        })
    } else {
        const UserData = await userService.createUser({ PhoneNumber: phoneNumber, name: name, email });
        if (UserData.statusCode) return next(new AppError(UserData.message, UserData.statusCode))

        const data = UserData;
        const newCar = await carService.addNewCar(data.id, car);
        res.status(201).json({
            status: "success",
            car: newCar
        })
    }
}))

module.exports = router