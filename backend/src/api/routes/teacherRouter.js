import express from 'express'
import {
   createTeacher,
   deleteTeacher,
   getTeacher,
   getTeachers,
   seed,
   updateTeacher,
   updatePhoto,
} from '../controllers/teacherController.js'
import { isAdmin, isAuth, isTeacher } from '../middleware/jwt.js'
import { body } from 'express-validator'
import Teachers from '../models/teachersModel.js'
import multer from 'multer'

const teacherRouter = express.Router()

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

teacherRouter.put(
   '/:id/photo',
   isAuth,
   isTeacher,
   uploadMulter.single('photo'),
   updatePhoto
)

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
