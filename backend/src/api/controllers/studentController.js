import { validationResult } from 'express-validator'
import { studentsDummy } from '../../Dummies/dummies.js'
import Students from '../models/studentsModel.js'
import bcrypt from 'bcrypt'

const pageSize = 10

export const seed = async (req, res) => {
   await Students.deleteMany({})

   try {
      const createdStudents = await Students.insertMany(studentsDummy)
      res.status(200).json({
         status: 'success',
         data: createdStudents,
         message: 'Success insert students',
      })
   } catch (error) {
      res.status(500).json(error)
   }
}

export const getStudents = async (req, res) => {
   const page = Number(req.query.page) || 1
   const name = req.query.name || ''
   const nis = req.query.nis || ''

   const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {}
   const nisFilter = nis ? { nis: { $regex: nis, $options: 'i' } } : {}

   try {
      const count = await Students.countDocuments({
         $or: [nameFilter, nisFilter],
      })

      const students = await Students.find({
         $or: [nameFilter, nisFilter],
      })
         .skip(pageSize * (page - 1))
         .limit(pageSize)
         .sort('name')

      res.status(200).json({
         status: 'success',
         // data: { students, page, pages: Math.ceil(count / pageSize) },
         students,
         page,
         pages: Math.ceil(count / pageSize),
         message: 'Success get students',
      })
   } catch (error) {
      res.status(404).json({
         status: 'error',
         errors: error,
         message: 'Failed get students',
      })
   }
}

export const getStudent = async (req, res) => {
   try {
      const student = await Students.findById(req.params.id)

      res.status(200).json({
         status: 'success',
         student,
         message: 'Success get student',
      })
   } catch (error) {
      res.status(404).json({
         status: 'error',
         message: 'Student not found',
      })
   }
}

export const createStudent = async (req, res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   try {
      const student = new Students({
         ...req.body,
         password: bcrypt.hashSync(req.body.nis.toString(), 8),
      })

      const createdStudent = await student.save()

      res.status(201).json({
         status: 'success',
         student: createdStudent,
         message: 'Success created student',
      })
   } catch (error) {
      console.log(error)
      res.status(500).json({ error, message: 'Failed create student' })
   }
}

export const updateStudent = async (req, res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   try {
      const student = await Students.findById(req.params.id)

      student.name = req.body.name ? req.body.name : student.name
      student.nis = req.body.nis ? req.body.nis : student.nis
      student.email = req.body.email ? req.body.email : student.email
      student.gender = req.body.gender ? req.body.gender : student.gender
      student.year_of_entry = req.body.year_of_entry
         ? req.body.year_of_entry
         : student.year_of_entry
      student.password = req.body.password
         ? bcrypt.hashSync(req.body.password, 8)
         : student.password
      if (req.file) {
         student.photo = `http://localhost:5000/uploads/${req.file.filename}`
      }

      const updatedStudent = await student.save()

      res.status(201).json({
         status: 'success',
         user: {
            _id: updatedStudent._id,
            nis: updatedStudent.nis || null,
            name: updatedStudent.name,
            email: updatedStudent.email,
            photo: updatedStudent.photo,
            role: updatedStudent.role,
            gender: updatedStudent.gender,
            year_of_entry: updatedStudent.year_of_entry || null,
         },
         message: 'Success updated student',
      })
   } catch (error) {
      res.status(500).json({ message: 'Failed create student' })
   }
}

export const deleteStudent = async (req, res) => {
   try {
      await Students.deleteOne({ _id: req.params.id })

      res.status(200).json({
         status: 'success',
         message: 'Success deleted student',
      })
   } catch (error) {
      res.status(500).json({ message: 'Failed delete student' })
   }
}
