import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import theme from './chakra-ui/theme'
import axios from 'axios'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthContextProvider } from './contexts/authContext/AuthContexts'

axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.BACKEND || 'http://localhost:5000'

ReactDOM.render(
   <React.StrictMode>
      <ChakraProvider theme={theme}>
         <AuthContextProvider>
            <App />
         </AuthContextProvider>
      </ChakraProvider>
   </React.StrictMode>,
   document.getElementById('root')
)
