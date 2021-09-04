import Attedances from '../models/attedanceModel.js'
import Classrooms from '../models/classroomsModel.js'

import schedule, { scheduledJobs } from 'node-schedule'

export const getAttedances = async (req, res) => {
   try {
      const attedances = await Attedances.find({
         classroom: req.params.classroomId,
      })
         .populate('attedances.student', '_id name photo')
         .sort('-createdAt')

      res.status(200).json({
         status: 'success',
         attedances,
         message: 'Attedances has been retrieved',
      })
   } catch (error) {
      res.status(404).json({ message: 'Attedance not found', error })
   }
}

export const createAttedance = async (req, res) => {
   try {
      const createAttedance = new Attedances({
         ...req.body,
         classroom: JSON.parse(req.body.classroom),
      })
      const createdAttedance = await createAttedance.save()

      schedule.scheduleJob(
         JSON.stringify(createdAttedance._id),
         new Date(req.body.due),
         async () => {
            // query latest data atedance
            const attedance = await Attedances.findById(createdAttedance._id)

            const classroom = await Classrooms.findById(
               JSON.parse(req.body.classroom)
            )

            // filter student who have not submitted
            var result = classroom.members.filter(function (obj) {
               return (
                  attedance.attedances
                     .map((item) => item.student)
                     .indexOf(obj) === -1
               )
            })

            // filter return to update many
            const resultFilter = result.map((item) => {
               return { student: item, attedance: 'missing' }
            })

            // update many
            try {
               await Attedances.updateOne(
                  { _id: createdAttedance._id },
                  {
                     $push: {
                        attedances: resultFilter,
                     },
                  }
               )
            } catch (error) {
               console.log('e', error)
            }
         }
      )

      res.status(201).json({
         status: 'success',
         attedance: createdAttedance,
         message: 'Attedance has been created',
      })
   } catch (error) {
      res.status(500).json({ message: 'Attedance failed to create', error })
   }
}

export const updateAttedance = async (req, res) => {
   const { title, due, student } = req.body
   try {
      const attedance = await Attedances.findById(req.params.id)
      attedance.title = title ? title : attedance.title
      attedance.due = due ? due : attedance.due

      if (student) {
         if (
            attedance.attedances.some((item) => {
               return item.student.toString() === student
            })
         ) {
            throw 'Anda sudah melakukan absensi'
         } else {
            attedance.attedances.push({
               ...req.body,
               student: student,
            })
         }
      }

      const updatedAttedance = await attedance.save()

      res.status(200).json({
         status: 'success',
         attedance: updatedAttedance,
         message: 'Attedance has been updated',
      })
   } catch (error) {
      res.status(500).json({ message: 'Failed update attedance', error })
   }
}

export const deleteAttedance = async (req, res) => {
   try {
      await Attedances.deleteOne({ _id: req.params.id })
      res.status(200).json({
         status: 'success',
         message: 'Attedance has been deleted',
      })
   } catch (error) {
      res.status(500).json({ message: 'Failed delete attedance', error })
   }
}
