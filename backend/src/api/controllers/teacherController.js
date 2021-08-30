import { validationResult } from 'express-validator'
import { teachersDummy } from '../../Dummies/dummies.js'
import Teachers from '../models/teachersModel.js'
import bcrypt from 'bcrypt'

const pageSize = 10

export const seed = async (req, res) => {
   await Teachers.deleteMany({})

   try {
      const createdTeachers = await Teachers.insertMany(teachersDummy)
      res.status(200).json({
         status: 'success',
         data: createdTeachers,
         message: 'Success insert teachers',
      })
   } catch (error) {
      res.status(500).json(error)
   }
}

export const getTeachers = async (req, res) => {
   const page = Number(req.query.page) || 1
   const name = req.query.name || ''
   const nis = req.query.nis || ''

   const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {}

   try {
      const count = await Teachers.countDocuments({
         ...nameFilter,
      })

      const teachers = await Teachers.find({
         ...nameFilter,
      })
         .skip(pageSize * (page - 1))
         .limit(pageSize)
         .sort('name')

      res.status(200).json({
         status: 'success',
         // data: { teachers, page, pages: Math.ceil(count / pageSize) },
         teachers,
         page,
         pages: Math.ceil(count / pageSize),
         message: 'Success get teachers',
      })
   } catch (error) {
      res.status(404).json({
         status: 'error',
         errors: error,
         message: 'Failed get teachers',
      })
   }
}

export const getTeacher = async (req, res) => {
   try {
      const teacher = await Teachers.findById(req.params.id)

      res.status(200).json({
         status: 'success',
         teacher,
         message: 'Success get teacher',
      })
   } catch (error) {
      res.status(404).json({
         status: 'error',
         message: 'Teacher not found',
      })
   }
}

export const createTeacher = async (req, res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   try {
      const teacher = new Teachers({
         ...req.body,
         password: bcrypt.hashSync(req.body.email, 8),
      })

      const createdTeacher = await teacher.save()

      res.status(201).json({
         status: 'success',
         teacher: createdTeacher,
         message: 'Success created teacher',
      })
   } catch (error) {
      res.status(500).json({ message: 'Failed create teacher' })
   }
}

export const updateTeacher = async (req, res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   try {
      const teacher = await Teachers.findById(req.params.id)

      teacher.name = req.body.name ? req.body.name : teacher.name
      teacher.email = req.body.email ? req.body.email : teacher.email
      teacher.gender = req.body.gender ? req.body.gender : teacher.gender
      teacher.photo = req.body.photo ? req.body.photo : teacher.photo

      const updatedTeacher = await teacher.save()

      res.status(201).json({
         status: 'success',
         teacher: updatedTeacher,
         message: 'Success updated teacher',
      })
   } catch (error) {
      res.status(500).json({ message: 'Failed create teacher' })
   }
}

export const deleteTeacher = async (req, res) => {
   try {
      await Teachers.deleteOne({ _id: req.params.id })

      res.status(200).json({
         status: 'success',
         message: 'Success deleted teacher',
      })
   } catch (error) {
      res.status(500).json({ message: 'Failed delete teacher' })
   }
}
