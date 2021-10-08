import mongoose from 'mongoose'

const teachersSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      photo: {
         type: String,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      gender: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
      role: {
         type: String,
         default: 'teacher',
      },
      resetToken: String,
      expireToken: Date,
   },
   {
      timestamps: true,
   }
)

const Teachers = mongoose.model('Teachers', teachersSchema)

export default Teachers
