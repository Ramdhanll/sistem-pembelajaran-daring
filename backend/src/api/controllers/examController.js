import Exams from '../models/examModel.js'
import Classrooms from '../models/classroomsModel.js'

import schedule, { scheduledJobs } from 'node-schedule'

export const getExams = async (req, res) => {
   try {
      const exams = await Exams.find({
         classroom: req.params.classroomId,
      })
         .populate('exams.student', '_id name photo')
         .sort('-createdAt')

      res.status(200).json({
         status: 'success',
         exams,
         message: 'Exams has been retrieved',
      })
   } catch (error) {
      res.status(404).json({ message: 'Exam not found', error })
   }
}

export const createExam = async (req, res) => {
   const { document, ...data } = req.body
   try {
      if (req.file)
         data.document = `http://localhost:5000/uploads/${req.file.filename}`

      const createExam = new Exams({
         ...data,
         classroom: JSON.parse(req.body.classroom),
      })
      const createdExam = await createExam.save()

      schedule.scheduleJob(
         JSON.stringify(createdExam._id),
         new Date(req.body.due),
         async () => {
            // query latest data exam
            const exam = await Exams.findById(createdExam._id)

            // query classroom
            const classroom = await Classrooms.findById(
               JSON.parse(req.body.classroom)
            )

            // filter student who have not submitted
            var result = classroom.members.filter(function (obj) {
               return exam.exams.map((item) => item.student).indexOf(obj) === -1
            })

            // filter return to update many
            const resultFilter = result.map((item) => {
               return { student: item, submitted: false, score: 0 }
            })

            // update many
            try {
               await Exams.updateOne(
                  { _id: createdExam._id },
                  {
                     $push: {
                        exams: resultFilter,
                     },
                  }
               )
               console.log('run from create')
            } catch (error) {
               console.log('e', error)
            }
         }
      )

      res.status(201).json({
         status: 'success',
         exam: createdExam,
         message: 'Exam has been created',
      })
   } catch (error) {
      res.status(500).json({ message: 'Exam failed to create', error })
   }
}

export const updateExam = async (req, res) => {
   const { title, due, body } = req.body
   try {
      const exam = await Exams.findById(req.params.id)
      exam.title = title ? title : exam.title
      exam.body = body ? body : exam.body
      exam.due = due ? due : exam.due

      if (req.file)
         exam.document = `http://localhost:5000/uploads/${req.file.filename}`

      const updatedExam = await exam.save()

      // reschedule due
      const jobPrev = schedule.scheduledJobs[JSON.stringify(exam._id)]

      if (jobPrev) {
         jobPrev.cancel()
      }

      schedule.scheduleJob(
         JSON.stringify(exam._id),
         new Date(due),
         async () => {
            // query classroom
            const classroom = await Classrooms.findById(exam.classroom)

            // filter student who have not submitted
            var result = classroom.members.filter(function (obj) {
               return exam.exams.map((item) => item.student).indexOf(obj) === -1
            })

            // filter return to update many
            const resultFilter = result.map((item) => {
               return { student: item, submitted: false, score: 0 }
            })

            // update many
            try {
               await Exams.updateOne(
                  { _id: exam._id },
                  {
                     $push: {
                        exams: resultFilter,
                     },
                  }
               )
               console.log('run from edit')
            } catch (error) {
               console.log('e', error)
            }
         }
      )

      res.status(200).json({
         status: 'success',
         exam: updatedExam,
         message: 'Exam has been updated',
      })
   } catch (error) {
      res.status(500).json({ message: 'Failed update exam', error })
   }
}

export const deleteExam = async (req, res) => {
   try {
      await Exams.deleteOne({ _id: req.params.id })
      res.status(200).json({
         status: 'success',
         message: 'Exam has been deleted',
      })
   } catch (error) {
      res.status(500).json({ message: 'Failed delete exam', error })
   }
}

export const submitExam = async (req, res) => {
   const { answer, ...data } = req.body

   try {
      if (req.file) {
         data.answer = `http://localhost:5000/uploads/${req.file.filename}`
      }

      const exam = await Exams.findById(req.params.id)

      // search if there student in the exams db
      if (
         exam.exams.some((item) => {
            return item.student.toString() === student
         })
      ) {
         exam.exams.map((item) => {
            if (JSON.stringify(item.student) === JSON.stringify(student)) {
               item.answer = req.body.exam
            }
         })
      } else {
         exam.exams.push({
            ...data,
            student: JSON.parse(data.student),
            submitted: true,
         })
      }

      const updatedexam = await exam.save()

      res.status(200).json({
         status: 'success',
         exam: updatedexam,
         message: 'Success submitted',
      })
   } catch (error) {
      let errMsg
      typeof error !== 'object'
         ? (errMsg = error)
         : (errMsg = 'Something wrong')

      res.status(500).json({ status: 'error', errors: error, message: errMsg })
   }
}

export const givingGrades = async (req, res) => {
   try {
      const updatedScore = await Exams.findByIdAndUpdate(
         JSON.parse(req.params.id),
         {
            ...req.body,
         }
      )

      res.status(200).json({ status: 'success', message: 'ok' })
   } catch (error) {
      let errMsg
      typeof error !== 'object'
         ? (errMsg = error)
         : (errMsg = 'something wrong')

      res.status(500).json({ status: 'error', errors: error, message: errMsg })
   }
}

export const endExam = async (req, res) => {
   try {
      const exam = await Exams.findById(req.params.id)

      // delete schedule due
      const jobPrev = schedule.scheduledJobs[JSON.stringify(exam._id)]

      if (jobPrev) {
         jobPrev.cancel()
      }

      // query classroom
      const classroom = await Classrooms.findById(exam.classroom)

      // filter student who have not submitted
      var result = classroom.members.filter(function (obj) {
         return exam.exams.map((item) => item.student).indexOf(obj) === -1
      })

      // filter return to update many
      const resultFilter = result.map((item) => {
         return { student: item, submitted: false, score: 0 }
      })

      // update many
      await Exams.updateOne(
         { _id: exam._id },
         {
            due: new Date(),
            $push: {
               exams: resultFilter,
            },
         }
      )

      res.status(200).json({
         status: 'success',
         message: 'Exam has been end',
      })
   } catch (error) {
      let errMsg
      typeof error !== 'object'
         ? (errMsg = error)
         : (errMsg = 'something wrong')

      res.status(500).json({ status: 'error', errors: error, message: errMsg })
   }
}
