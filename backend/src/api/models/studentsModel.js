import mongoose from 'mongoose'

const studentsSchema = new mongoose.Schema(
   {
      nis: {
         type: String,
         required: true,
         unique: true,
      },
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
         default: 'student',
      },
   },
   {
      timestamps: true,
   }
)

const Students = mongoose.model('Students', studentsSchema)

export default Students
