const Joi = require('joi')
    exports.carValidation = Joi.object().keys({
        phoneNumber: Joi.string().length(11).required(),
        name: Joi.string().min(3).required(),
        email: Joi.string().required().email(),
        car: Joi.object().keys({
            plateNumber: Joi.string().required(),
            year: Joi.number().min(1).required(),
            policyNumber: Joi.string().required(),
            policyEnds: Joi.date().required(),
            appendix_number: Joi.string().required(),
            vin_number: Joi.string().required(),
            policyCanceled: Joi.boolean().required(),
            insuranceCompanyId: Joi.number().min(1).required(),
            ManufacturerId: Joi.number().min(1).required(),
            CarModelId: Joi.number().min(1).required(),
            
         } )
    })
