import axios from 'axios'
import { updateUser } from '../contexts/authContext/AuthActions'

const create = async (values) => {
   try {
      const { data } = await axios.post('/api/admins', values)
      return data
   } catch (error) {
      throw error
   }
}

const update = async (id, values, dispatch) => {
   try {
      const { data } = await axios.put(`/api/admins/${id}`, values)
      if (dispatch) {
         dispatch(updateUser(data.user))
      }
      return data
   } catch (error) {
      throw error
   }
}

const deleteAdmin = async (id) => {
   try {
      const { data } = await axios.delete(`/api/admins/${id}`)
      return data
   } catch (error) {
      throw error
   }
}

const AdminService = {
   create,
   update,
   deleteAdmin,
}

export default AdminService
