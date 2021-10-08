import axios from 'axios'

const create = async (values) => {
   try {
      const { data } = await axios.post('/api/attedances', values)
      return data
   } catch (error) {
      throw error
   }
}
const update = async (id, values) => {
   try {
      const { data } = await axios.put(`/api/attedances/${id}`, values)
      return data
   } catch (error) {
      throw error
   }
}
const deleteAttedance = async (id) => {
   try {
      const { data } = await axios.delete(`/api/attedances/${id}`)
      return data
   } catch (error) {
      throw error
   }
}
const submittedAttend = async (id, values) => {
   try {
      const { data } = await axios.put(`/api/attedances/${id}/submit`, values)
      return data
   } catch (error) {
      throw error
   }
}
const endAttend = async (id) => {
   try {
      const { data } = await axios.put(`/api/attedances/${id}/end`)
      return data
   } catch (error) {
      throw error
   }
}

const AttedanceService = {
   create,
   update,
   deleteAttedance,
   submittedAttend,
   endAttend,
}

export default AttedanceService
