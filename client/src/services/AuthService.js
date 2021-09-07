import axios from 'axios'
import { loginSuccess, logout } from '../contexts/authContext/AuthActions'

export default {
   login: async (values, dispatch) => {
      try {
         const { data } = await axios.post('/api/auth/login', values)
         dispatch(loginSuccess(data))
      } catch (error) {
         throw error
      }
   },
   logout: async (dispatch) => {
      try {
         await axios.post('/api/auth/logout')
         localStorage.removeItem('user')
         localStorage.removeItem('goto')

         dispatch(logout())
      } catch (error) {
         throw error
      }
   },
   status: async (dispatch) => {
      try {
         await axios.get(`/api/auth/status`)
      } catch (error) {
         dispatch(logout())
         throw error
      }
   },
}
