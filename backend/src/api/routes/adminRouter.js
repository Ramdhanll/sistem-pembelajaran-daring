import express from 'express'
import {
   createAdmin,
   deleteAdmin,
   getAdmin,
   getAdmins,
   seed,
   updateAdmin,
} from '../controllers/adminController.js'
import { isAdmin, isAuth } from '../middleware/jwt.js'
import { body } from 'express-validator'
import Admins from '../models/adminsModel.js'

const adminRouter = express.Router()

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
