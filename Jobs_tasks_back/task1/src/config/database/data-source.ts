import { DataSource } from 'typeorm'
import configurations from '../configurations'
const config = configurations()
export const AppDataSource = new DataSource({
	type: 'mysql',
})
