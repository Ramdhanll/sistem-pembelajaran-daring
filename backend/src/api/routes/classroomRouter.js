import express from 'express'
import {
   create,
   deleteClassroom,
   getClassroom,
   getClassrooms,
   updateClassroom,
} from '../controllers/classroomController.js'
import { isAuth, isTeacher } from '../middleware/jwt.js'

const classroomRouter = express.Router()

classroomRouter.post('/', isAuth, isTeacher, create)
classroomRouter.get('/', isAuth, getClassrooms)
classroomRouter.get('/:id', isAuth, getClassroom)
classroomRouter.put('/:id', isAuth, isTeacher, updateClassroom)
classroomRouter.delete('/:id', isAuth, isTeacher, deleteClassroom)

export default classroomRouter
