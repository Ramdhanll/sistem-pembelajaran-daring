import { Box } from '@chakra-ui/react'
import './App.css'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './pages/Login'
import LandingPage from './pages/LandingPage'
import Teacher from './pages/Teacher'
import TeacherRoute from './components/TeacherRoute'
import Student from './pages/Student'
import StudentRoute from './components/StudentRoute'
import { AuthContext } from './contexts/authContext/AuthContexts'
import { useContext, useEffect } from 'react'
import Admin from './pages/Admin'
import AdminRoute from './components/AdminRoute'
import Information from './pages/Information'
import AuthService from './services/AuthService'

function App() {
   const { userDispatch } = useContext(AuthContext)

   useEffect(() => {
      AuthService.status(userDispatch)
   }, [userDispatch])

   return (
      <Box className='App'>
         <Router>
            <Switch>
               <Route path='/' component={LandingPage} exact />
               <Route path='/login' component={Login} />
               <Route path='/informasi/:id' component={Information} />
               <AdminRoute path='/a' component={Admin} />
               <TeacherRoute path='/t' component={Teacher} />
               <StudentRoute path='/s' component={Student} />
               <Route path='*'>404</Route>
            </Switch>
         </Router>
      </Box>
   )
}

export default App
