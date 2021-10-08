import mongoose from 'mongoose'

const { ObjectId } = mongoose.Types

const examsSchema = mongoose.Schema(
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
      exams: [
         {
            student: {
               type: ObjectId,
               ref: 'Students',
            },
            answer: {
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

const Exams = mongoose.model('Exams', examsSchema)

export default Exams
