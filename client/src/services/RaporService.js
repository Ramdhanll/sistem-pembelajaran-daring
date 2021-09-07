import axios from 'axios'

export default {
   create: async (values) => {
      try {
         const { data } = await axios.post(`/api/reports`, values)
         return data
      } catch (error) {
         throw error
      }
   },
   update: async (id, values) => {
      try {
         const { data } = await axios.put(`/api/reports/${id}`, values)
         return data
      } catch (error) {
         throw error
      }
   },
}
