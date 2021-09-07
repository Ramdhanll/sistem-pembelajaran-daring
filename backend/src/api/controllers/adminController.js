import { validationResult } from 'express-validator'
import { adminsDummy } from '../../Dummies/dummies.js'
import Admins from '../models/adminsModel.js'
import bcrypt from 'bcrypt'

const pageSize = 10

export const seed = async (req, res) => {
   Admins.deleteMany({})

   try {
      const createdAdmins = await Admins.insertMany(adminsDummy)
      res.status(200).json({
         status: 'success',
         data: createdAdmins,
         message: 'Success insert admins',
      })
   } catch (error) {
      res.status(500).json(error)
   }
}

export const getAdmins = async (req, res) => {
   const page = Number(req.query.page) || 1
   const name = req.query.name || ''
   const _id = req.query.id || ''

   const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {}

   const _idFilter = _id ? { _id } : {}

   try {
      const count = await Admins.countDocuments({
         ..._idFilter,
         ...nameFilter,
      })

      const admins = await Admins.find({
         ..._idFilter,
         ...nameFilter,
      })
         .skip(pageSize * (page - 1))
         .limit(pageSize)
         .sort('name')

      res.status(200).json({
         status: 'success',
         // data: { admins, page, pages: Math.ceil(count / pageSize) },
         admins,
         page,
         pages: Math.ceil(count / pageSize),
         message: 'Success get admins',
      })
   } catch (error) {
      res.status(404).json({
         status: 'error',
         errors: error,
         message: 'Failed get admins',
      })
   }
}

export const getAdmin = async (req, res) => {
   try {
      const admin = await Admins.findById(req.params.id)

      res.status(200).json({
         status: 'success',
         admin,
         message: 'Success get admin',
      })
   } catch (error) {
      res.status(404).json({
         status: 'error',
         message: 'Admin not found',
      })
   }
}

export const createAdmin = async (req, res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   try {
      const admin = new Admins({
         ...req.body,
         password: bcrypt.hashSync(req.body.email, 8),
      })
      console.log('admin', admin)

      const createdAdmin = await admin.save()
      console.log(createdAdmin)

      res.status(201).json({
         status: 'success',
         admin: createdAdmin,
         message: 'Success created admin',
      })
   } catch (error) {
      res.status(500).json({ message: 'Failed create admin' })
   }
}

export const updateAdmin = async (req, res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   try {
      const admin = await Admins.findById(req.params.id)

      admin.name = req.body.name ? req.body.name : admin.name
      admin.email = req.body.email ? req.body.email : admin.email
      admin.gender = req.body.gender ? req.body.gender : admin.gender

      const updatedAdmin = await admin.save()

      res.status(201).json({
         status: 'success',
         admin: updatedAdmin,
         message: 'Success updated admin',
      })
   } catch (error) {
      res.status(500).json({ message: 'Failed create admin' })
   }
}

export const deleteAdmin = async (req, res) => {
   try {
      await Admins.deleteOne({ _id: req.params.id })

      res.status(200).json({
         status: 'success',
         message: 'Success deleted admin',
      })
   } catch (error) {
      res.status(500).json({ message: 'Failed delete admin' })
   }
}

export const updatePhoto = async (req, res) => {
   try {
      const admins = await Admins.findById(req.params.id)

      if (req.file) {
         admins.photo = `http://localhost:5000/uploads/${req.file.filename}`
      }

      const updatedAdmin = await admins.save()
      res.status(200).json({
         status: 'success',
         user: {
            _id: updatedAdmin._id,
            name: updatedAdmin.name,
            email: updatedAdmin.email,
            photo: updatedAdmin.photo,
            role: updatedAdmin.role,
            gender: updatedAdmin.gender,
         },
         message: 'Admin has been updated',
      })
   } catch (error) {
      console.log(error)
      let errMsg
      typeof error !== 'object'
         ? (errMsg = error)
         : (errMsg = 'something wrong')

      res.status(500).json({ status: 'error', errors: error, message: errMsg })
   }
}
