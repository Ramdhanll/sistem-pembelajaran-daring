import { validationResult } from 'express-validator'
import { informationsDummy } from '../../Dummies/dummies.js'
import Informations from '../models/informationModel.js'

const pageSize = 10

export const seed = async (req, res) => {
   Informations.deleteMany({})

   try {
      const createdInformations = await Informations.insertMany(
         informationsDummy
      )
      res.status(200).json({
         status: 'success',
         data: createdInformations,
         message: 'Success insert informations',
      })
   } catch (error) {
      res.status(500).json(error)
   }
}

export const getInformations = async (req, res) => {
   const page = Number(req.query.page) || 1
   const title = req.query.title || ''
   const _id = req.query.id || ''

   const titleFilter = title ? { title: { $regex: title, $options: 'i' } } : {}
   const _idFilter = _id ? { _id } : {}

   try {
      const count = await Informations.countDocuments({
         ..._idFilter,
         ...titleFilter,
      })

      const informations = await Informations.find({
         ..._idFilter,
         ...titleFilter,
      })
         .skip(pageSize * (page - 1))
         .limit(pageSize)
         .sort('-createdAt')

      res.status(200).json({
         status: 'success',
         // data: { informations, page, pages: Math.ceil(count / pageSize) },
         informations,
         page,
         pages: Math.ceil(count / pageSize),
         message: 'Success get informations',
      })
   } catch (error) {
      res.status(404).json({
         status: 'error',
         errors: error,
         message: 'Failed get informations',
      })
   }
}

export const getInformation = async (req, res) => {
   try {
      const information = await Informations.findById(req.params.id)

      res.status(200).json({
         status: 'success',
         information,
         message: 'Success get information',
      })
   } catch (error) {
      res.status(404).json({
         status: 'error',
         message: 'Information not found',
      })
   }
}

export const createInformation = async (req, res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   try {
      const information = new Informations(req.body)
      const createdInformation = await information.save()

      res.status(201).json({
         status: 'success',
         information: createdInformation,
         message: 'Success created information',
      })
   } catch (error) {
      res.status(500).json({ message: 'Failed create information' })
   }
}

export const updateInformation = async (req, res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   try {
      const information = await Informations.findById(req.params.id)

      information.title = req.body.title
      information.body = req.body.title

      const updatedInformation = await information.save()

      res.status(201).json({
         status: 'success',
         information: updatedInformation,
         message: 'Success updated information',
      })
   } catch (error) {
      res.status(500).json({ message: 'Failed create information' })
   }
}

export const deleteInformation = async (req, res) => {
   try {
      await Informations.deleteOne({ _id: req.params.id })

      res.status(200).json({
         status: 'success',
         message: 'Success deleted information',
      })
   } catch (error) {
      res.status(500).json({ message: 'Failed delete information' })
   }
}
