import { show_all_countries } from './../controllers/countries/CountryController';
import { Router } from 'express'

const router = Router()
router.get('/', show_all_countries);


export default router;
