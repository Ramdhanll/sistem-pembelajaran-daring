import express from 'express'
import { body } from 'express-validator'
import { isAuth, isStudent } from '../middleware/jwt.js'
import Users from '../models/studentsModel.js'
import { login, logout, seed, status } from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.get('/seed', seed)

authRouter.post(
   '/login',
   body('username').notEmpty().withMessage('the username field is required!'),
   body('password').notEmpty().withMessage('the password field is required!'),
   login
)

authRouter.get('/status', isAuth, status)
authRouter.post('/logout', isAuth, logout)

export default authRouter
