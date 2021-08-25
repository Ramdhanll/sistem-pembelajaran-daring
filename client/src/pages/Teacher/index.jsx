import {
   Box,
   Button,
   Drawer,
   DrawerBody,
   DrawerCloseButton,
   DrawerContent,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   Flex,
   Text,
   useDisclosure,
   VStack,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { MdDashboard } from 'react-icons/md'
import { SiGoogleclassroom } from 'react-icons/si'
import {
   NavLink,
   Switch,
   BrowserRouter as Router,
   Route,
} from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Classroom from './Classroom'
import Dashboard from './Dashboard'

const Teacher = ({ history, location }) => {
   // useEffect(() => {
   //    if (location.pathname === '/t' || location.pathname === '/t/') {
   //       history.push('/t/dashboard')
   //    }
   // }, [location.pathname])

   return (
      <>
         <Navbar>
            <Flex direction='column'>
               <Text fontWeight='light' color='textSecondary' fontSize='2xl'>
                  Menu
               </Text>
               <VStack spacing={3} alignItems='start'>
                  <NavLink
                     to='/t/dashboard'
                     style={{
                        marginTop: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        color: '#969696',
                     }}
                     activeStyle={{
                        color: '#34364A',
                        fontWeight: '700',
                     }}
                  >
                     <MdDashboard size='24px' />
                     <Text fontSize='xl' ml='10px'>
                        Dashboard
                     </Text>
                  </NavLink>

                  <NavLink
                     to='/t/kelas'
                     style={{
                        marginTop: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        color: '#969696',
                     }}
                     activeStyle={{
                        color: '#34364A',
                        fontWeight: '700',
                     }}
                  >
                     <SiGoogleclassroom size='24px' />
                     <Text fontSize='xl' ml='10px'>
                        Kelas
                     </Text>
                  </NavLink>
               </VStack>
            </Flex>
         </Navbar>
         <Switch>
            <Route path='/t/dashboard' component={Dashboard} exact />
            <Route path='/t/kelas' component={Classroom} exact />
            <Route path='/t/*'>NOT FOUND</Route>
         </Switch>
      </>
   )
}

export default Teacher
