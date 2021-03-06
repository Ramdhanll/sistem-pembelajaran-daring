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
import nodemailer from 'nodemailer'
import crypto from 'crypto'

const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: 'aldialfiansyah350@gmail.com',
      pass: '15051999=',
   },
})

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
               status: 'success',
               user: {
                  _id: user._id,
                  nis: user.nis || null,
                  name: user.name,
                  email: user.email,
                  photo: user.photo,
                  role: user.role,
                  gender: user.gender,
                  year_of_entry: user.year_of_entry || null,
               },
               message: 'Login successfully',
            })
      }
   }

   res.status(401).json({ message: 'Invalid email or password!' })
}

export const logout = async (req, res) => {
   res.clearCookie('token')
   res.send({ success: true })
}

export const status = async (req, res) => {
   res.status(200).json({
      status: 'success',
      user: {
         _id: req.user._id,
         nis: req.user.nis || null,
         name: req.user.name,
         email: req.user.email,
         photo: req.user.photo,
         role: req.user.role,
         gender: req.user.gender,
         year_of_entry: req.user.year_of_entry || null,
      },
      message: 'status login',
   })
}

export const resetPassword = async (req, res) => {
   console.log(req.body)
   try {
      crypto.randomBytes(32, async (err, buffer) => {
         if (err) throw 'Failed to reset password'
         const token = buffer.toString('hex')

         // admin
         const admin = await Admins.findOne({ email: req.body.email })
         if (admin) {
            admin.resetToken = token
            admin.expireToken = Date.now() + 3600000 // waktu sekarang ditambah 3600000 ms = 1 jam
            await admin.save()

            transporter
               .sendMail({
                  from: 'aldialfiansyah350@gmail.com',
                  to: admin.email,
                  subject: 'Reset Password',
                  html: `
                  <h3>Request untuk reset password</h3>
                  <h4>tekan <a href="http://localhost:3000/reset-password/${token}">link</a> ini untuk reset password</h4>
               `,
               })
               .then((e) => {
                  return res
                     .status(200)
                     .json({ status: 'success', message: 'Cek email anda!' })
               })
               .catch((e) => {
                  return res.status(500).json({
                     status: 'failed',
                     data: e,
                     message: 'Pesan gagal dikirim',
                  })
               })
         }

         // teacher
         const teacher = await Teachers.findOne({ email: req.body.email })
         if (teacher) {
            teacher.resetToken = token
            teacher.expireToken = Date.now() + 3600000 // waktu sekarang ditambah 3600000 ms = 1 jam
            await teacher.save()

            transporter
               .sendMail({
                  from: 'aldialfiansyah350@gmail.com',
                  to: teacher.email,
                  subject: 'Reset Password',
                  html: `
               <h3>Request untuk reset password</h3>
               <h4>tekan <a href="http://localhost:3000/reset-password/${token}">link</a> ini untuk reset password</h4>
               `,
               })
               .then((e) => {
                  return res
                     .status(200)
                     .json({ status: 'success', message: 'Cek email anda!' })
               })
               .catch((e) => {
                  return res.status(500).json({
                     status: 'failed',
                     data: e,
                     message: 'Pesan gagal dikirim',
                  })
               })
         }

         // student
         const student = await Students.findOne({ email: req.body.email })
         if (student) {
            student.resetToken = token
            student.expireToken = Date.now() + 3600000 // waktu sekarang ditambah 3600000 ms = 1 jam
            await student.save()

            transporter
               .sendMail({
                  from: 'aldialfiansyah350@gmail.com',
                  to: student.email,
                  subject: 'Reset Password',
                  html: `
               <h3>Request untuk reset password</h3>
               <h4>tekan <a href="http://localhost:3000/reset-password/${token}">link</a> ini untuk reset password</h4>
               `,
               })
               .then((e) => {
                  return res
                     .status(200)
                     .json({ status: 'success', message: 'Cek email anda!' })
               })
               .catch((e) => {
                  return res.status(500).json({
                     status: 'failed',
                     data: e,
                     message: 'Pesan gagal dikirim',
                  })
               })
         }

         if (!admin && !teacher && !student) {
            return res.status(404).json({
               status: 'error',
               message: 'User tidak ditemukan!',
            })
         }
      })
   } catch (error) {
      return res.status(500).json({
         status: 'error',
         errors: [{ msg: error?.name === 'CastError' ? error.message : error }],
         message: error,
      })
   }
}

export const newPassword = async (req, res) => {
   const { token, password } = req.body
   try {
      // admin
      const admin = await Admins.findOne({ resetToken: token })
      if (admin) {
         admin.password = bcrypt.hashSync(password, 8)
         admin.resetToken = undefined
         admin.expireToken = undefined
         admin.save()
      }

      // teacher
      const teacher = await Teachers.findOne({ resetToken: token })
      if (teacher) {
         teacher.password = bcrypt.hashSync(password, 8)
         teacher.resetToken = undefined
         teacher.expireToken = undefined
         teacher.save()
      }

      // student
      const student = await Students.findOne({ resetToken: token })
      if (student) {
         student.password = bcrypt.hashSync(password, 8)
         student.resetToken = undefined
         student.expireToken = undefined
         student.save()
      }

      if (!admin && !teacher && !student) {
         return res.status(404).json({
            status: 'error',
            message: 'Invalid token!, silahkan kirim link verifikasi lagi',
         })
      }

      return res
         .status(200)
         .json({ status: 'success', message: 'Password berhasil diubah!' })
   } catch (error) {
      res.status(500).json({
         status: 'error',
         errors: [{ msg: error?.name === 'CastError' ? error.message : error }],
         message: error,
      })
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
