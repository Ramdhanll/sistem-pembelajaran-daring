import axios from 'axios'

const create = async (values) => {
   try {
      const { data } = await axios.post('/api/exams', values)
      return data
   } catch (error) {
      throw error
   }
}
const update = async (id, values) => {
   try {
      const { data } = await axios.put(`/api/exams/${id}`, values)
      return data
   } catch (error) {
      throw error
   }
}
const deleteExam = async (id) => {
   try {
      const { data } = await axios.delete(`/api/exams/${id}`)
      return data
   } catch (error) {
      throw error
   }
}
const submittedExam = async (id, values) => {
   try {
      const { data } = await axios.put(`/api/exams/${id}/submit`, values)
      console.log(data)
      return data
   } catch (error) {
      console.log(error.response)
      throw error
   }
}
const givingGrades = async (id, values) => {
   try {
      const { data } = await axios.put(`/api/exams/${id}/grades`, values)
      return data
   } catch (error) {
      throw error
   }
}
const endExam = async (id) => {
   try {
      const { data } = await axios.put(`/api/exams/${id}/end`)
      return data
   } catch (error) {
      throw error
   }
}

const ExamService = {
   create,
   update,
   deleteExam,
   submittedExam,
   givingGrades,
   endExam,
}

export default ExamService
