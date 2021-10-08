import axios from 'axios'

const create = async (values) => {
   try {
      const { data } = await axios.post(`/api/reports`, values)
      return data
   } catch (error) {
      throw error
   }
}

const update = async (id, values) => {
   try {
      const { data } = await axios.put(`/api/reports/${id}`, values)
      return data
   } catch (error) {
      throw error
   }
}

const RaporService = {
   create,
   update,
}

export default RaporService
