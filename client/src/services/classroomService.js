import axios from 'axios'
import { updateClassroom } from '../contexts/classroomContext/ClassroomActions'

export default {
   create: async (values) => {
      try {
         const { data } = await axios.post(`/api/classrooms`, values)
         return data
      } catch (error) {
         throw error
      }
   },
   update: async (id, values, dispatch) => {
      try {
         const { data } = await axios.put(`/api/classrooms/${id}`, values)
         dispatch(updateClassroom(data.classroom))
         return data
      } catch (error) {
         throw error
      }
   },
   delete: async (id) => {
      try {
         const { data } = await axios.delete(`/api/classrooms/${id}`)
         return data
      } catch (error) {
         throw error
      }
   },
}
