import express from 'express'
import {
   create,
   deleteClassroom,
   getClassroom,
   getClassrooms,
   join,
   updateClassroom,
   getRapor,
} from '../controllers/classroomController.js'
import { isAuth, isStudent, isTeacher } from '../middleware/jwt.js'

const classroomRouter = express.Router()

classroomRouter.put(`/join`, isAuth, isStudent, join)
classroomRouter.post('/', isAuth, isTeacher, create)
classroomRouter.get('/', isAuth, getClassrooms)
classroomRouter.get('/:id', isAuth, getClassroom)
classroomRouter.put('/:id', isAuth, updateClassroom)
classroomRouter.delete('/:id', isAuth, deleteClassroom)
classroomRouter.get('/:classroomId/rapor/:studentId', isAuth, getRapor)
export default classroomRouter
