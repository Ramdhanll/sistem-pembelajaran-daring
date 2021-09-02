import { validationResult } from 'express-validator'
import Classrooms from '../models/classroomsModel.js'

export const getClassrooms = async (req, res) => {
   const teacher = req.query.teacher
   const members = req.query.members

   const teacherFilter = teacher ? { teacher: teacher } : {}
   const membersFilter = members ? { members: { $in: [members] } } : {}

   try {
      const classrooms = await Classrooms.find({
         ...teacherFilter,
         ...membersFilter,
      }).populate('teacher', 'name photo')

      res.status(200).json({
         status: 'success',
         classrooms,
         message: 'Classroom has been retrieved',
      })
   } catch (error) {
      res.status(500).json({ message: 'Classroom failed retrieved' })
   }
}

export const getClassroom = async (req, res) => {
   try {
      const classroom = await Classrooms.findById(req.params.id)
         .populate('teacher', 'name photo')
         .populate('members', 'name photo')
      res.status(200).json({
         status: 'success',
         classroom,
         message: 'Classroom has been retrieved',
      })
   } catch (error) {
      res.status(500).json({ message: 'Classroom failed to retrieved' })
   }
}

export const create = async (req, res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   try {
      const classroom = new Classrooms({ ...req.body, teacher: req.user._id })

      const createdClassroom = await classroom.save()
      res.status(201).json({
         status: 'success',
         classroom: createdClassroom,
         message: 'Classroom created successfully',
      })
   } catch (error) {
      res.status(500).json({ message: 'Failed create classroom' })
   }
}

export const updateClassroom = async (req, res) => {
   const {
      subject,
      description,
      classroom,
      school_year,
      day_schedule,
      from,
      to,
      code,
      syllabus,
   } = req.body
   try {
      const classroomDB = await Classrooms.findById(req.params.id)

      classroomDB.subject = subject ? subject : classroomDB.subject
      classroomDB.description = description
         ? description
         : classroomDB.description
      classroomDB.classroom = classroom ? classroom : classroomDB.classroom
      classroomDB.school_year = school_year
         ? school_year
         : classroomDB.school_year
      classroomDB.day_schedule = day_schedule
         ? day_schedule
         : classroomDB.day_schedule
      classroomDB.from = from ? from : classroomDB.from
      classroomDB.to = to ? to : classroomDB.to
      classroomDB.code = code ? code : classroomDB.code
      classroomDB.syllabus = syllabus ? syllabus : classroomDB.syllabus

      const updatedClassroom = await classroomDB.save()

      res.status(200).json({
         status: 'success',
         classroom: updatedClassroom,
         message: 'Classroom has been updated',
      })
   } catch (error) {
      res.status(500).json({ message: 'Failed updated classroom' })
   }
}

export const deleteClassroom = async (req, res) => {
   try {
      await Classrooms.deleteOne({ _id: req.params.id })
      res.status(200).json({
         status: 'success',
         message: 'Classroom has been deleted',
      })
   } catch (error) {
      res.status(500).json({ message: 'Failed delete classroom' })
   }
}

export const join = async (req, res) => {
   try {
      const exist = await Classrooms.find({
         code: req.body.code,
         members: { $in: JSON.parse(req.body.id) },
      })
      console.log(exist)
      if (exist.length) {
         throw 'Siswa sudah bergabung'
      }

      const classroom = await Classrooms.updateOne(
         { code: req.body.code },
         {
            $push: {
               members: JSON.parse(req.body.id),
            },
         }
      )

      res.status(200).json({
         status: 'success',
         classroom,
         message: 'Classroom has been updated',
      })
   } catch (error) {
      res.status(400).json({
         status: 'error',
         errors: 'Kelas tidak ditemukan',
         message: 'Classroom not found',
      })
   }
}
