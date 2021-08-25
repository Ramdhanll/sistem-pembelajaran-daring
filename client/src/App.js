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

function App() {
   return (
      <Box className='App'>
         <Router>
            <Switch>
               <Route path='/' component={LandingPage} exact />
               <Route path='/login' component={Login} />
               <Route path='/t' component={Teacher} />
               <Route path='*'>404</Route>
            </Switch>
         </Router>
      </Box>
   )
}

export default App
