import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import theme from './chakra-ui/theme'
import axios from 'axios'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthContextProvider } from './contexts/authContext/AuthContexts'
import { SWRConfig } from 'swr'
import { ClassroomContextProvider } from './contexts/classroomContext/classroomContext'

axios.defaults.withCredentials = true

// DEVELOPMENT
// if (
//    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//       navigator.userAgent
//    )
// ) {
//    axios.defaults.baseURL = 'http://192.168.100.7:5000'
// } else {
//    axios.defaults.baseURL =
//       process.env.REACT_APP_ENDPOINTS || 'http://localhost:5000'
// }

// PRODUCTION
axios.defaults.baseURL =
   process.env.REACT_APP_ENDPOINTS || 'http://192.168.100.7:5000'

ReactDOM.render(
   <React.StrictMode>
      <ChakraProvider theme={theme}>
         <AuthContextProvider>
            <ClassroomContextProvider>
               <SWRConfig
                  value={{
                     fetcher: (url) => axios.get(url).then((res) => res.data),
                     revalidateOnFocus: true,
                  }}
               >
                  <App />
               </SWRConfig>
            </ClassroomContextProvider>
         </AuthContextProvider>
      </ChakraProvider>
   </React.StrictMode>,
   document.getElementById('root')
)
