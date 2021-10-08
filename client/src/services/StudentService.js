import axios from 'axios'
import { updateUser } from '../contexts/authContext/AuthActions'

const create = async (values) => {
   try {
      const { data } = await axios.post('/api/students', values)
      return data
   } catch (error) {
      throw error
   }
}
const update = async (id, values, dispatch) => {
   try {
      const { data } = await axios.put(`/api/students/${id}`, values)
      if (dispatch) {
         dispatch(updateUser(data.user))
      }
      return data
   } catch (error) {
      throw error
   }
}
const deleteStudent = async (id) => {
   try {
      const { data } = await axios.delete(`/api/students/${id}`)
      return data
   } catch (error) {
      throw error
   }
}
const updatePhoto = async (id, values, dispatch) => {
   try {
      const { data } = await axios.put(`/api/students/${id}/photo`, values)
      dispatch(updateUser(data.user))
      return data
   } catch (error) {
      throw error
   }
}

const StudentService = {
   create,
   update,
   deleteStudent,
   updatePhoto,
}

export default StudentService
