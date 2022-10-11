const AppError = require("../utils/AppError")
const Car = require('../models/Car');
const CarModel = require('../models/CarModel');
const Manufacturer = require('../models/Manufacturer');

class CarService {
    async getInsuranceCars(insuranceCompanyId) {
        const car = await Car.findAll({
            where: { insuranceCompanyId },
            // include: [
            //     // {
            //     //     model: Manufacturer,
            //     // },
            //     // {
            //     //     model: CarModel,
            //     // }
            // ]
        });
        console.log(car[0].dataValues);
        let model = await CarModel.findOne({
            where: {
                id: car[0].dataValues.CarModelId
            }
        })
        let manufacturer = await Manufacturer.findOne({
            where: {
                id: car[0].dataValues.ManufacturerId
            }
        })
        //await Manufacturer.findAll({ include: Car })
        return {
            car,
            model,
            manufacturer
        };
    }
    async deleteInsuranceCar(id) {
        const car = await Car.update(
            {
                insuranceCompanyId: null,
                // policyCanceled: true
            }, {
            where: { id }
        }
        );
        return car;
    }
    async addNewCar(owner, car) {
        try {
        const carExist = await Car.findOne({
            where: {
                plateNumber: car.plateNumber
            }
        })
        if (carExist) {
            const newCar = await Car.update({
                insuranceCompanyId: car.insuranceCompanyId,
                policyNumber: car.policyNumber,
                policyStarts: new Date(),
                policyEnds: car.policyEnds,
                appendix_number: car.appendix_number,
                policyCanceled: false,
            },{
                where: {
                    id: carExist.id
                }
            });
            return newCar;
        }
        const newCar = await Car.create({
            ClientId: owner,
            policyStarts: new Date(),
            ...car
        });
        return newCar;
    } catch (error) {
        return new AppError(error.message, 400)
    }
    }
}

module.exports = CarService
