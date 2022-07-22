import { Request, Response } from 'express'
import { sendNotFoundResponse } from '../../helpers/responses/404.response'
import { UniversityValidation } from '../../helpers/validations/university.validation'
import { formatValidationErrors } from '../../helpers/functions/formatValidationErrors'
import { sendErrorResponse } from '../../helpers/responses/sendErrorResponse'
import { StatusCodes } from '../../helpers/constants/statusCodes'
import { sendSuccessResponse } from '../../helpers/responses/sendSuccessResponse'
import { GetUniversityValidation } from '../../helpers/validations/GetUniversity.validation'
const { readFileSync } = require('fs')
const { writeFileSync } = require('fs')
const getAllUniversities = async (req: Request, res: Response) => {
	const dataPath = 'src/controllers/universities/university.json'
	const UniversitiesData = readFileSync(dataPath, 'utf-8')
	let universities = JSON.parse(UniversitiesData)
	const validation = await GetUniversityValidation.validateAsync(req.body, {
		abortEarly: false,
	})
	const universitiesByCountries = universities.filter((obj: any) => {
		return validation.country.includes(obj.country)
	})
	if (universitiesByCountries)
		if (universitiesByCountries) {
			sendSuccessResponse(res, universitiesByCountries)
		} else {
			sendNotFoundResponse(res)
		}
	return UniversitiesData
}
const ListUniversities = async (req: Request, res: Response) => {
	const dataPath = 'src/controllers/universities/university.json'
	const UniversitiesData = readFileSync(dataPath, 'utf-8')
	let universities = JSON.parse(UniversitiesData)
	if (universities){
	sendSuccessResponse(res, universities)
		} else {
			sendNotFoundResponse(res)
			console.log('error')
		}

}
const getUniversity = async (req: Request, res: Response) => {
	const dataPath = 'src/controllers/universities/university.json'
	const UniversitiesData = readFileSync(dataPath, 'utf-8')
	let universities = JSON.parse(UniversitiesData)
	const universityId = req.params['id']
	if (universities[universityId]){
	sendSuccessResponse(res, universities[universityId])
		} else {
			sendNotFoundResponse(res)
		}

}


const AddUniversity = async (req: Request, res: Response) => {
	try {
		const dataPath = 'src/controllers/universities/university.json'
		const validation = await UniversityValidation.validateAsync(req.body, {
			abortEarly: false,
		})
		if (!req.body['state-province']) {
			req.body['state-province'] = null
		} else {
			let state_province = req.body['state-province']
			validation.state_province = state_province
		}
		const UniversitiesData = readFileSync(dataPath, 'utf-8')
		let universities = JSON.parse(UniversitiesData)

		universities.push(validation)
		const stringifyData = JSON.stringify(universities)
		const addedData = writeFileSync(dataPath, stringifyData, 'utf-8')
		sendSuccessResponse(res, validation)
	} catch (error: any) {
		sendErrorResponse(
			['unable to add this university'],
			res,
			StatusCodes.NOT_ACCEPTABLE
		)
	}
}
const saveUniversityData = async (data: any, req: Request, res: Response) => {
	try {
		const dataPath = 'src/controllers/universities/university.json'
		const stringifyData = JSON.stringify(data)
		const addedData = writeFileSync(dataPath, stringifyData, 'utf-8')
		if (addedData) {
			sendSuccessResponse(res, addedData)
		}
		sendSuccessResponse(res)
	} catch (error: any) {
		sendErrorResponse(
			formatValidationErrors(error),
			res,
			StatusCodes.NOT_ACCEPTABLE
		)
	}
}
const UpdateUniversity = async (req: Request, res: Response) => {
	try {
		const dataPath = 'src/controllers/universities/university.json'
		const UniversitiesData = readFileSync(dataPath, 'utf-8')
		let universities = JSON.parse(UniversitiesData)
		const validation = await UniversityValidation.validateAsync(req.body, {
			abortEarly: false,
		})
		const universityId = req.params['id']
		universities[universityId] = validation
		saveUniversityData(universities, req, res)
	} catch (error: any) {
		sendErrorResponse(
			formatValidationErrors(error),
			res,
			StatusCodes.NOT_ACCEPTABLE
		)
	}
}
const DeleteUniversity = async (req: Request, res: Response) => {
	try {
		const dataPath = 'src/controllers/universities/university.json'
		const UniversitiesData = readFileSync(dataPath, 'utf-8')
		let universities = JSON.parse(UniversitiesData)
		const universityId = req.params['id']
		universities.splice(universityId, 1)
		saveUniversityData(universities, req, res)
	} catch (error: any) {
		sendErrorResponse(
			formatValidationErrors(error),
			res,
			StatusCodes.NOT_ACCEPTABLE
		)
	}
}
export { getAllUniversities, getUniversity,AddUniversity, UpdateUniversity, DeleteUniversity,ListUniversities }
