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

function App() {
   const { userState } = useContext(AuthContext)

   // console.log('app', userState)
   return (
      <Box className='App'>
         <Router>
            <Switch>
               <Route path='/' component={LandingPage} exact />
               <Route path='/login' component={Login} />
               <StudentRoute path='/s' component={Student} />
               <TeacherRoute path='/t' component={Teacher} />
               <Route path='*'>404</Route>
            </Switch>
         </Router>
      </Box>
   )
}

export default App
