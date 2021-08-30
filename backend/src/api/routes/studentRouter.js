import express from 'express'
import {
   createStudent,
   deleteStudent,
   getStudent,
   getStudents,
   seed,
   updateStudent,
} from '../controllers/studentController.js'
import { isAdmin, isAuth } from '../middleware/jwt.js'
import { body } from 'express-validator'
import Students from '../models/studentsModel.js'

const studentRouter = express.Router()

studentRouter.get('/seed', seed)
studentRouter.get('/', isAuth, getStudents)
studentRouter.get('/:id', getStudent)
studentRouter.post(
   '/',
   isAuth,
   isAdmin,
   body('nis').notEmpty().withMessage('NIS diperlukan!'),
   body('name').notEmpty().withMessage('Judul diperlukan!'),
   body('gender').notEmpty().withMessage('Jenis Kelamin diperlukan!'),
   body('email').notEmpty().withMessage('Body diperlukan!'),
   body('email').isEmail().withMessage('Email tidak valid!'),
   body('email').custom((value) => {
      return Students.findOne({ email: value }).then((user) => {
         if (user) return Promise.reject('E-mail telah digunakan')
      })
   }),
   createStudent
)
studentRouter.put('/:id', isAuth, isAdmin, updateStudent)
studentRouter.delete('/:id', isAuth, isAdmin, deleteStudent)

export default studentRouter
