import axios from 'axios'

const create = async (values) => {
   try {
      const { data } = await axios.post('/api/informations', values)
      return data
   } catch (error) {
      throw error
   }
}
const update = async (id, values) => {
   try {
      const { data } = await axios.put(`/api/informations/${id}`, values)
      return data
   } catch (error) {
      throw error
   }
}
const deleteInformation = async (id) => {
   try {
      const { data } = await axios.delete(`/api/informations/${id}`)
      return data
   } catch (error) {
      throw error
   }
}

const InformationService = {
   create,
   update,
   deleteInformation,
}

export default InformationService
