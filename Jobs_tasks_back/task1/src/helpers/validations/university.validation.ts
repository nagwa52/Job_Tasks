import Joi from 'joi'
// Joi.alternatives().try()
export const UniversityValidation = Joi.object().keys({
	domains: Joi.array().items(Joi.string().pattern(new RegExp('(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]'))).required(),
	web_pages: Joi.string().required(),
	name: Joi.string().min(3).required(),
	country: Joi.array().items(Joi.string()).required(),
	alpha_two_code : Joi.string().max(2).default('EG').uppercase().required(),

})
