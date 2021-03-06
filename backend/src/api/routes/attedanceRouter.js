import express from 'express'
import {
   createAttedance,
   deleteAttedance,
   getAttedances,
   submitAttendance,
   updateAttedance,
   endAttendance,
} from '../controllers/attedanceController.js'
import { isAuth, isTeacher } from '../middleware/jwt.js'

const attedanceRouter = express.Router()

attedanceRouter.get('/:classroomId', isAuth, getAttedances)
attedanceRouter.put('/:id', isAuth, updateAttedance)
attedanceRouter.put('/:id/submit', isAuth, submitAttendance)
attedanceRouter.put('/:id/end', isAuth, endAttendance)

attedanceRouter.post('/', isAuth, isTeacher, createAttedance)

attedanceRouter.delete('/:id', isAuth, isTeacher, deleteAttedance)
export default attedanceRouter
