import {
   Avatar,
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
} from '@chakra-ui/react'
import React from 'react'
import { MdMenu } from 'react-icons/md'

const Navbar = ({ children }) => {
   const { isOpen, onClose, onOpen } = useDisclosure()
   return (
      <Box
         h='60px'
         borderBottomColor='#969696'
         borderWidth='1px'
         bg='#fff'
         display='flex'
         alignItems='center'
         justifyContent='space-between'
         px={['25px', '30px']}
      >
         <Button variant='ghost' onClick={onOpen} _focus={{ outline: 'none' }}>
            <MdMenu size='24px' />
         </Button>

         <Flex alignItems='center' justifyContent='space-between' bg='#fff'>
            <Text mr='30px'>Aldi Alfiansyah</Text>
            <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
         </Flex>

         {/* Drawer */}
         <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
               <DrawerCloseButton _focus={{ outline: 'none' }} />
               <DrawerHeader></DrawerHeader>

               <DrawerBody pt='50px' pl='50px'>
                  {children}
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </Box>
   )
}

export default Navbar
