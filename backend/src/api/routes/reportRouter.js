import express from 'express'
import { body } from 'express-validator'
import {
   createReport,
   getReport,
   updateReport,
} from '../controllers/reportController.js'
import { isAuth, isTeacher } from '../middleware/jwt.js'

const reportRouter = express.Router()

reportRouter.get('/:classroomId', isAuth, getReport)
reportRouter.put('/:classroomId', isAuth, updateReport)

reportRouter.post(
   '/',
   body('classroom').notEmpty().withMessage('Kelas diperlukan!'),
   body('rh').notEmpty().withMessage('RH diperlukan!'),
   body('pts').notEmpty().withMessage('PTS diperlukan!'),
   body('pas').notEmpty().withMessage('PAS diperlukan!'),
   isAuth,
   isTeacher,
   createReport
)

export default reportRouter
