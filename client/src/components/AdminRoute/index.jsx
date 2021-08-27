import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext/AuthContexts'

const AdminRoute = ({ component: Component, ...rest }) => {
   const { userState } = useContext(AuthContext)

   return (
      <Route
         {...rest}
         render={(props) =>
            userState?.role === 'admin' ? (
               <Component {...props}></Component>
            ) : userState?.role === 'student' ||
              userState?.role === 'teacher' ? (
               <Redirect to={localStorage.getItem('goto') || '/'} />
            ) : (
               <Redirect to='/login' />
            )
         }
      />
   )
}

export default AdminRoute
