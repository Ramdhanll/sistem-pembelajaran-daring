import express from 'express'
import dotenv from 'dotenv'
import Database from './config/Database.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { authRouter, userRouter } from './api/routes/index.js'
import informationRouter from './api/routes/informationRouter.js'
import adminRouter from './api/routes/adminRouter.js'

const PORT = process.env.PORT || 5000
dotenv.config()
const app = express()

// Middleware
app.use(
   cors({
      credentials: true,
      origin: [
         process.env.FRONT_END_URL || 'http://localhost:3000',
         'http://192.168.100.7:3000',
      ],
   })
)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Setup mongoose database
Database()

// Routes
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/informations', informationRouter)
app.use('/api/admins', adminRouter)

app.use('/', (req, res) => {
   res.send('Server is on!')
})

app.use((err, req, res, next) => {
   // this method from express-async-handler to handle error
   res.status(500).send({ message: err.message })
})

app.listen(PORT, () => {
   console.log(`Server listening on: http://localhost:${PORT}`)
})
