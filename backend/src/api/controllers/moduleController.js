import Modules from '../models/moduleModal.js'

export const getModules = async (req, res) => {
   try {
      const modules = await Modules.find({
         classroom: req.params.classroomId,
      }).sort('-createdAt')

      res.status(200).json({
         status: 'success',
         modules,
         message: 'Modules has been retrieved',
      })
   } catch (error) {
      res.status(404).json({ message: 'Module not found', error })
   }
}

export const createModule = async (req, res) => {
   const { document, video, ...data } = req.body
   try {
      if (req.files.document)
         data.document = `http://localhost:5000/uploads/${req.files.document[0].filename}`

      if (req.files.video)
         data.video = `http://localhost:5000/uploads/${req.files.video[0].filename}`

      const module = new Modules({
         ...data,
         classroom: JSON.parse(data.classroom),
      })

      const createdModule = await module.save()

      res.status(201).json({
         status: 'success',
         module: createdModule,
         message: 'Module has been created',
      })
   } catch (error) {
      res.status(500).json({ message: 'Module failed to create', error })
   }
}

export const updateModule = async (req, res) => {
   const { title, body, document, video } = req.body
   try {
      const module = await Modules.findById(req.params.id)

      if (req.files.document)
         module.document = `http://localhost:5000/uploads/${req.files.document[0].filename}`

      if (req.files.video)
         module.video = `http://localhost:5000/uploads/${req.files.video[0].filename}`

      module.title = title ? title : module.title
      module.body = body ? body : module.body

      const updatedModule = await module.save()

      res.status(200).json({
         status: 'success',
         module: updatedModule,
         message: 'Module has been updated',
      })
   } catch (error) {
      res.status(500).json({ message: 'Failed update module', error })
   }
}

export const deleteModule = async (req, res) => {
   try {
      await Modules.deleteOne({ _id: req.params.id })
      res.status(200).json({
         status: 'success',
         message: 'Module has been deleted',
      })
   } catch (error) {
      res.status(500).json({ message: 'Failed delete module', error })
   }
}
