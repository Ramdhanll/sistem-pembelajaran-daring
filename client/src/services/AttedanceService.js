import axios from 'axios'

export default {
   create: async (values) => {
      try {
         const { data } = await axios.post('/api/attedances', values)
         return data
      } catch (error) {
         throw error
      }
   },
   update: async (id, values) => {
      try {
         const { data } = await axios.put(`/api/attedances/${id}`, values)
         return data
      } catch (error) {
         throw error
      }
   },
   delete: async (id) => {
      try {
         const { data } = await axios.delete(`/api/attedances/${id}`)
         return data
      } catch (error) {
         throw error
      }
   },
   submittedAttend: async (id, values) => {
      try {
         const { data } = await axios.put(
            `/api/attedances/${id}/submit`,
            values
         )
         return data
      } catch (error) {
         throw error
      }
   },
   endAttend: async (id) => {
      try {
         const { data } = await axios.put(`/api/attedances/${id}/end`)
         return data
      } catch (error) {
         throw error
      }
   },
}
