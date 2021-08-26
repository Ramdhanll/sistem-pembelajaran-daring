import bcrypt from 'bcrypt'
import User from '../api/models/studentsModel.js'

let salt = bcrypt.genSaltSync(8)

export const studentsDummy = [
   {
      nis: '1231231231',
      name: 'student 1',
      photo: 'https://bit.ly/ryan-florence',
      email: 'student1@gmail.com',
      password: bcrypt.hashSync('password', salt),
   },
   {
      nis: '1231231232',
      name: 'student 2',
      photo: 'https://bit.ly/ryan-florence',
      email: 'student2@gmail.com',
      password: bcrypt.hashSync('password', salt),
   },
   {
      nis: '1231231233',
      name: 'student 3',
      photo: 'https://bit.ly/ryan-florence',
      email: 'student3@gmail.com',
      password: bcrypt.hashSync('password', salt),
   },
]

export const teachersDummy = [
   {
      name: 'teacher 1',
      photo: 'https://bit.ly/ryan-florence',
      email: 'teacher1@gmail.com',
      password: bcrypt.hashSync('password', salt),
   },
   {
      name: 'teacher 2',
      photo: 'https://bit.ly/ryan-florence',
      email: 'teacher2@gmail.com',
      password: bcrypt.hashSync('password', salt),
   },
   {
      name: 'teacher 3',
      photo: 'https://bit.ly/ryan-florence',
      email: 'teacher3@gmail.com',
      password: bcrypt.hashSync('password', salt),
   },
]

export const adminsDummy = [
   {
      name: 'Ramadhani',
      photo: 'https://bit.ly/ryan-florence',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('password', salt),
   },
   {
      name: 'admin 1',
      photo: 'https://bit.ly/ryan-florence',
      email: 'admin1@gmail.com',
      password: bcrypt.hashSync('password', salt),
   },
   {
      name: 'admin 2',
      photo: 'https://bit.ly/ryan-florence',
      email: 'admin2@gmail.com',
      password: bcrypt.hashSync('password', salt),
   },
   {
      name: 'admin 3',
      photo: 'https://bit.ly/ryan-florence',
      email: 'admin3@gmail.com',
      password: bcrypt.hashSync('password', salt),
   },
]
