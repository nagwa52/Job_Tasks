import { Request, Response } from 'express'
import { sendSuccessResponse } from '../../helpers/responses/sendSuccessResponse';
import { sendNotFoundResponse } from '../../helpers/responses/404.response'
const { readFileSync } = require('fs');
export const show_all_countries= async (req: Request, res: Response) => {
    const dataPath ='src/controllers/countries/countries.json'
    const Data = readFileSync(dataPath,"utf-8");
    let universities = JSON.parse(Data);
	if (universities) {
		sendSuccessResponse(res, universities)
	} else {
		sendNotFoundResponse(res)
	}
    return universities
}