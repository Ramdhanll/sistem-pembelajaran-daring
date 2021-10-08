import {
   Avatar,
   Badge,
   Box,
   Button,
   Flex,
   HStack,
   Text,
   useDisclosure,
   useToast,
   VStack,
} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { MdCode, MdDateRange, MdPeople, MdSchool } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { mutate } from 'swr'
import { AuthContext } from '../../contexts/authContext/AuthContexts'
import classroomService from '../../services/classroomService'
import AlertDialogComponent from '../AlertDialogComponent'

const CardClass = ({ classroom }) => {
   const toast = useToast()
   const [showDeleted, setShowDeleted] = useState(false)
   const { userState } = useContext(AuthContext)
   const [isLoading, setIsLoading] = useState(false)
   const { isOpen, onOpen, onClose } = useDisclosure()

   const handleConfirm = async () => {
      setIsLoading(true)
      try {
         await classroomService.delete(classroom._id)
         setIsLoading(false)
         onClose()
         setShowDeleted(false)
         mutate(`/api/classrooms?teacher=${userState._id}`)
         toast({
            title: 'Berhasil',
            description: 'kelas berhasil dihapus',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         setIsLoading(false)

         toast({
            title: 'Gagal',
            description: 'kelas gagal dihapus',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      }
   }

   const handleOnClose = () => {
      onClose()

      setShowDeleted(false)
   }
   return (
      <Flex
         onMouseOver={(e) => setShowDeleted(true)}
         onMouseOut={(e) => setShowDeleted(false)}
         minW={['330px', '360px', '380px']}
      >
         <Box display='flex' bg='white' boxShadow='lg' borderRadius='lg'>
            <NavLink
               to={`${localStorage.getItem('goto')}/kelas/${classroom._id}`}
            >
               <Flex direction='column' borderRadius='lg'>
                  <Box
                     bg={classroom.banner}
                     py='20px'
                     px='25px'
                     borderTopLeftRadius='lg'
                     borderTopRightRadius='lg'
                  >
                     <Flex direction='column'>
                        <Text fontWeight='600' fontSize={['sm', 'md', 'lg']}>
                           {classroom.subject}
                        </Text>
                        <Text
                           fontWeight='300'
                           color='textSecondary'
                           fontSize={['xs', 'sm', 'md']}
                        >
                           {classroom.description}
                        </Text>
                     </Flex>
                  </Box>
                  <Box
                     pl='70px'
                     py='20px'
                     px='25px'
                     display='flex'
                     alignItems='flex-start'
                     gridGap='7'
                     minW={['330px', '360px', '380px']}
                  >
                     <Avatar
                        name={classroom?.teacher?.name}
                        src={classroom?.teacher?.photo}
                        size='lg'
                     />
                     <VStack spacing={3} alignItems='flex-start'>
                        <Text fontWeight='600' fontSize={['sm', 'md', 'lg']}>
                           {classroom?.teacher?.name}
                        </Text>
                        <HStack>
                           <HStack spacing={2} alignItems='center'>
                              <MdDateRange size='24px' />
                              <Text
                                 fontWeight='300'
                                 color='textSecondary'
                                 fontSize={['xs', 'sm', 'md']}
                              >
                                 {classroom.day_schedule}
                              </Text>

                              <Text
                                 fontWeight='300'
                                 color='textSecondary'
                                 fontSize={['xs', 'sm', 'md']}
                              >
                                 {`${classroom.from} - ${classroom.to}`} WIB
                              </Text>
                           </HStack>
                        </HStack>
                        <HStack spacing={2} alignItems='center'>
                           <MdSchool size='24px' />
                           <Text
                              fontWeight='300'
                              color='textSecondary'
                              fontSize={['xs', 'sm', 'md']}
                           >
                              {classroom.school_year}
                           </Text>
                        </HStack>
                        <HStack spacing={2} alignItems='center'>
                           <MdPeople size='24px' />
                           <Text
                              fontWeight='300'
                              color='textSecondary'
                              fontSize={['xs', 'sm', 'md']}
                           >
                              {classroom.members.length} Orang
                           </Text>
                        </HStack>
                        <HStack spacing={2} alignItems='center'>
                           <MdCode size='24px' />
                           <Text
                              fontWeight='300'
                              color='textSecondary'
                              fontSize={['xs', 'sm', 'md']}
                           >
                              {classroom.code}
                           </Text>
                        </HStack>

                        <Badge colorScheme='green' px={4} py={1}>
                           {classroom.status}
                        </Badge>
                     </VStack>
                  </Box>
               </Flex>
            </NavLink>
         </Box>
         {userState?.role === 'teacher' && (
            <>
               <Box
                  display={showDeleted ? 'inline' : 'none'}
                  alignSelf='center'
                  h='max-content'
               >
                  <Button
                     alignSelf='flex-start'
                     justifySelf='flex-start'
                     ml='-25px'
                     variant='solid'
                     colorScheme='red'
                     transform='rotate(90deg)'
                     onClick={onOpen}
                  >
                     Deleted
                  </Button>
               </Box>

               <AlertDialogComponent
                  header='Hapus classroom'
                  body='apakah anda yakin?'
                  handleConfirm={handleConfirm}
                  isOpen={isOpen}
                  onClose={handleOnClose}
                  isLoading={isLoading}
               />
            </>
         )}
      </Flex>
   )
}

export default CardClass
