import mongoose from 'mongoose'

const AdminsSchema = new mongoose.Schema(
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
         default: 'admin',
      },
   },
   {
      timestamps: true,
   }
)

const Admins = mongoose.model('Admins', AdminsSchema)

export default Admins