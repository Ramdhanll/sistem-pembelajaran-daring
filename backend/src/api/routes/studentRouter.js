import express from 'express'
import {
   createStudent,
   deleteStudent,
   getStudent,
   getStudents,
   seed,
   updateStudent,
   updatePhoto,
} from '../controllers/studentController.js'
import { isAdmin, isAuth, isStudent } from '../middleware/jwt.js'
import { body } from 'express-validator'
import Students from '../models/studentsModel.js'
import multer from 'multer'

const studentRouter = express.Router()

const storage = multer.diskStorage({
   destination(req, file, cb) {
      cb(null, 'src/photos')
   },
   filename(req, file, cb) {
      const { originalname } = file
      const format = originalname.slice(originalname.indexOf('.'))
      cb(null, `${Date.now()}${format}`)
   },
})

const uploadMulter = multer({ storage })

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
studentRouter.put(
   '/:id/photo',
   isAuth,
   isStudent,
   uploadMulter.single('photo'),
   updatePhoto
)

studentRouter.delete('/:id', isAuth, isAdmin, deleteStudent)

export default studentRouter
