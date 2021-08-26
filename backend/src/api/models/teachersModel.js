import mongoose from 'mongoose'

const teachersSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      photo: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      role: {
         type: String,
         default: 'teacher',
      },
   },
   {
      timestamps: true,
   }
)

const Teachers = mongoose.model('Teachers', teachersSchema)

export default Teachers
