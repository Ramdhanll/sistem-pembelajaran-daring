import {
   Avatar,
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
   Menu,
   MenuButton,
   MenuDivider,
   MenuGroup,
   MenuItem,
   MenuList,
   Text,
   useDisclosure,
   useToast,
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import { MdMenu } from 'react-icons/md'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext/AuthContexts'
import AuthService from '../../services/AuthService'

const Navbar = ({ children }) => {
   const history = useHistory()
   const toast = useToast()
   const { userState, userDispatch } = useContext(AuthContext)
   const { isOpen, onClose, onOpen } = useDisclosure()

   const handleLogout = async () => {
      try {
         await AuthService.logout(userDispatch)

         history.push('/login')
      } catch (error) {
         console.log('error', error)
         toast({
            title: 'Logout tidak berhasil',
            description: 'terjadi masalah pada server',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      }
   }
   return (
      <Box
         h='60px'
         borderBottomColor='#969696'
         borderWidth='1px'
         bg='#fff'
         display='flex'
         alignItems='center'
         justifyContent='space-between'
         px={['20px', '30px']}
      >
         <Button variant='ghost' onClick={onOpen} _focus={{ outline: 'none' }}>
            <MdMenu size='24px' />
         </Button>

         <Menu>
            <MenuButton>
               <Flex
                  alignItems='center'
                  justifyContent='space-between'
                  bg='#fff'
               >
                  <Text mr='30px'>{userState.name}</Text>
                  <Avatar name='Dan Abrahmov' src={userState.photo} />
               </Flex>
            </MenuButton>
            <MenuList>
               <MenuGroup title='Profile'>
                  <MenuItem>My Account</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout </MenuItem>
               </MenuGroup>
            </MenuList>
         </Menu>

         {/* Drawer */}
         <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
               <DrawerCloseButton _focus={{ outline: 'none' }} />
               <DrawerHeader>
                  <Badge fontSize='xl' variant='outline' colorScheme='green'>
                     {userState.role}
                  </Badge>
               </DrawerHeader>

               <DrawerBody pt='20px' pl='50px'>
                  {children}
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </Box>
   )
}

export default Navbar
