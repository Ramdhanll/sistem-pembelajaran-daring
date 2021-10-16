import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
// mKF52BvRh1vfgLGf
const Mongoose = () =>
   mongoose
      .connect(
         'mongodb+srv://indonesia:indonesiaraya@cluster0.prj7h.mongodb.net/smp?retryWrites=true&w=majority',
         {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
         }
      )
      .then(() => console.log('DB Connected'))
      .catch((e) => console.log(e))

export default Mongoose
