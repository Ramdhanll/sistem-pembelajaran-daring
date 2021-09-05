import axios from 'axios'

export default {
   create: async (values) => {
      try {
         const { data } = await axios.post('/api/exams', values)
         return data
      } catch (error) {
         throw error
      }
   },
   update: async (id, values) => {
      try {
         const { data } = await axios.put(`/api/exams/${id}`, values)
         return data
      } catch (error) {
         throw error
      }
   },
   delete: async (id) => {
      try {
         const { data } = await axios.delete(`/api/exams/${id}`)
         return data
      } catch (error) {
         throw error
      }
   },
   submittedExam: async (id, values) => {
      try {
         const { data } = await axios.put(`/api/exams/${id}/submit`, values)
         console.log(data)
         return data
      } catch (error) {
         console.log(error.response)
         throw error
      }
   },
   givingGrades: async (id, values) => {
      try {
         const { data } = await axios.put(`/api/exams/${id}/grades`, values)
         return data
      } catch (error) {
         throw error
      }
   },
}
