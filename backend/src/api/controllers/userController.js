import Users from '../models/studentsModel.js'

export const getUsers = async (req, res) => {
   const pageSize = 10
   const page = Number(req.query.page) || 1
   const name = req.query.name || ''
   const _id = req.query.id || ''

   const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {}
   const _idFilter = _id ? { _id } : {}

   try {
      const count = await Users.countDocuments({
         ..._idFilter,
         ...nameFilter,
      })

      const users = await Users.find({
         ...nameFilter,
         ..._idFilter,
      })
         .select('-password')
         .skip(pageSize * (page - 1))
         .limit(pageSize)

      res.status(200).json({
         users,
         page,
         pages: Math.ceil(count / pageSize),
      })
   } catch (error) {
      res.status(500).json({ message: 'Server down!', error })
   }
}
