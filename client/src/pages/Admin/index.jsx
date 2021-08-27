import {
   Badge,
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
import React, { useContext, useEffect } from 'react'
import { GiTeacher } from 'react-icons/gi'
import { IoMdPeople } from 'react-icons/io'
import { MdDashboard } from 'react-icons/md'
import { RiAdminFill } from 'react-icons/ri'
import { BiNews } from 'react-icons/bi'
import {
   NavLink,
   Switch,
   BrowserRouter as Router,
   Route,
} from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { AuthContext } from '../../contexts/authContext/AuthContexts'
import Dashboard from './Dashboard'
import Information from './Information'

const Admin = ({ history, location }) => {
   return (
      <>
         <Navbar>
            <Flex direction='column'>
               <Text fontWeight='light' color='textSecondary' fontSize='2xl'>
                  Menu
               </Text>
               <VStack spacing={3} alignItems='start'>
                  <NavLink
                     to='/a'
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
                     to='/a/informasi-dan-berita'
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
                     <BiNews size='24px' />
                     <Text fontSize='xl' ml='10px'>
                        Informasi dan Berita
                     </Text>
                  </NavLink>

                  <NavLink
                     to='/a/admin'
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
                     <RiAdminFill size='24px' />
                     <Text fontSize='xl' ml='10px'>
                        Admin
                     </Text>
                  </NavLink>
                  <NavLink
                     to='/a/guru'
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
                     <GiTeacher size='24px' />
                     <Text fontSize='xl' ml='10px'>
                        Guru
                     </Text>
                  </NavLink>
                  <NavLink
                     to='/a/siswa'
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
                     <IoMdPeople size='24px' />
                     <Text fontSize='xl' ml='10px'>
                        Siswa
                     </Text>
                  </NavLink>
               </VStack>
            </Flex>
         </Navbar>
         <Switch>
            <Route path='/a' component={Dashboard} exact />
            <Route
               path='/a/informasi-dan-berita'
               component={Information}
               exact
            />
            <Route path='/a/*'>NOT FOUND</Route>
         </Switch>
      </>
   )
}

export default Admin