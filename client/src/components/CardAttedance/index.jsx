import {
   Box,
   Button,
   Flex,
   Text,
   useDisclosure,
   useToast,
} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { MdDelete, MdEdit, MdLibraryBooks } from 'react-icons/md'
import { mutate } from 'swr'
import { AuthContext } from '../../contexts/authContext/AuthContexts'
import { ClassroomContext } from '../../contexts/classroomContext/classroomContext'
import AttedanceService from '../../services/AttedanceService'
import AlertDialogComponent from '../AlertDialogComponent'

const CardAttedance = ({
   attedance,
   handleOpenDrawerDetail,
   handleOpenModalEdit,
}) => {
   const toast = useToast()
   const { isOpen, onOpen, onClose } = useDisclosure()
   const [showDeleted, setShowDeleted] = useState(false)
   const { userState } = useContext(AuthContext)
   const [isLoading, setIsLoading] = useState(false)
   const { classroomState } = useContext(ClassroomContext)

   const handleConfirm = async () => {
      setIsLoading(true)
      try {
         await AttedanceService.deleteAttedance(attedance._id)
         setIsLoading(false)
         onClose()
         setShowDeleted(false)
         mutate(`/api/attedances/${classroomState?._id}`)
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
      <Box w='100%'>
         <Flex
            onMouseOver={(e) => setShowDeleted(true)}
            onMouseOut={(e) => setShowDeleted(false)}
            gridGap='10px'
            minH='85px'
         >
            <Box
               as='button'
               _hover={{
                  backgroundColor: '#ebf5ed',
               }}
               _active={{
                  backgroundColor: '#e6ede7',
               }}
               onClick={() => handleOpenDrawerDetail(attedance)}
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
                     {attedance?.title?.length > 45
                        ? `${attedance?.title.substring(0, 45)}...`
                        : attedance?.title}
                  </Text>
                  <Flex justifyContent='space-between'>
                     <Text color='textSecondary' fontSize={['sm', 'md', 'lg']}>
                        {new Date(attedance?.createdAt).toLocaleDateString(
                           'id',
                           {
                              weekday: 'long',
                              year: 'numeric',
                              month: '2-digit',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                           }
                        )}
                     </Text>
                     <Flex
                        alignItems='center'
                        gridGap='5px'
                        color='red'
                        fontSize={['sm']}
                     >
                        <Text>Batas akhir</Text>
                        <Text color='red' fontSize={['sm']}>
                           {new Date(attedance?.due).toLocaleDateString('id', {
                              weekday: 'long',
                              year: 'numeric',
                              month: '2-digit',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                           })}
                        </Text>
                     </Flex>
                  </Flex>
               </Box>
            </Box>
            {userState?.role === 'teacher' && (
               <>
                  <Box
                     display={showDeleted ? 'flex' : 'none'}
                     flexDirection='column'
                     gridGap='5px'
                  >
                     <Button
                        variant='solid'
                        colorScheme='yellow'
                        onClick={() => handleOpenModalEdit(attedance)}
                     >
                        <MdEdit size='24px' />
                     </Button>
                     <Button variant='solid' colorScheme='red' onClick={onOpen}>
                        <MdDelete size='24px' />
                     </Button>
                  </Box>

                  <AlertDialogComponent
                     header='Hapus Absen'
                     body='apakah anda yakin?'
                     handleConfirm={handleConfirm}
                     isOpen={isOpen}
                     onClose={handleOnClose}
                     isLoading={isLoading}
                  />
               </>
            )}
         </Flex>
      </Box>
   )
}

export default CardAttedance
