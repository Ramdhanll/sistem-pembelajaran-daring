import {
   Avatar,
   Box,
   Button,
   Flex,
   HStack,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Text,
   useDisclosure,
   VStack,
} from '@chakra-ui/react'
import React from 'react'
import { MdModeEdit } from 'react-icons/md'

const Info = () => {
   const { isOpen, onOpen, onClose } = useDisclosure()

   return (
      <Box>
         {/*  Kelas, Tahun Ajaran, Kode */}
         <Flex justifyContent='space-between' alignItems='center'>
            <HStack spacing={['25px', '50px']}>
               <VStack spacing={3} alignItems='flex-start'>
                  <Text fontWeight='600' fontSize={['lg', 'xl', '2xl']}>
                     Kelas
                  </Text>
                  <Text fontWeight='300' fontSize={['sm', 'md', 'lg', 'xl']}>
                     8C
                  </Text>
               </VStack>
               <VStack spacing={3} alignItems='flex-start'>
                  <Text fontWeight='600' fontSize={['lg', 'xl', '2xl']}>
                     Tahun Ajaran
                  </Text>
                  <Text fontWeight='300' fontSize={['sm', 'md', 'lg', 'xl']}>
                     2021/2022
                  </Text>
               </VStack>
               <VStack spacing={3} alignItems='flex-start'>
                  <Text fontWeight='600' fontSize={['lg', 'xl', '2xl']}>
                     Kode
                  </Text>
                  <Text fontWeight='300' fontSize={['sm', 'md', 'lg', 'xl']}>
                     kwe232
                  </Text>
               </VStack>
            </HStack>

            <Button
               variant='solid'
               colorScheme='yellow'
               _focus={{ outline: 'none' }}
               onClick={onOpen}
            >
               <MdModeEdit size='24px' />
            </Button>
         </Flex>

         {/* Teacher */}
         <Box mt='30px'>
            <Text fontWeight='600' fontSize={['lg', 'xl', '2xl']}>
               Guru
            </Text>
            <Flex alignItems='center' gridGap='15px' mt='20px'>
               <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
               <Text fontSize={['md', 'lg', 'xl']}>Kakashi Hatake</Text>
            </Flex>
         </Box>

         {/* Members */}
         <Box mt='30px'>
            <Text fontWeight='600' fontSize={['lg', 'xl', '2xl']}>
               Anggota
            </Text>
            {[...Array(15).keys()].map((item, i) => (
               <Flex key={i} alignItems='center' gridGap='15px' mt='20px'>
                  <Avatar
                     name='Dan Abrahmov'
                     src='https://bit.ly/dan-abramov'
                  />
                  <Text fontSize={['md', 'lg', 'xl']}>Kakashi Hatake</Text>
               </Flex>
            ))}
         </Box>

         {/* Modal Edit */}
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Modal Title</ModalHeader>
               <ModalCloseButton _focus={{ outline: 'none' }} />
               <ModalBody>Content</ModalBody>
               <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                     Close
                  </Button>
                  <Button variant='ghost'>Secondary Action</Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </Box>
   )
}

export default Info
