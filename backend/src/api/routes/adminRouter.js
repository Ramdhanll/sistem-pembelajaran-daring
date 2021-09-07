import express from 'express'
import {
   createAdmin,
   deleteAdmin,
   getAdmin,
   getAdmins,
   seed,
   updateAdmin,
   updatePhoto,
} from '../controllers/adminController.js'
import { isAdmin, isAuth } from '../middleware/jwt.js'
import { body } from 'express-validator'
import Admins from '../models/adminsModel.js'

import multer from 'multer'

const adminRouter = express.Router()

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

adminRouter.put(
   '/:id/photo',
   isAuth,
   isAdmin,
   uploadMulter.single('photo'),
   updatePhoto
)

adminRouter.get('/seed', seed)
adminRouter.get('/', isAuth, getAdmins)
adminRouter.get('/:id', getAdmin)
adminRouter.post(
   '/',
   isAuth,
   isAdmin,
   body('name').notEmpty().withMessage('Judul diperlukan!'),
   body('email').notEmpty().withMessage('Body diperlukan!'),
   body('email').isEmail().withMessage('Email tidak valid!'),
   body('email').custom((value) => {
      return Admins.findOne({ email: value }).then((user) => {
         if (user) return Promise.reject('E-mail telah digunakan')
      })
   }),
   createAdmin
)
adminRouter.put('/:id', isAuth, isAdmin, updateAdmin)
adminRouter.delete('/:id', isAuth, isAdmin, deleteAdmin)

export default adminRouter
