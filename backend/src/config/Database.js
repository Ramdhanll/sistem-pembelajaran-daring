import mongoose from 'mongoose'

const Mongoose = () =>
   mongoose
      .connect(process.env.MONGODB_URI || 'mongodb://localhost/aldi-siakad', {
         useUnifiedTopology: true,
         useNewUrlParser: true,
         useFindAndModify: false,
         useCreateIndex: true,
      })
      .then(() => console.log('DB Connected'))
      .catch((e) => console.log(e))

export default Mongoose
