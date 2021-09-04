import express from 'express'
import {
   createTask,
   deleteTask,
   getTasks,
   updateTask,
} from '../controllers/taskController.js'
import { isAuth, isTeacher } from '../middleware/jwt.js'

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
taskRouter.put('/:id', uploadMulter.single('document'), isAuth, updateTask)

taskRouter.post(
   '/',
   isAuth,
   isTeacher,
   uploadMulter.single('document'),
   createTask
)

taskRouter.delete('/:id', isAuth, isTeacher, deleteTask)
export default taskRouter
