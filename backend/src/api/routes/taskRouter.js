import express from 'express'
import {
   createTask,
   deleteTask,
   getTasks,
   updateTask,
   submitTask,
   givingGrades,
} from '../controllers/taskController.js'
import { isAuth, isStudent, isTeacher } from '../middleware/jwt.js'

import multer from 'multer'

const storage = multer.diskStorage({
   destination(req, file, cb) {
      cb(null, 'src/tasks')
   },
   filename(req, file, cb) {
      const { originalname } = file
      const format = originalname.slice(originalname.indexOf('.'))
      cb(null, `${Date.now()}${format}`)
   },
})
const uploadMulter = multer({ storage })

const taskRouter = express.Router()

taskRouter.get('/:classroomId', isAuth, getTasks)
taskRouter.put(
   '/:id',
   uploadMulter.single('document'),
   isAuth,
   isTeacher,
   updateTask
)
taskRouter.put(
   '/:id/submit',
   uploadMulter.single('answer'),
   isAuth,
   isStudent,
   submitTask
)
taskRouter.put('/:id/grades', isAuth, isTeacher, givingGrades)

taskRouter.post(
   '/',
   isAuth,
   isTeacher,
   uploadMulter.single('document'),
   createTask
)

taskRouter.delete('/:id', isAuth, isTeacher, deleteTask)
export default taskRouter
