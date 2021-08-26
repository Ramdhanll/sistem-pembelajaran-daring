import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext/AuthContexts'

const TeacherRoute = ({ component: Component, ...rest }) => {
   const { userState } = useContext(AuthContext)

   return (
      <Route
         {...rest}
         render={(props) =>
            userState?.role === 'teacher' ? (
               <Component {...props}></Component>
            ) : userState?.role === 'student' || userState?.role === 'admin' ? (
               <Redirect to={localStorage.getItem('goto')} />
            ) : (
               <Redirect to='/login' />
            )
         }
      />
   )
}

export default TeacherRoute
