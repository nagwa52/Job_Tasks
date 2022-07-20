import { Router } from 'express'
import {
    getAllUniversities,AddUniversity,UpdateUniversity,DeleteUniversity
} from '../controllers/universities/UniversityController'

const router = Router()

router.get('/', getAllUniversities)
router.post('/add', AddUniversity)
router.put('/:id', UpdateUniversity)
router.delete('/:id', DeleteUniversity)

export default router
