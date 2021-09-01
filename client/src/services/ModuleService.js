import axios from 'axios'

export default {
   create: async (values) => {
      try {
         const { data } = await axios.post('/api/modules', values)
         return data
      } catch (error) {
         throw error
      }
   },
   update: async (id, values) => {
      try {
         const { data } = await axios.put(`/api/modules/${id}`, values)
         return data
      } catch (error) {
         throw error
      }
   },
   delete: async (id) => {
      try {
         const { data } = await axios.delete(`/api/modules/${id}`)
         return data
      } catch (error) {
         throw error
      }
   },
}
