import axios from 'axios'

const create = async (values) => {
   try {
      const { data } = await axios.post('/api/tasks', values)
      return data
   } catch (error) {
      throw error
   }
}
const update = async (id, values) => {
   try {
      const { data } = await axios.put(`/api/tasks/${id}`, values)
      return data
   } catch (error) {
      throw error
   }
}
const deleteTask = async (id) => {
   try {
      const { data } = await axios.delete(`/api/tasks/${id}`)
      return data
   } catch (error) {
      throw error
   }
}
const submittedTask = async (id, values) => {
   try {
      const { data } = await axios.put(`/api/tasks/${id}/submit`, values)
      console.log(data)
      return data
   } catch (error) {
      console.log(error.response)
      throw error
   }
}
const givingGrades = async (id, values) => {
   try {
      const { data } = await axios.put(`/api/tasks/${id}/grades`, values)
      return data
   } catch (error) {
      throw error
   }
}
const endTask = async (id) => {
   try {
      const { data } = await axios.put(`/api/tasks/${id}/end`)
      return data
   } catch (error) {
      throw error
   }
}

const TaskService = {
   create,
   update,
   deleteTask,
   submittedTask,
   givingGrades,
   endTask,
}

export default TaskService
