import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types

const modulesSchema = mongoose.Schema(
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
      video: {
         type: String,
      },
   },
   {
      timestamps: true,
   }
)

const Modules = mongoose.model('Modules', modulesSchema)

export default Modules
