import axios from 'axios'
import { updateClassroom } from '../contexts/classroomContext/ClassroomActions'

const create = async (values) => {
   try {
      const { data } = await axios.post(`/api/classrooms`, values)
      return data
   } catch (error) {
      throw error
   }
}
const update = async (id, values, dispatch) => {
   try {
      const { data } = await axios.put(`/api/classrooms/${id}`, values)
      dispatch(updateClassroom(data.classroom))
      return data
   } catch (error) {
      throw error
   }
}
const deleteClassroom = async (id) => {
   try {
      const { data } = await axios.delete(`/api/classrooms/${id}`)
      return data
   } catch (error) {
      throw error
   }
}
const join = async (id, code) => {
   try {
      const { data } = await axios.put(`/api/classrooms/join`, { id, code })
      return data
   } catch (error) {
      throw error
   }
}

const classroomService = {
   create,
   update,
   deleteClassroom,
   join,
}

export default classroomService
