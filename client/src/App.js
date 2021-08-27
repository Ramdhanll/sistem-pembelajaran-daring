import { Box, Text } from '@chakra-ui/react'
import './App.css'

import {
   BrowserRouter as Router,
   Switch,
   Route,
   NavLink,
} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/LandingPage'
import LandingPage from './pages/LandingPage'
import Teacher from './pages/Teacher'
import TeacherRoute from './components/TeacherRoute'
import Student from './pages/Student'
import StudentRoute from './components/StudentRoute'
import { AuthContext } from './contexts/authContext/AuthContexts'
import { useContext } from 'react'
import Admin from './pages/Admin'
import AdminRoute from './components/AdminRoute'
import Information from './pages/Information'

function App() {
   const { userState } = useContext(AuthContext)

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
