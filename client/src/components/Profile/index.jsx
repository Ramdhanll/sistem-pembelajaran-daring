import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalCloseButton,
   ModalBody,
   ModalFooter,
   Button,
   Box,
   VStack,
   Text,
   Avatar,
   Table,
   Tbody,
   Tr,
   Th,
   Td,
   Input,
   useToast,
   useDisclosure,
} from '@chakra-ui/react'
import React, { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../contexts/authContext/AuthContexts'
import AdminService from '../../services/AdminService'
import StudentService from '../../services/StudentService'
import TeacherService from '../../services/TeacherService'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../Formik/FormikControl'

const Profile = () => {
   const toast = useToast()
   const { isOpen, onClose, onOpen } = useDisclosure()
   const { userState, userDispatch } = useContext(AuthContext)
   const [isLoading, setIsLoading] = useState(false)
   const [photoPrev, setPhotoPrev] = useState(null)
   const photoRef = useRef()

   const handleClickPhotoRef = () => {
      photoRef.current.click()
   }

   const handlePreviewPhoto = (e) => {
      const file = e.target.files[0]

      let reader = new FileReader()
      reader.onload = () => {
         const src = reader.result
         setPhotoPrev(src)
      }

      reader.readAsDataURL(file)
   }

   const submit = async () => {
      setIsLoading(true)

      const reqData = new FormData()
      reqData.append('photo', photoRef.current.files[0])

      try {
         if (userState.role === 'student') {
            await StudentService.update(userState._id, reqData, userDispatch)
         } else if (userState.role === 'teacher') {
            await TeacherService.update(userState._id, reqData, userDispatch)
         } else if (userState.role === 'admin') {
            await AdminService.update(userState._id, reqData, userDispatch)
         }
         setIsLoading(false)
         setPhotoPrev(null)
         toast({
            title: 'Berhasil',
            description: 'berhasil update photo',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         setIsLoading(false)
         toast({
            title: 'Gagal',
            description: 'gagal update photo',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      }
   }

   const handleSubmitChangePassword = async (values, actions) => {
      actions.setSubmitting(true)

      try {
         if (userState.role === 'student') {
            await StudentService.update(userState._id, {
               password: values.password,
            })
         } else if (userState.role === 'teacher') {
            await TeacherService.update(userState._id, {
               password: values.password,
            })
         } else if (userState.role === 'admin') {
            await AdminService.update(userState._id, {
               password: values.password,
            })
         }
         actions.setSubmitting(false)
         onClose()
         toast({
            title: 'Berhasil',
            description: 'berhasil ganti password',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         toast({
            title: 'Gagal',
            description: 'gagal ganti password',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      }
   }

   // SECTION FORMIK
   const validationScheme = Yup.object({
      password: Yup.string().required('Password diperlukan'),
      c_password: Yup.string().oneOf(
         [Yup.ref('password'), null],
         'Password harus sama'
      ),
   })

   return (
      <Box
         display='flex'
         justifyContent='center'
         pt={['25px', '50px']}
         px={['25px', '100px']}
      >
         <Input
            type='file'
            display='none'
            ref={photoRef}
            onChange={(e) => handlePreviewPhoto(e)}
         />
         <Box
            w='sm'
            boxShadow='lg'
            borderRadius='lg'
            display='flex'
            justifyContent='center'
            alignItems='center'
            bg='#26235C'
            py='30px'
            px='10px'
            flexDirection='column'
            gridGap='20px'
         >
            <Avatar
               size='xl'
               name={userState.name}
               src={photoPrev ? photoPrev : userState?.photo}
               onClick={handleClickPhotoRef}
               cursor='pointer'
            />
            <VStack spacing={1}>
               <Text
                  color='white'
                  fontWeight='600'
                  fontSize={['sm', 'md', 'lg', 'xl']}
               >
                  {userState?.name}
               </Text>
               <Text color='gray.500' fontSize={['xs', 'sm', 'md', 'lg']}>
                  {userState?.role === 'teacher'
                     ? 'Guru'
                     : userState?.role === 'student'
                     ? 'Siswa'
                     : 'Admin'}
               </Text>
            </VStack>
            <Box>
               <Table variant='unstyled'>
                  <Tbody>
                     {userState?.role === 'student' && (
                        <Tr>
                           <Th
                              textAlign='left'
                              w='190px'
                              color='white'
                              fontSize={['xs', 'sm']}
                           >
                              NIS
                           </Th>
                           <Td color='gray.500' fontSize={['xs', 'sm']}>
                              {userState.nis}
                           </Td>
                        </Tr>
                     )}
                     <Tr>
                        <Th w='190px' color='white' fontSize={['xs', 'sm']}>
                           Jenis kelamin
                        </Th>
                        <Td color='gray.500' fontSize={['xs', 'sm']}>
                           {userState?.gender === 'L'
                              ? 'Laki-laki'
                              : 'Perempuan'}
                        </Td>
                     </Tr>
                     {userState?.role === 'student' && (
                        <Tr>
                           <Th w='190px' color='white' fontSize={['xs', 'sm']}>
                              Tahun masuk
                           </Th>
                           <Td color='gray.500' fontSize={['xs', 'sm']}>
                              {userState.year_of_entry}
                           </Td>
                        </Tr>
                     )}
                     <Tr>
                        <Th w='190px' color='white' fontSize={['xs', 'sm']}>
                           Email
                        </Th>
                        <Td color='gray.500' fontSize={['xs', 'sm']}>
                           {userState.email}
                        </Td>
                     </Tr>
                  </Tbody>
               </Table>
            </Box>
            <Button
               variant='solid'
               colorScheme='yellow'
               alignSelf='center'
               onClick={submit}
               isDisabled={!photoPrev}
               isLoading={isLoading}
            >
               Update Photo
            </Button>
            <Button
               variant='link'
               colorScheme='teal'
               size='sm'
               onClick={onOpen}
            >
               Ganti password
            </Button>
         </Box>

         {/* Modal add */}
         <Modal isOpen={isOpen} onClose={onClose} size='sm'>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Ganti password</ModalHeader>
               <ModalCloseButton _focus={{ outline: 'none' }} />
               <ModalBody>
                  <Formik
                     initialValues={{
                        password: '',
                        c_password: '',
                     }}
                     onSubmit={handleSubmitChangePassword}
                     validationSchema={validationScheme}
                  >
                     {(props) => (
                        <Form>
                           <VStack spacing={3}>
                              <FormikControl
                                 control='password'
                                 name='password'
                                 label='Password'
                              />
                              <FormikControl
                                 control='password'
                                 name='c_password'
                                 label='Konfirmasi Password'
                              />
                           </VStack>
                           <Button
                              variant='solid'
                              bg='primary'
                              color='white'
                              alignSelf='flex-end'
                              size='sm'
                              mt='20px'
                              float='right'
                              type='submit'
                              isLoading={props.isSubmitting}
                           >
                              Change Password
                           </Button>
                        </Form>
                     )}
                  </Formik>
               </ModalBody>
               <ModalFooter pb='0px'></ModalFooter>
            </ModalContent>
         </Modal>
      </Box>
   )
}

export default Profile
