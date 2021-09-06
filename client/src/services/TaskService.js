import axios from 'axios'

export default {
   create: async (values) => {
      try {
         const { data } = await axios.post('/api/tasks', values)
         return data
      } catch (error) {
         throw error
      }
   },
   update: async (id, values) => {
      try {
         const { data } = await axios.put(`/api/tasks/${id}`, values)
         return data
      } catch (error) {
         throw error
      }
   },
   delete: async (id) => {
      try {
         const { data } = await axios.delete(`/api/tasks/${id}`)
         return data
      } catch (error) {
         throw error
      }
   },
   submittedTask: async (id, values) => {
      try {
         const { data } = await axios.put(`/api/tasks/${id}/submit`, values)
         console.log(data)
         return data
      } catch (error) {
         console.log(error.response)
         throw error
      }
   },
   givingGrades: async (id, values) => {
      try {
         const { data } = await axios.put(`/api/tasks/${id}/grades`, values)
         return data
      } catch (error) {
         throw error
      }
   },
   endTask: async (id) => {
      try {
         const { data } = await axios.put(`/api/tasks/${id}/end`)
         return data
      } catch (error) {
         throw error
      }
   },
}
