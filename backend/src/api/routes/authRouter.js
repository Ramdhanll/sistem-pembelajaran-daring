import express from 'express'
import { body } from 'express-validator'
import { isAuth } from '../middleware/jwt.js'
import Users from '../models/studentsModel.js'
import { login, logout, register, seed } from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.get('/seed', seed)

authRouter.post(
   '/login',
   body('username').notEmpty().withMessage('the username field is required!'),
   body('password').notEmpty().withMessage('the password field is required!'),
   login
)

authRouter.post(
   '/register',
   body('name').notEmpty().withMessage('the name field is required!'),
   body('email').notEmpty().withMessage('the email field is required!'),
   body('email').isEmail().withMessage('not an email!'),
   body('email').custom((value) => {
      return Users.findOne({ email: value }).then((user) => {
         if (user) return Promise.reject('E-mail already in use')
      })
   }),
   body('password').notEmpty().withMessage('the password field is required!'),
   body('photo').notEmpty().withMessage('the photo field is required!'),
   register
)

authRouter.post('/logout', isAuth, logout)

export default authRouter
