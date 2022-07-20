import Joi from 'joi'

export const GetUniversityValidation = Joi.object().keys({
	country: Joi.array().items(Joi.string()).required(),


})