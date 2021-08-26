import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext/AuthContexts'

const StudentRoute = ({ component: Component, ...rest }) => {
   const { userState } = useContext(AuthContext)

   return (
      <Route
         {...rest}
         render={(props) =>
            userState?.role === 'student' ? (
               <Component {...props}></Component>
            ) : userState?.role === 'teacher' || userState?.role === 'admin' ? (
               <Redirect to={localStorage.getItem('goto')} />
            ) : (
               <Redirect to='/login' />
            )
         }
      />
   )
}

export default StudentRoute
