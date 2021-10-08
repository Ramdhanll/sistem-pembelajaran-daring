import axios from 'axios'

const create = async (values) => {
   try {
      const { data } = await axios.post('/api/modules', values)
      return data
   } catch (error) {
      throw error
   }
}
const update = async (id, values) => {
   try {
      const { data } = await axios.put(`/api/modules/${id}`, values)
      return data
   } catch (error) {
      throw error
   }
}
const deleteModule = async (id) => {
   try {
      const { data } = await axios.delete(`/api/modules/${id}`)
      return data
   } catch (error) {
      throw error
   }
}

const ModuleService = {
   create,
   update,
   deleteModule,
}

export default ModuleService
