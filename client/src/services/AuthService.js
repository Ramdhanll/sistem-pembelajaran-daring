import axios from 'axios'
import { loginSuccess, logout } from '../contexts/authContext/AuthActions'

const login = async (values, dispatch) => {
   try {
      const { data } = await axios.post('/api/auth/login', values)
      dispatch(loginSuccess(data.user))
   } catch (error) {
      throw error
   }
}
const logoutAuth = async (dispatch) => {
   try {
      await axios.post('/api/auth/logout')
      localStorage.removeItem('user')
      localStorage.removeItem('goto')

      dispatch(logout())
   } catch (error) {
      throw error
   }
}
const status = async (dispatch) => {
   try {
      await axios.get(`/api/auth/status`)
   } catch (error) {
      dispatch(logout())
      throw error
   }
}
const resetPassword = async (email) => {
   try {
      const { data } = await axios.post(`/api/auth/reset-password`, email)
      return data
   } catch (error) {
      throw error
   }
}
const newPassword = async (values) => {
   try {
      const { data } = await axios.post(`/api/auth/new-password`, values)
      return data
   } catch (error) {
      throw error
   }
}

const AuthService = {
   login,
   logoutAuth,
   status,
   resetPassword,
   newPassword,
}

export default AuthService
