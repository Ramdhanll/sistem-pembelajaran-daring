import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
   return jwt.sign(
      {
         _id: user._id,
         name: user.name,
         email: user.email,
         photo: user.photo,
         role: user.role,
      },
      process.env.JWT_SECRET || 'secret',
      {
         expiresIn: '30d',
      }
   )
}
