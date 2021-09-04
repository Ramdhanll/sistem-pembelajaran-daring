import Tasks from '../models/taskModel.js'
import Classrooms from '../models/classroomsModel.js'

import schedule, { scheduledJobs } from 'node-schedule'

export const getTasks = async (req, res) => {
   try {
      const tasks = await Tasks.find({
         classroom: req.params.classroomId,
      })
         .populate('tasks.student', '_id name photo')
         .sort('-createdAt')

      res.status(200).json({
         status: 'success',
         tasks,
         message: 'Tasks has been retrieved',
      })
   } catch (error) {
      res.status(404).json({ message: 'Task not found', error })
   }
}

export const createTask = async (req, res) => {
   const { document, ...data } = req.body
   try {
      if (req.file)
         data.document = `http://localhost:5000/uploads/${req.file.filename}`

      const createTask = new Tasks({
         ...data,
         classroom: JSON.parse(req.body.classroom),
      })
      const createdTask = await createTask.save()

      schedule.scheduleJob(
         JSON.stringify(createdTask._id),
         new Date(req.body.due),
         async () => {
            // query latest data task
            const task = await Tasks.findById(createdTask._id)

            // query classroom
            const classroom = await Classrooms.findById(
               JSON.parse(req.body.classroom)
            )

            // filter student who have not submitted
            var result = classroom.members.filter(function (obj) {
               return task.tasks.map((item) => item.student).indexOf(obj) === -1
            })

            // filter return to update many
            const resultFilter = result.map((item) => {
               return { student: item, submitted: true, score: 0 }
            })

            // update many
            try {
               await Tasks.updateOne(
                  { _id: createdTask._id },
                  {
                     $push: {
                        tasks: resultFilter,
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
         task: createdTask,
         message: 'Task has been created',
      })
   } catch (error) {
      res.status(500).json({ message: 'Task failed to create', error })
   }
}

export const updateTask = async (req, res) => {
   const { title, due, body } = req.body
   try {
      const task = await Tasks.findById(req.params.id)
      task.title = title ? title : task.title
      task.body = body ? body : task.body
      task.due = due ? due : task.due

      if (req.file)
         task.document = `http://localhost:5000/uploads/${req.file.filename}`

      const updatedTask = await task.save()

      res.status(200).json({
         status: 'success',
         task: updatedTask,
         message: 'Task has been updated',
      })
   } catch (error) {
      res.status(500).json({ message: 'Failed update task', error })
   }
}

export const deleteTask = async (req, res) => {
   try {
      await Tasks.deleteOne({ _id: req.params.id })
      res.status(200).json({
         status: 'success',
         message: 'Task has been deleted',
      })
   } catch (error) {
      res.status(500).json({ message: 'Failed delete task', error })
   }
}