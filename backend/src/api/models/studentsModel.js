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
      gender: {
         type: String,
         enum: ['L', 'P'],
      },
      photo: {
         type: String,
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
      year_of_entry: {
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
