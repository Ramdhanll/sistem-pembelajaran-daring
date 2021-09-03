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
      attedances: [
         {
            student: {
               type: ObjectId,
               ref: 'Students',
            },
            attedance: {
               type: String,
               enum: ['present', 'sick', 'permit', 'missing'],
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

const Attedances = mongoose.model('Attedances', attendancesSchema)

export default Attedances
