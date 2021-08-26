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
   Input,
   Text,
   useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { MdLibraryBooks } from 'react-icons/md'

const CardModul = ({ title, date }) => {
   const { isOpen, onOpen, onClose } = useDisclosure()

   return (
      <Box w='100%'>
         <Box
            as='button'
            _hover={{
               backgroundColor: '#ebf5ed',
            }}
            _active={{
               backgroundColor: '#e6ede7',
            }}
            onClick={onOpen}
            bg='white'
            borderRadius='lg'
            px='15px'
            py='10px'
            border='1px solid #888888'
            display='flex'
            gridGap='20px'
            alignItems='center'
            w={['100%', '90%', '80%', '70%']}
         >
            <Box
               borderRadius='100%'
               w='50px'
               h='50px'
               bg='#9F9F9F'
               display='flex'
               alignItems='center'
               justifyContent='center'
            >
               <MdLibraryBooks size='24px' color='#fff' />
            </Box>
            <Box textAlign='left' flex='1'>
               <Text fontSize={['md', 'lg', 'xl']}>
                  {title.length > 45 ? `${title.substring(0, 45)}...` : title}
               </Text>
               <Text color='textSecondary' fontSize={['sm', 'md', 'lg']}>
                  {date}
               </Text>
            </Box>
         </Box>
         {/* Drawer */}
         <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
               <DrawerCloseButton _focus={{ outline: 'none' }} />
               <DrawerHeader>Modul</DrawerHeader>

               <DrawerBody py='20px'>
                  <Text fontSize={['lg', 'xl', '2xl']}>{title}</Text>
                  <Text
                     color='textSecondary'
                     fontSize={['md', 'lg', 'xl']}
                     mt='5px'
                  >
                     {date}
                  </Text>
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </Box>
   )
}

export default CardModul
