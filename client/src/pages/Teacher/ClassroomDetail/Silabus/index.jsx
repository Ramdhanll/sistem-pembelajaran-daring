import {
   Badge,
   Box,
   Button,
   Flex,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Text,
   useDisclosure,
   useToast,
   VStack,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React, { useContext } from 'react'
import { MdEdit } from 'react-icons/md'
import { mutate } from 'swr'
import { ClassroomContext } from '../../../../contexts/classroomContext/classroomContext'
import FormikControl from '../../../../Formik/FormikControl'
import classroomService from '../../../../services/classroomService'

const Silabus = () => {
   const toast = useToast()
   const { isOpen, onOpen, onClose } = useDisclosure()
   const { classroomState, classroomDispatch } = useContext(ClassroomContext)
   console.log(classroomState)
   // SECTION Formik
   const handleSubmit = async (values, actions) => {
      try {
         const res = await classroomService.update(
            classroomState._id,
            values,
            classroomDispatch
         )
         actions.setSubmitting(false)
         onClose()
         mutate(`/api/classrooms/${classroomState._id}`)
         toast({
            title: 'Berhasil',
            description: 'berhasil ubah silabus',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
         console.log(res)
      } catch (error) {
         actions.setSubmitting(false)

         toast({
            title: 'Gagal',
            description: 'gagal ubah silabus',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      }
   }
   return (
      <Box>
         {/* Description Mata Pelajaran */}
         <Box>
            <Flex justifyContent='space-between' alignItems='center'>
               <Text fontWeight='600' fontSize={['md', 'lg', 'xl', '2xl']}>
                  Deskripsi Mata Pelajaran
               </Text>
               <Button variant='solid' colorScheme='yellow' onClick={onOpen}>
                  <MdEdit size='20px' />
               </Button>
            </Flex>
            <Text
               fontSize={['sm', 'md', 'lg', 'xl']}
               fontWeight='100'
               mt={['5px', '10px']}
               textAlign='justify'
            >
               {classroomState?.syllabus ? (
                  <Box
                     ml='20px'
                     dangerouslySetInnerHTML={{
                        __html: classroomState?.syllabus,
                     }}
                  />
               ) : (
                  <Badge colorScheme='yellow' px='30px' py='10px'>
                     {' '}
                     Belum tersedia
                  </Badge>
               )}
            </Text>
         </Box>

         {/* Bobot dan Penilaian */}
         {/* <Box mt={['25px', '50px']}>
            <Text fontWeight='600' fontSize={['md', 'lg', 'xl', '2xl']}>
               Penilaian dan Bobot
            </Text>
         </Box> */}

         {/* Modal add or edit syllabus */}
         <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Edit Silabus</ModalHeader>
               <ModalCloseButton _focus={{ outline: 'none' }} />
               <ModalBody>
                  <Formik
                     initialValues={{
                        syllabus: classroomState?.syllabus || '',
                     }}
                     enableReinitialize
                     onSubmit={handleSubmit}
                  >
                     {(props) => (
                        <Form>
                           <VStack spacing={3}>
                              <FormikControl
                                 control='textEditor'
                                 name='syllabus'
                                 label='Silabus'
                                 body={props.values?.syllabus}
                              />

                              <Button
                                 alignSelf='flex-end'
                                 variant='solid'
                                 bg='primary'
                                 color='white'
                                 type='submit'
                                 isLoading={props.isSubmitting}
                              >
                                 Update
                              </Button>
                           </VStack>
                        </Form>
                     )}
                  </Formik>
               </ModalBody>
            </ModalContent>
         </Modal>
      </Box>
   )
}

export default Silabus
