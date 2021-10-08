import axios from 'axios'
import { updateUser } from '../contexts/authContext/AuthActions'

const create = async (values) => {
   try {
      const { data } = await axios.post('/api/teachers', values)
      return data
   } catch (error) {
      throw error
   }
}
const update = async (id, values, dispatch) => {
   try {
      const { data } = await axios.put(`/api/teachers/${id}`, values)
      if (dispatch) {
         dispatch(updateUser(data.user))
      }
      return data
   } catch (error) {
      throw error
   }
}
const deleteTeacher = async (id) => {
   try {
      const { data } = await axios.delete(`/api/teachers/${id}`)
      return data
   } catch (error) {
      throw error
   }
}
const updatePhoto = async (id, values, dispatch) => {
   try {
      const { data } = await axios.put(`/api/teachers/${id}/photo`, values)
      dispatch(updateUser(data.user))
      return data
   } catch (error) {
      throw error
   }
}

const TeacherService = {
   create,
   update,
   deleteTeacher,
   updatePhoto,
}

export default TeacherService
