import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
// mKF52BvRh1vfgLGf

// 'mongodb+srv://indonesia:indonesiaraya@cluster0.prj7h.mongodb.net/smp?retryWrites=true&w=majority',

const Mongoose = () =>
   mongoose
      .connect(
         'mongodb://indonesia:indonesiaraya@cluster0-shard-00-00.prj7h.mongodb.net:27017,cluster0-shard-00-01.prj7h.mongodb.net:27017,cluster0-shard-00-02.prj7h.mongodb.net:27017/smp?ssl=true&replicaSet=atlas-13k24f-shard-0&authSource=admin&retryWrites=true&w=majority',
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
