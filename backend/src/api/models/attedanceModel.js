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
      // presents: [
      //    {
      //       type: ObjectId,
      //       ref: 'Students',
      //    },
      // ],
      // missings: [
      //    {
      //       type: ObjectId,
      //       ref: 'Students',
      //    },
      // ],
      // permits: [
      //    {
      //       type: ObjectId,
      //       ref: 'Students',
      //    },
      // ],
      // sicks: [
      //    {
      //       type: ObjectId,
      //       ref: 'Students',
      //    },
      // ],
   },
   {
      timestamps: true,
   }
)

const Attedances = mongoose.model('Attedances', attendancesSchema)

export default Attedances
