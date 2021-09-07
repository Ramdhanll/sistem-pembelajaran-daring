import {
   Flex,
   Image,
   Box,
   Button,
   Link,
   useDisclosure,
   VStack,
   DrawerBody,
   Drawer,
   Avatar,
   DrawerOverlay,
   DrawerContent,
   DrawerCloseButton,
   DrawerHeader,
   Text,
} from '@chakra-ui/react'
import { MdMenu } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext/AuthContexts'

const NavbarLandingPage = ({ navVisible }) => {
   const { isOpen, onOpen, onClose } = useDisclosure()
   const { userState } = useContext(AuthContext)

   return (
      <>
         <Flex
            h='80px'
            p={['7px 25px', '15px 50px']}
            alignItems='center'
            justifyContent='space-between'
         >
            <NavLink to='/'>
               <Image
                  boxSize='50px'
                  borderRadius='full'
                  objectFit='cover'
                  src='https://images.unsplash.com/photo-1587653559430-aadd3ac46e3f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=819&q=80'
                  alt='Segun Adebayo'
               />
            </NavLink>

            {/* Burger Bar For Handphone */}
            <Box display={['flex', 'none']}>
               <Button onClick={onOpen}>
                  <MdMenu />
               </Button>
            </Box>

            <Box
               flex='1'
               display={['none', 'flex']}
               alignItems='center'
               justifyContent={navVisible ? 'space-between' : 'flex-end'}
            >
               {/* Nav */}
               <Flex
                  alignItems='center'
                  ml='50px'
                  justifyContent='space-between'
                  w='250px'
                  display={navVisible ? 'flex' : 'none'}
               >
                  <Link
                     href='#home'
                     _hover={{
                        textDecoration: 'none',
                     }}
                     _focus={{
                        outline: 'none',
                     }}
                  >
                     Home
                  </Link>
                  <Link
                     href='#sejarah'
                     _hover={{
                        textDecoration: 'none',
                     }}
                     _focus={{
                        outline: 'none',
                     }}
                  >
                     Sejarah
                  </Link>
                  <Link
                     href='#visi-misi'
                     _hover={{
                        textDecoration: 'none',
                     }}
                     _focus={{
                        outline: 'none',
                     }}
                  >
                     Visi dan Misi
                  </Link>
               </Flex>

               {userState ? (
                  <NavLink
                     to={localStorage.getItem('goto') || '/'}
                     style={{ alignSelf: 'flex-end' }}
                  >
                     <Flex alignItems='center' justifyContent='space-between'>
                        <Text mr='30px'>{userState.name}</Text>
                        <Avatar name='Dan Abrahmov' src={userState.photo} />
                     </Flex>
                  </NavLink>
               ) : (
                  <NavLink to='/login'>
                     <Button variant='solid' bg='#E5E9F2'>
                        Masuk
                     </Button>
                  </NavLink>
               )}
            </Box>
         </Flex>

         {/* Drawer Nav */}
         <Drawer isOpen={isOpen} placement='top' onClose={onClose} size='full'>
            <DrawerOverlay />
            <DrawerContent>
               <DrawerCloseButton _focus={{ outline: 'none' }} />
               <DrawerHeader></DrawerHeader>

               <DrawerBody>
                  <VStack spacing={6}>
                     <Link
                        href='#home'
                        _hover={{
                           textDecoration: 'none',
                        }}
                        _focus={{
                           outline: 'none',
                        }}
                     >
                        Home
                     </Link>
                     <Link
                        href='#sejarah'
                        _hover={{
                           textDecoration: 'none',
                        }}
                        _focus={{
                           outline: 'none',
                        }}
                     >
                        Sejarah
                     </Link>
                     <Link
                        href='#visi-misi'
                        _hover={{
                           textDecoration: 'none',
                        }}
                        _focus={{
                           outline: 'none',
                        }}
                     >
                        Visi dan Misi
                     </Link>

                     {userState ? (
                        <NavLink to={localStorage.getItem('goto') || '/'}>
                           <Flex alignItems='center' justifyContent='center'>
                              <Text fontWeight='700'>{userState.name}</Text>
                           </Flex>
                        </NavLink>
                     ) : (
                        <NavLink to='/login'>
                           <Button variant='solid' bg='#E5E9F2'>
                              Masuk
                           </Button>
                        </NavLink>
                     )}
                  </VStack>
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </>
   )
}

export default NavbarLandingPage
