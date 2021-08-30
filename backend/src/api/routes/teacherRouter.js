import express from 'express'
import {
   createTeacher,
   deleteTeacher,
   getTeacher,
   getTeachers,
   seed,
   updateTeacher,
} from '../controllers/teacherController.js'
import { isAdmin, isAuth } from '../middleware/jwt.js'
import { body } from 'express-validator'
import Teachers from '../models/teachersModel.js'

const teacherRouter = express.Router()

teacherRouter.get('/seed', seed)
teacherRouter.get('/', isAuth, getTeachers)
teacherRouter.get('/:id', getTeacher)
teacherRouter.post(
   '/',
   isAuth,
   isAdmin,
   body('name').notEmpty().withMessage('Judul diperlukan!'),
   body('gender').notEmpty().withMessage('Jenis Kelamin diperlukan!'),
   body('email').notEmpty().withMessage('Body diperlukan!'),
   body('email').isEmail().withMessage('Email tidak valid!'),
   body('email').custom((value) => {
      return Teachers.findOne({ email: value }).then((user) => {
         if (user) return Promise.reject('E-mail telah digunakan')
      })
   }),
   createTeacher
)
teacherRouter.put('/:id', isAuth, isAdmin, updateTeacher)
teacherRouter.delete('/:id', isAuth, isAdmin, deleteTeacher)

export default teacherRouter
