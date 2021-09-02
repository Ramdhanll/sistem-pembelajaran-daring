import express from 'express'
import {
   createAttedance,
   deleteAttedance,
   getAttedances,
   updateAttedance,
} from '../controllers/attedanceController.js'
import { isAuth, isTeacher } from '../middleware/jwt.js'

const attedanceRouter = express.Router()

attedanceRouter.get('/:classroomId', isAuth, getAttedances)
attedanceRouter.put('/:id', isAuth, updateAttedance)

attedanceRouter.post('/', isAuth, isTeacher, createAttedance)

attedanceRouter.delete('/:id', isAuth, isTeacher, deleteAttedance)
export default attedanceRouter
