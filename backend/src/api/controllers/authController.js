import {
   studentsDummy,
   adminsDummy,
   teachersDummy,
} from '../..//Dummies/dummies.js'
import Students from '../models/studentsModel.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../helpers/jwt.js'
import { validationResult } from 'express-validator'
import e from 'express'
import Teachers from '../models/teachersModel.js'
import Admins from '../models/adminsModel.js'

export const seed = async (req, res) => {
   await Students.deleteMany({})
   await Teachers.deleteMany({})
   await Admins.deleteMany({})

   const createdStudents = await Students.insertMany(studentsDummy)
   const createdAdmins = await Admins.insertMany(adminsDummy)
   const createdTeachers = await Teachers.insertMany(teachersDummy)

   res.send({
      students: createdStudents,
      teachers: createdTeachers,
      admins: createdAdmins,
   })
}

export const login = async (req, res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }
   console.log('req.body', req.body)
   const { username, password } = req.body
   // Cek role

   let user

   if (req.body.role === 'student') {
      user = await Students.findOne({ nis: username })
   } else if (req.body.role === 'teacher') {
      user = await Teachers.findOne({ email: username })
   } else if (req.body.role === 'admin') {
      user = await Admins.findOne({ email: username })
   } else {
      res.status(404).json({ status: 'error', message: 'User not found' })
   }

   if (user) {
      const token = generateToken(user)

      if (bcrypt.compareSync(password, user.password)) {
         delete user.password

         return res
            .status(200)
            .cookie('token', token, { httpOnly: true })
            .json({
               _id: user._id,
               nis: user.nis || null,
               name: user.name,
               email: user.email,
               photo: user.photo,
               role: user.role,
            })
      }
   }

   res.status(401).json({ message: 'Invalid email or password!' })
}

export const register = async (req, res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   const { name, email, password, photo } = req.body

   const student = new Students({
      name,
      email,
      password: bcrypt.hashSync(password, 8),
      photo,
   })

   const createdStudent = await student.save()
   res.status(200).json({
      _id: createdStudent._id,
      name: createdStudent.name,
      email: createdStudent.email,
      photo: createdStudent.photo,
      token: generateToken(createdStudent),
   })
}

export const logout = async (req, res) => {
   res.clearCookie('token')
   res.send({ success: true })
}

export const studentDetail = async (req, res) => {
   const studentId = req.params.id
   try {
      const student = await Students.findById(studentId).select('-password')
      if (studentId === req.student._id) {
         return res.status(200).json(student)
      } else {
         throw e
      }
   } catch (error) {
      return res.status(404).json({ message: 'Student not found!' })
   }
}

/**
 * Upload image from client to cloudinary
 * 
 * import cloudinary from '../helpers/cloudinary.js'
   import streamifier from 'streamifier'
   
 *   if (req.file) {
         streamifier.createReadStream(req.file.buffer).pipe(
            cloudinary.uploader.upload_stream(
               {
                  folder: 'Hilman App',
               },
               async function (error, result) {
                  if (error)
                     return res
                        .status(404)
                        .json({ message: 'error upload photo' })
                  student.photo = result.url

                  const updatedStudent = await student.save()
                  res.status(200).json({
                     message: 'Student updated successfully!',
                     data: { student: updatedStudent },
                  })
               }
            )
         )
      } 
 */
