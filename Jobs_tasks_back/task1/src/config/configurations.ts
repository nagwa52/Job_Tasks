import * as dotenv from 'dotenv'
import { IConfigInterface } from '../helpers/interfaces/IConfig.interface'
dotenv.config()
export default (): IConfigInterface => ({
	port: process.env.PORT ? parseInt(process.env.PORT, 10) || 4000 : 4000,	
	websiteUrl: process.env.WEBSITE_URL ?? 'http://localhost:3000',

})
