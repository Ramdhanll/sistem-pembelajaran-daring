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
      gender: 'L',
      year_of_entry: '2021/2022',
   },
   {
      nis: '1231231232',
      name: 'student 2',
      photo: 'https://bit.ly/ryan-florence',
      email: 'student2@gmail.com',
      password: bcrypt.hashSync('password', salt),
      gender: 'L',
      year_of_entry: '2021/2022',
   },
   {
      nis: '1231231233',
      name: 'student 3',
      photo: 'https://bit.ly/ryan-florence',
      email: 'student3@gmail.com',
      password: bcrypt.hashSync('password', salt),
      gender: 'L',
      year_of_entry: '2021/2022',
   },
]

export const teachersDummy = [
   {
      name: 'teacher 1',
      photo: 'https://bit.ly/ryan-florence',
      email: 'teacher1@gmail.com',
      password: bcrypt.hashSync('password', salt),
      gender: 'L',
   },
   {
      name: 'teacher 2',
      photo: 'https://bit.ly/ryan-florence',
      email: 'teacher2@gmail.com',
      password: bcrypt.hashSync('password', salt),
      gender: 'L',
   },
   {
      name: 'teacher 3',
      photo: 'https://bit.ly/ryan-florence',
      email: 'teacher3@gmail.com',
      password: bcrypt.hashSync('password', salt),
      gender: 'L',
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

export const informationsDummy = [
   {
      title: 'Pembayaran SPP',
      // body: '<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis urna aliquet, cursus nunc nec, mattis ipsum. Nam laoreet libero et aliquam fringilla. Donec mauris felis, imperdiet ac orci scelerisque, scelerisque sollicitudin nunc. Mauris eu mauris tincidunt velit placerat euismod et ac augue. Proin nec ligula sapien. Quisque congue ipsum placerat libero laoreet, at ornare justo ultrices. Nulla sit amet porttitor dolor, non hendrerit arcu. Maecenas purus nisl, ornare varius vulputate sed, tempus in turpis. Quisque accumsan nisi et viverra vehicula. Nam viverra tortor orci, luctus bibendum leo faucibus ut. Morbi ultricies dui eu nisl hendrerit, rhoncus viverra lacus condimentum. Aenean tempus interdum ultricies. Duis odio tortor, mattis ut dapibus vel, euismod et magna. Vivamus justo mauris, vestibulum quis massa vitae, efficitur porta turpis</p>',
      body: '<p>Aku </p>',
   },
   {
      title: 'Pembukaan pendaftaran siswa baru',
      // body: '<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis urna aliquet, cursus nunc nec, mattis ipsum. Nam laoreet libero et aliquam fringilla. Donec mauris felis, imperdiet ac orci scelerisque, scelerisque sollicitudin nunc. Mauris eu mauris tincidunt velit placerat euismod et ac augue. Proin nec ligula sapien. Quisque congue ipsum placerat libero laoreet, at ornare justo ultrices. Nulla sit amet porttitor dolor, non hendrerit arcu. Maecenas purus nisl, ornare varius vulputate sed, tempus in turpis. Quisque accumsan nisi et viverra vehicula. Nam viverra tortor orci, luctus bibendum leo faucibus ut. Morbi ultricies dui eu nisl hendrerit, rhoncus viverra lacus condimentum. Aenean tempus interdum ultricies. Duis odio tortor, mattis ut dapibus vel, euismod et magna. Vivamus justo mauris, vestibulum quis massa vitae, efficitur porta turpis</p>',
      body: '<p>Aku </p>',
   },
   {
      title: 'Ujian Nasional 2021',
      // body: '<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis urna aliquet, cursus nunc nec, mattis ipsum. Nam laoreet libero et aliquam fringilla. Donec mauris felis, imperdiet ac orci scelerisque, scelerisque sollicitudin nunc. Mauris eu mauris tincidunt velit placerat euismod et ac augue. Proin nec ligula sapien. Quisque congue ipsum placerat libero laoreet, at ornare justo ultrices. Nulla sit amet porttitor dolor, non hendrerit arcu. Maecenas purus nisl, ornare varius vulputate sed, tempus in turpis. Quisque accumsan nisi et viverra vehicula. Nam viverra tortor orci, luctus bibendum leo faucibus ut. Morbi ultricies dui eu nisl hendrerit, rhoncus viverra lacus condimentum. Aenean tempus interdum ultricies. Duis odio tortor, mattis ut dapibus vel, euismod et magna. Vivamus justo mauris, vestibulum quis massa vitae, efficitur porta turpis</p>',
      body: '<p>Aku </p>',
   },
   {
      title: 'Studi Wisata ke Bandung',
      // body: '<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis urna aliquet, cursus nunc nec, mattis ipsum. Nam laoreet libero et aliquam fringilla. Donec mauris felis, imperdiet ac orci scelerisque, scelerisque sollicitudin nunc. Mauris eu mauris tincidunt velit placerat euismod et ac augue. Proin nec ligula sapien. Quisque congue ipsum placerat libero laoreet, at ornare justo ultrices. Nulla sit amet porttitor dolor, non hendrerit arcu. Maecenas purus nisl, ornare varius vulputate sed, tempus in turpis. Quisque accumsan nisi et viverra vehicula. Nam viverra tortor orci, luctus bibendum leo faucibus ut. Morbi ultricies dui eu nisl hendrerit, rhoncus viverra lacus condimentum. Aenean tempus interdum ultricies. Duis odio tortor, mattis ut dapibus vel, euismod et magna. Vivamus justo mauris, vestibulum quis massa vitae, efficitur porta turpis</p>',
      body: '<p>Aku </p>',
   },
   {
      title: 'Sholat idul fitri bersama',
      // body: '<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis urna aliquet, cursus nunc nec, mattis ipsum. Nam laoreet libero et aliquam fringilla. Donec mauris felis, imperdiet ac orci scelerisque, scelerisque sollicitudin nunc. Mauris eu mauris tincidunt velit placerat euismod et ac augue. Proin nec ligula sapien. Quisque congue ipsum placerat libero laoreet, at ornare justo ultrices. Nulla sit amet porttitor dolor, non hendrerit arcu. Maecenas purus nisl, ornare varius vulputate sed, tempus in turpis. Quisque accumsan nisi et viverra vehicula. Nam viverra tortor orci, luctus bibendum leo faucibus ut. Morbi ultricies dui eu nisl hendrerit, rhoncus viverra lacus condimentum. Aenean tempus interdum ultricies. Duis odio tortor, mattis ut dapibus vel, euismod et magna. Vivamus justo mauris, vestibulum quis massa vitae, efficitur porta turpis</p>',
      body: '<p>Aku </p>',
   },
]
