import express from 'express'
import {
   createInformation,
   deleteInformation,
   getInformation,
   getInformations,
   seed,
   updateInformation,
} from '../controllers/informationController.js'
import { isAdmin, isAuth } from '../middleware/jwt.js'
import { body } from 'express-validator'

const informationRouter = express.Router()

informationRouter.get('/seed', seed)
informationRouter.get('/', isAuth, getInformations)
informationRouter.get('/:id', getInformation)
informationRouter.post(
   '/',
   isAuth,
   isAdmin,
   body('title').notEmpty().withMessage('Judul diperlukan!'),
   body('body').notEmpty().withMessage('Body diperlukan!'),
   createInformation
)
informationRouter.put('/:id', isAuth, isAdmin, updateInformation)
informationRouter.delete('/:id', isAuth, isAdmin, deleteInformation)

export default informationRouter
