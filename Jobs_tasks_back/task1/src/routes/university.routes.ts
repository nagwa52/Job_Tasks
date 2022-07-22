import { Router } from 'express'
import {
    getAllUniversities,AddUniversity,UpdateUniversity,DeleteUniversity,ListUniversities,getUniversity
} from '../controllers/universities/UniversityController'

const router = Router()

router.post('/', getAllUniversities)
router.get('/:id', getUniversity)
router.get('/all/universities', ListUniversities)
router.post('/', AddUniversity)
router.put('/:id', UpdateUniversity)
router.delete('/:id', DeleteUniversity)

export default router
