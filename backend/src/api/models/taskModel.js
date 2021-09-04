import mongoose from 'mongoose'

const { ObjectId } = mongoose.Types

const attendancesSchema = mongoose.Schema(
   {
      classroom: {
         type: ObjectId,
         ref: 'Classrooms',
      },
      title: {
         type: String,
         required: true,
      },
      body: {
         type: String,
      },
      document: {
         type: String,
      },
      tasks: [
         {
            student: {
               type: ObjectId,
               ref: 'Students',
            },
            body: {
               type: String,
            },
            document: {
               type: String,
            },
            score: {
               type: Number,
            },
            submitted: {
               type: Boolean,
               default: false,
            },
         },
      ],
      due: {
         type: Date,
         required: true,
      },
   },
   {
      timestamps: true,
   }
)

const Tasks = mongoose.model('Tasks', attendancesSchema)

export default Tasks
