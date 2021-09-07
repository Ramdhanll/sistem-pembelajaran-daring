import { validationResult } from 'express-validator'
import Classrooms from '../models/classroomsModel.js'
import Attedances from '../models/attedanceModel.js'
import Tasks from '../models/taskModel.js'
import Exams from '../models/examModel.js'

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
      const exist = await Classrooms.find({ code: req.body.code })
      if (exist.length) throw 'Kode sudah dimiliki'

      const classroom = new Classrooms({ ...req.body, teacher: req.user._id })

      const createdClassroom = await classroom.save()
      res.status(201).json({
         status: 'success',
         classroom: createdClassroom,
         message: 'Classroom created successfully',
      })
   } catch (error) {
      let errMsg
      typeof error !== 'object'
         ? (errMsg = error)
         : (errMsg = 'Gagal buat kelas')
      res.status(500).json({ message: errMsg })
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
      const exist = await Classrooms.find({ code: req.body.code })
      if (!exist.length) throw 'Kelas tidak ditemukan'

      if (exist[0].members.includes(JSON.parse(req.body.id))) {
         throw 'Siswa sudah bergabung'
      }

      console.log(exist)
      const classroom = await Classrooms.updateOne(
         { code: req.body.code },
         {
            $push: {
               members: JSON.parse(req.body.id),
            },
         }
      ).then((result) => console.log('r', result))

      res.status(200).json({
         status: 'success',
         classroom,
         message: 'Classroom has been updated',
      })
   } catch (error) {
      console.log(error)
      let errMsg
      typeof error !== 'object'
         ? (errMsg = error)
         : (errMsg = 'Gabung kelas tidak berhasil')

      res.status(400).json({
         status: 'error',
         errors: error,
         message: errMsg,
      })
   }
}

export const getRapor = async (req, res) => {
   // validation if studentId === undefined
   if (req.params.studentId === 'undefined') {
      return res
         .status(200)
         .json({ status: 'success', message: 'student id kosong' })
   }

   try {
      // GET ATTEDANCES
      const studentAttedances = {
         present: 0,
         sick: 0,
         permit: 0,
         missing: 0,
      }

      const attedance = await Attedances.find({
         classroom: req.params.classroomId,
      })

      attedance.map((item) => {
         const exist = item.attedances.find(
            (item) => item.student.toString() === req.params.studentId
         )

         if (exist) {
            if (exist.attedance === 'present') {
               studentAttedances.present = studentAttedances.present + 1
            } else if (exist.attedance === 'sick') {
               studentAttedances.sick = studentAttedances.sick + 1
            } else if (exist.attedance === 'permit') {
               studentAttedances.permit = studentAttedances.permit + 1
            } else if (exist.attedance === 'missing') {
               studentAttedances.missing = studentAttedances.missing + 1
            }
         }
      })

      // GET TASKS
      const task = await Tasks.find({
         classroom: req.params.classroomId,
      })

      const studentTasks = task.map((item) => {
         const exist = item.tasks.find(
            (item) => item.student.toString() === req.params.studentId
         )
         return { _id: item._id, title: item.title, tasks: exist }
      })

      // GET EXAM
      const exam = await Exams.find({
         classroom: req.params.classroomId,
      })

      const studentExams = exam.map((item) => {
         const exist = item.exams.find(
            (item) => item.student.toString() === req.params.studentId
         )
         return { _id: item._id, title: item.title, exams: exist }
      })

      console.log(studentExams)

      res.status(200).json({
         status: 'success',
         attedances: studentAttedances,
         tasks: studentTasks,
         exams: studentExams,
         message: 'ok',
      })
   } catch (error) {
      let errMsg
      typeof error !== 'object'
         ? (errMsg = error)
         : (errMsg = 'something wrong')

      res.status(500).json({ status: 'error', errors: error, message: errMsg })
   }
}
