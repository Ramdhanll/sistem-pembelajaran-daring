import { Flex, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { MdDashboard } from 'react-icons/md'
import { SiGoogleclassroom } from 'react-icons/si'
import { NavLink, Switch, Route } from 'react-router-dom'
import ClassroomDetail from '../../components/ClassroomDetail'
import Navbar from '../../components/Navbar'
import Profile from '../../components/Profile'
import Classroom from './Classroom'
import Dashboard from './Dashboard'

const Student = ({ history, location }) => {
   return (
      <>
         <Navbar>
            <Flex direction='column'>
               <Text fontWeight='light' color='textSecondary' fontSize='2xl'>
                  Menu
               </Text>
               <VStack spacing={3} alignItems='start'>
                  <NavLink
                     to='/s'
                     exact
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
                     to='/s/kelas'
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
            <Route path='/s' component={Dashboard} exact />
            <Route path='/s/profile' component={Profile} exact />
            <Route path='/s/kelas' component={Classroom} exact />
            <Route path='/s/kelas/:id' component={ClassroomDetail} />

            <Route path='/s/*'>NOT FOUND</Route>
         </Switch>
      </>
   )
}

export default Student
