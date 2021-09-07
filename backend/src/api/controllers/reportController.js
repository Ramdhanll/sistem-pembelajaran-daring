import { validationResult } from 'express-validator'
import Reports from '../models/reportModel.js'
import Classrooms from '../models/classroomsModel.js'
import Attedances from '../models/attedanceModel.js'
import Tasks from '../models/taskModel.js'
import Exams from '../models/examModel.js'

export const createReport = async (req, res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   try {
      const cekReport = await Reports.find({
         classroom: JSON.parse(req.body.classroom),
      })

      if (cekReport.length) {
         throw 'Raport sudah dibuat'
      }

      const data = {
         ...req.body,
         classroom: JSON.parse(req.body.classroom),
         pts: req.body.pts,
         pas: req.body.pas,
         members: [],
      }

      // Get classroom, tasks, exams
      const classroom = await Classrooms.findById(
         JSON.parse(req.body.classroom)
      )

      const tasks = await Tasks.find({
         _id: req.body.rh,
      })

      const pts = await Exams.findById(req.body.pts)

      const pas = await Exams.findById(req.body.pas)

      const getDataMembers = classroom.members.map(async (member) => {
         // GET ATTEDANCES
         const studentAttedances = {
            present: 0,
            sick: 0,
            permit: 0,
            missing: 0,
         }

         const attedance = await Attedances.find({
            classroom: classroom._id,
         })

         attedance.map((item) => {
            const exist = item.attedances.find(
               (item) => item.student.toString() === member.toString()
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

         // GET RH Score
         const rhScore =
            tasks
               .map((item) => {
                  const exist = item.tasks.find(
                     (item) => item.student.toString() === member.toString()
                  )

                  if (exist) {
                     return exist.score
                  } else {
                     return 0
                  }
               })
               .reduce((acc, currentValue) => acc + currentValue) / 5

         // GET PTS SCORE
         const getPtsScore = pts.exams.find(
            (item) => item.student.toString() === member.toString()
         )

         // GET PAS SCORE
         const getPasScore = pas.exams.find(
            (item) => item.student.toString() === member.toString()
         )

         // RESULT
         const ptsScore = getPtsScore ? getPtsScore.score : 0
         const pasScore = getPasScore ? getPasScore.score : 0

         return {
            student: member,
            attedances: studentAttedances,
            rhScore: rhScore,
            ptsScore,
            pasScore,
            finalScore: rhScore * 0.5 + ptsScore * 0.25 + pasScore * 0.25,
         }
      })

      data.members.push(...(await Promise.all(getDataMembers)))

      const report = new Reports(data)

      const createdReport = await report.save()

      res.status(200).json({
         status: 'success',
         report: createdReport,
         message: 'Report has been created',
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

export const getReport = async (req, res) => {
   try {
      const report = await Reports.findOne({
         classroom: req.params.classroomId,
      }).populate('members.student', '_id nis name photo gender')

      res.status(200).json({
         status: 'success',
         report,
         message: 'Report has been retrieved',
      })
   } catch (error) {
      let errMsg
      typeof error !== 'object'
         ? (errMsg = error)
         : (errMsg = 'something error')

      res.status(500).json({ status: 'error', errors: error, message: errMsg })
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

export const updateReport = async (req, res) => {
   const { rh, pts, pas } = req.body
   const { classroomId } = req.params

   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   try {
      const report = await Reports.findOne({
         classroom: classroomId,
      })

      if (!report) {
         throw 'Rapor tidak ditemukan'
      }

      report.classroom = classroomId ? classroomId : report.classroom
      report.rh = rh.length ? rh : report.rh
      report.pts = req.body.pts ? req.body.pts : report.pts
      report.pas = req.body.pas ? req.body.pas : report.pas

      // Get classroom, tasks, exams
      const classroom = await Classrooms.findById(classroomId)

      const tasks = await Tasks.find({
         _id: rh,
      })

      const pts = await Exams.findById(req.body.pts)

      const pas = await Exams.findById(req.body.pas)

      const getDataMembers = classroom.members.map(async (member) => {
         // GET ATTEDANCES
         const studentAttedances = {
            present: 0,
            sick: 0,
            permit: 0,
            missing: 0,
         }

         const attedance = await Attedances.find({
            classroom: classroom._id,
         })

         attedance.map((item) => {
            const exist = item.attedances.find(
               (item) => item.student.toString() === member.toString()
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

         // GET RH Score
         const rhScore =
            tasks
               .map((item) => {
                  const exist = item.tasks.find(
                     (item) => item.student.toString() === member.toString()
                  )

                  if (exist) {
                     return exist.score
                  } else {
                     return 0
                  }
               })
               .reduce((acc, currentValue) => acc + currentValue) / 5

         // GET PTS SCORE
         const getPtsScore = pts.exams.find(
            (item) => item.student.toString() === member.toString()
         )

         // GET PAS SCORE
         const getPasScore = pas.exams.find(
            (item) => item.student.toString() === member.toString()
         )

         // RESULT
         const ptsScore = getPtsScore ? getPtsScore.score : 0
         const pasScore = getPasScore ? getPasScore.score : 0

         return {
            student: member,
            attedances: studentAttedances,
            rhScore: rhScore,
            ptsScore,
            pasScore,
            finalScore: rhScore * 0.5 + ptsScore * 0.25 + pasScore * 0.25,
         }
      })

      report.members = await Promise.all(getDataMembers)

      const updatedReport = await report.save()

      res.status(200).json({
         status: 'success',
         report: updatedReport,
         message: 'Report has been updated',
      })
   } catch (error) {
      console.log('error', error)
      let errMsg
      typeof error !== 'object'
         ? (errMsg = error)
         : (errMsg = 'something wrong')

      res.status(500).json({ status: 'error', errors: error, message: errMsg })
   }
}
