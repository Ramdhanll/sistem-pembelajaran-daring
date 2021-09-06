import express from 'express'
import {
   createExam,
   deleteExam,
   getExams,
   updateExam,
   submitExam,
   givingGrades,
   endExam,
} from '../controllers/examController.js'
import { isAuth, isStudent, isTeacher } from '../middleware/jwt.js'

import multer from 'multer'

const storage = multer.diskStorage({
   destination(req, file, cb) {
      cb(null, 'src/exams')
   },
   filename(req, file, cb) {
      const { originalname } = file
      const format = originalname.slice(originalname.indexOf('.'))
      cb(null, `${Date.now()}${format}`)
   },
})
const uploadMulter = multer({ storage })

const examRouter = express.Router()

examRouter.get('/:classroomId', isAuth, getExams)
examRouter.put(
   '/:id',
   uploadMulter.single('document'),
   isAuth,
   isTeacher,
   updateExam
)
examRouter.put(
   '/:id/submit',
   uploadMulter.single('answer'),
   isAuth,
   isStudent,
   submitExam
)
examRouter.put('/:id/grades', isAuth, isTeacher, givingGrades)
examRouter.put('/:id/end', isAuth, endExam)

examRouter.post(
   '/',
   isAuth,
   isTeacher,
   uploadMulter.single('document'),
   createExam
)

examRouter.delete('/:id', isAuth, isTeacher, deleteExam)
export default examRouter
