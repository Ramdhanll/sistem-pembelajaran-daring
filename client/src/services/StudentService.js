import axios from 'axios'
import { updateUser } from '../contexts/authContext/AuthActions'

export default {
   create: async (values) => {
      try {
         const { data } = await axios.post('/api/students', values)
         return data
      } catch (error) {
         throw error
      }
   },
   update: async (id, values) => {
      try {
         const { data } = await axios.put(`/api/students/${id}`, values)
         return data
      } catch (error) {
         throw error
      }
   },
   delete: async (id) => {
      try {
         const { data } = await axios.delete(`/api/students/${id}`)
         return data
      } catch (error) {
         throw error
      }
   },
   updatePhoto: async (id, values, dispatch) => {
      try {
         const { data } = await axios.put(`/api/students/${id}/photo`, values)
         dispatch(updateUser(data.user))
         return data
      } catch (error) {
         throw error
      }
   },
}
