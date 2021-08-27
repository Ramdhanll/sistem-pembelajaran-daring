import mongoose from 'mongoose'

const informationSchema = mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
      },
      body: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   }
)

const Informations = mongoose.model('Informations', informationSchema)

export default Informations
