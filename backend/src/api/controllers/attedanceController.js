import Attedances from '../models/attedanceModel.js'

export const getAttedances = async (req, res) => {
   try {
      const attedances = await Attedances.find({
         classroom: req.params.classroomId,
      })
         .populate('attedances.student', '_id name photo')
         .sort('-createdAt')

      res.status(200).json({
         status: 'success',
         attedances,
         message: 'Attedances has been retrieved',
      })
   } catch (error) {
      res.status(404).json({ message: 'Attedance not found', error })
   }
}

export const createAttedance = async (req, res) => {
   try {
      const attedance = new Attedances({
         ...req.body,
         classroom: JSON.parse(req.body.classroom),
      })
      const createdAttedance = await attedance.save()

      res.status(201).json({
         status: 'success',
         attedance: createdAttedance,
         message: 'Attedance has been created',
      })
   } catch (error) {
      res.status(500).json({ message: 'Attedance failed to create', error })
   }
}

export const updateAttedance = async (req, res) => {
   console.log(req.body)
   const { title } = req.body
   try {
      const attedance = await Attedances.findById(req.params.id)
      attedance.title = title ? title : attedance.title

      if (
         attedance.attedances.some((item) => {
            return item.student.toString() === req.body.student
         })
      ) {
         throw 'Anda sudah melakukan absensi'
      } else {
         attedance.attedances.push({
            ...req.body,
            student: req.body.student,
         })
      }

      const updatedAttedance = await attedance.save()

      res.status(200).json({
         status: 'success',
         attedance: updatedAttedance,
         message: 'Attedance has been updated',
      })
   } catch (error) {
      res.status(500).json({ message: 'Failed update attedance', error })
   }
}

export const deleteAttedance = async (req, res) => {
   try {
      await Attedances.deleteOne({ _id: req.params.id })
      res.status(200).json({
         status: 'success',
         message: 'Attedance has been deleted',
      })
   } catch (error) {
      res.status(500).json({ message: 'Failed delete attedance', error })
   }
}
