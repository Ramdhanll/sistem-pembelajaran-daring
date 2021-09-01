import express from 'express'
import {
   createModule,
   deleteModule,
   getModules,
   updateModule,
} from '../controllers/moduleController.js'
import { isAuth, isTeacher } from '../middleware/jwt.js'
import multer from 'multer'

const moduleRouter = express.Router()

const storage = multer.diskStorage({
   destination(req, file, cb) {
      cb(null, 'src/modules')
   },
   filename(req, file, cb) {
      const { originalname } = file
      const format = originalname.slice(originalname.indexOf('.'))
      cb(null, `${Date.now()}${format}`)
   },
})

const uploadMulter = multer({ storage })

moduleRouter.get('/:classroomId', isAuth, getModules)
moduleRouter.put(
   '/:id',
   isAuth,
   isTeacher,
   uploadMulter.fields([{ name: 'document' }, { name: 'video' }]),
   updateModule
)

moduleRouter.post(
   '/',
   isAuth,
   isTeacher,
   // uploadMulter.single('document'),
   uploadMulter.fields([{ name: 'document' }, { name: 'video' }]),
   createModule
)

moduleRouter.delete('/:id', isAuth, isTeacher, deleteModule)
export default moduleRouter
