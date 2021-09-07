import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types

const reportSchema = mongoose.Schema(
   {
      classroom: {
         type: ObjectId,
         ref: 'Classrooms',
         unique: true,
      },
      rh: [
         {
            type: ObjectId,
            ref: 'Tasks',
         },
      ],
      pts: {
         type: ObjectId,
         ref: 'Exams',
      },
      pas: {
         type: ObjectId,
         ref: 'Exams',
      },
      members: [
         {
            student: {
               type: ObjectId,
               ref: 'Students',
            },
            attedances: {
               present: {
                  type: Number,
               },
               sick: {
                  type: Number,
               },
               permit: {
                  type: Number,
               },
               missing: {
                  type: Number,
               },
            },
            rhScore: {
               type: Number,
            },
            ptsScore: {
               type: Number,
            },
            pasScore: {
               type: Number,
            },
            finalScore: {
               type: Number,
            },
         },
      ],
   },
   {
      timestamps: true,
   }
)

const Report = mongoose.model('Reports', reportSchema)

export default Report
