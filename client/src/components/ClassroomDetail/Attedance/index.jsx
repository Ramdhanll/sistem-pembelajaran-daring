import {
   Box,
   Button,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   useDisclosure,
   useToast,
   VStack,
   FormControl,
   FormLabel,
   Input,
   FormHelperText,
   Drawer,
   DrawerBody,
   DrawerCloseButton,
   DrawerContent,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   Text,
   Badge,
   Link,
   Image,
   Flex,
   HStack,
   Avatar,
   Divider,
} from '@chakra-ui/react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import CardAttedance from '../../../components/CardAttedance'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../../Formik/FormikControl'

import { ClassroomContext } from '../../../contexts/classroomContext/classroomContext'
import AttedanceService from '../../../services/AttedanceService'
import useSWR, { mutate } from 'swr'
import ReactPlayer from 'react-player'
import { AuthContext } from '../../../contexts/authContext/AuthContexts'

const Attedance = () => {
   const toast = useToast()
   const { isOpen, onOpen, onClose } = useDisclosure()
   const {
      isOpen: isOpenDrawerDetail,
      onOpen: onOpenDrawerDetail,
      onClose: onCloseDrawerDetail,
   } = useDisclosure()
   const [attedanceSelected, setAttedanceSelected] = useState({})

   const { userState } = useContext(AuthContext)
   const { classroomState, classroomDispatch } = useContext(ClassroomContext)

   const { data, error } = useSWR(`/api/attedances/${classroomState?._id}`)

   // SECTION Drawer detail
   const [attend, setattend] = useState('')
   const [presents, setPresents] = useState([])
   const [missings, setMissings] = useState([])
   const [permits, setPermits] = useState([])
   const [sicks, setSicks] = useState([])

   const handleOpenDrawerDetail = (attedance) => {
      setAttedanceSelected(attedance)

      attedance.attedances.map((item) => {
         if (item.attedance === 'present') {
            setPresents((presents) => [...presents, item])
         } else if (item.attedance === 'sick') {
            setSicks((sicks) => [...sicks, item])
         } else if (item.attedance === 'missing') {
            setMissings((missings) => [...missings, item])
         } else if (item.attedance === 'permit') {
            setPermits((permits) => [...permits, item])
         }
      })
      onOpenDrawerDetail()
   }

   console.log(attedanceSelected)

   useEffect(() => {
      const exist = attedanceSelected?.attedances?.find(
         (item) => item.student?._id === userState._id
      )
      if (exist) setattend(exist.attedance)
   }, [attedanceSelected])

   // SECTION Formik Teacher
   const [isAdd, setIsAdd] = useState(true)

   const validationSchema = Yup.object({
      title: Yup.string().required('Judul diperlukan'),
      due: Yup.date().required('Batas akhir diperlukan'),
   })

   const handleOpenModalFormik = (isAdd) => {
      setIsAdd(isAdd)
      onOpen()
   }

   const handleSubmit = async (values, actions) => {
      actions.setSubmitting(false)

      const reqData = {
         ...values,
         classroom: JSON.stringify(classroomState._id),
      }

      try {
         if (isAdd) {
            await AttedanceService.create(reqData)
         } else {
            await AttedanceService.update(attedanceSelected._id, reqData)
         }

         mutate(`/api/attedances/${classroomState?._id}`)
         onClose()
         setAttedanceSelected({})
         toast({
            title: 'Berhasil',
            description: `berhasil ${
               isAdd ? 'menambahkan' : 'merubah'
            } attedance`,
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         toast({
            title: 'Gagal',
            description: `gagal ${isAdd ? 'menambahkan' : 'merubah'} attedance`,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      }
   }

   // SECTION Formik Edit Teacher
   const handleOpenModalEdit = (attedance) => {
      setIsAdd(false)
      setAttedanceSelected(attedance)
      onOpen()
   }

   // SECTION Formik Student
   const validationSchemaStudent = Yup.object({
      attedance: Yup.string().required('Kehadiran diperlukan'),
   })

   const handleSubmitStudent = async (values, actions) => {
      try {
         let attedances = {
            student: userState._id,
            attedance: values.attedance,
         }

         await AttedanceService.submittedAttend(
            attedanceSelected._id,
            attedances
         )
         mutate(`/api/attedances/${classroomState?._id}`)
         onCloseDrawerDetail()
         actions.setSubmitting(false)
         toast({
            title: 'Berhasil',
            description: 'berhasil submit kehadiran',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         console.log(error.response)
         actions.setSubmitting(false)
         toast({
            title: 'Gagal',
            description: error.response.data.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      }
   }

   const handleDisabledFromDue = (due) => {
      const dueTime = new Date(due)
      const now = new Date()

      if (now - dueTime < 0) {
         return false
      } else {
         return true
      }
   }

   const RenderAttedanceStudent = () => (
      <Box>
         <Formik
            initialValues={{
               attedance: attend || '',
            }}
            onSubmit={handleSubmitStudent}
            validationSchema={validationSchemaStudent}
            enableReinitialize
         >
            {(props) => (
               <Form>
                  <FormikControl
                     disabled={handleDisabledFromDue(attedanceSelected.due)}
                     control='radio'
                     name='attedance'
                     label='Pilih kehadiran anda'
                     options={[
                        { key: 1, name: 'Hadir', value: 'present' },
                        { key: 2, name: 'Sakit', value: 'sick' },
                        { key: 3, name: 'Izin', value: 'permit' },
                        { key: 4, name: 'Tanpa keterangan', value: 'missing' },
                     ]}
                     flexDirection='column'
                     gridGap='5px'
                  />

                  <Button
                     mt='20px'
                     variant='solid'
                     bg='primary'
                     color='white'
                     type='submit'
                     isLoading={props.isSubmitting}
                     disabled={handleDisabledFromDue(attedanceSelected.due)}
                  >
                     Submit
                  </Button>
               </Form>
            )}
         </Formik>
      </Box>
   )

   // SECTION TEACHER
   const [isLoadingTeacher, setIsLoadingTeacher] = useState(false)

   const handleEndAttedance = async () => {
      setIsLoadingTeacher(true)

      try {
         await AttedanceService.endAttend(attedanceSelected._id)
         setAttedanceSelected({})
         mutate(`/api/attedances/${classroomState?._id}`)
         setIsLoadingTeacher(false)
         setPresents([])
         setPermits([])
         setMissings([])
         setSicks([])
         toast({
            title: 'Berhasil',
            description: 'berhasil akhiri absensi',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         setIsLoadingTeacher(false)
         toast({
            title: 'Gagal',
            description: 'gagal akhiri absensi',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      }
   }

   const RenderAttedanceTeacher = () => (
      <Box>
         <VStack spacing={4} alignItems='self-start'>
            <VStack spacing={3} alignItems='flex-start'>
               <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight='600'>
                  Diserahkan {attedanceSelected?.attedances?.length} dari{' '}
                  {classroomState?.members?.length} orang
               </Text>
               <Button
                  variant='solid'
                  bg='primary'
                  color='white'
                  size='sm'
                  onClick={handleEndAttedance}
                  isLoading={isLoadingTeacher}
               >
                  Akhiri Absensi
               </Button>
            </VStack>
            <Divider />
            {/* Presents */}
            <Box>
               <Text fontSize={['sm', 'md', 'lg', 'xl']} mb='20px'>
                  Hadir
               </Text>
               <VStack spacing={5} alignItems='flex-start'>
                  {presents?.length ? (
                     presents?.map((item, i) => (
                        <HStack spacing={3} key={i}>
                           <Avatar
                              name={item.student.name}
                              src={item.student.photo}
                           />
                           <Text>{item.student.name}</Text>
                        </HStack>
                     ))
                  ) : (
                     <Badge colorScheme='yellow' variant='solid'>
                        Data tidak ada
                     </Badge>
                  )}
               </VStack>
            </Box>
            {/* Permits */}
            <Box>
               <Text fontSize={['sm', 'md', 'lg', 'xl']} mb='20px'>
                  Izin
               </Text>
               <VStack spacing={5} alignItems='flex-start'>
                  {permits?.length ? (
                     permits?.map((item, i) => (
                        <HStack spacing={3} key={i}>
                           <Avatar
                              name={item.student.name}
                              src={item.student.photo}
                           />
                           <Text>{item.student.name}</Text>
                        </HStack>
                     ))
                  ) : (
                     <Badge colorScheme='yellow' variant='solid'>
                        Data tidak ada
                     </Badge>
                  )}
               </VStack>
            </Box>
            {/* Sicks */}
            <Box>
               <Text fontSize={['sm', 'md', 'lg', 'xl']} mb='20px'>
                  Sakit
               </Text>
               <VStack spacing={5} alignItems='flex-start'>
                  {sicks?.length ? (
                     sicks?.map((item, i) => (
                        <HStack spacing={3} key={i}>
                           <Avatar
                              name={item.student.name}
                              src={item.student.photo}
                           />
                           <Text>{item.student.name}</Text>
                        </HStack>
                     ))
                  ) : (
                     <Badge colorScheme='yellow' variant='solid'>
                        Data tidak ada
                     </Badge>
                  )}
               </VStack>
            </Box>
            {/* Missings */}
            <Box>
               <Text fontSize={['sm', 'md', 'lg', 'xl']} mb='20px'>
                  Tanpa keterangan
               </Text>
               <VStack spacing={5} alignItems='flex-start'>
                  {missings?.length ? (
                     missings?.map((item, i) => (
                        <HStack spacing={3} key={i}>
                           <Avatar
                              name={item.student.name}
                              src={item.student.photo}
                           />
                           <Text>{item.student.name}</Text>
                        </HStack>
                     ))
                  ) : (
                     <Badge colorScheme='yellow' variant='solid'>
                        Data tidak ada
                     </Badge>
                  )}
               </VStack>
            </Box>
         </VStack>
      </Box>
   )
   return (
      <Box>
         {userState.role === 'teacher' && (
            <Button
               variant='solid'
               bg='primary'
               color='white'
               mb='20px'
               onClick={() => handleOpenModalFormik(true)}
            >
               Tambah
            </Button>
         )}

         <VStack spacing={5} alignItems='flex-start'>
            {data?.attedances?.length ? (
               data?.attedances.map((attedance, i) => (
                  <CardAttedance
                     key={i}
                     attedance={attedance}
                     handleOpenDrawerDetail={handleOpenDrawerDetail}
                     handleOpenModalEdit={handleOpenModalEdit}
                  />
               ))
            ) : (
               <Badge px={50} py={3} colorScheme='yellow'>
                  Absen belum tersedia
               </Badge>
            )}
         </VStack>
         {/* Modal add and edit */}
         <Modal
            isOpen={isOpen}
            onClose={onClose}
            onOverlayClick={() => setAttedanceSelected({})}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Form Absen</ModalHeader>
               <ModalCloseButton _focus={{ outline: 'none' }} />
               <ModalBody>
                  <Formik
                     initialValues={{
                        title: attedanceSelected?.title || '',
                        due: attedanceSelected?.due
                           ? attedanceSelected?.due?.substring(0, 16)
                           : '',
                     }}
                     validationSchema={validationSchema}
                     onSubmit={handleSubmit}
                     enableReinitialize
                  >
                     {(props) => (
                        <Form>
                           <VStack spacing={4}>
                              <FormikControl
                                 control='input'
                                 name='title'
                                 label='Judul'
                                 placeholder='e.g Pertemuan 1'
                              />

                              <FormikControl
                                 control='input'
                                 type='datetime-local'
                                 name='due'
                                 label='Batas akhir'
                              />

                              <Button
                                 variant='solid'
                                 bg='primary'
                                 color='white'
                                 type='submit'
                                 alignSelf='flex-end'
                                 isLoading={props.isSubmitting}
                              >
                                 Submit
                              </Button>
                           </VStack>
                        </Form>
                     )}
                  </Formik>
               </ModalBody>
            </ModalContent>
         </Modal>

         {/* Drawer Detail Attedance */}
         <Drawer
            isOpen={isOpenDrawerDetail}
            placement='right'
            onClose={onCloseDrawerDetail}
            size='lg'
            onOverlayClick={() => {
               setAttedanceSelected({})
               setattend('')
               setPresents([])
               setPermits([])
               setMissings([])
               setSicks([])
            }}
         >
            <DrawerOverlay />
            <DrawerContent>
               <DrawerCloseButton _focus={{ outline: 'none' }} />
               <DrawerHeader>
                  <Text fontSize={['lg', 'xl', '2xl']} fontWeight='600'>
                     {attedanceSelected?.title}
                  </Text>
                  <Flex justifyContent='space-between'>
                     <Text color='textSecondary' fontSize={['sm', 'md', 'lg']}>
                        {new Date(
                           attedanceSelected?.createdAt
                        ).toLocaleDateString('id', {
                           weekday: 'long',
                           year: 'numeric',
                           month: '2-digit',
                           day: 'numeric',
                           hour: '2-digit',
                           minute: '2-digit',
                        })}
                     </Text>
                     <Flex
                        alignItems='center'
                        gridGap='5px'
                        color='red'
                        fontSize={['sm']}
                     >
                        <Text>Batas akhir</Text>
                        <Text color='red' fontSize={['sm']}>
                           {new Date(attedanceSelected?.due).toLocaleDateString(
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
                     </Flex>
                  </Flex>
               </DrawerHeader>

               <DrawerBody>
                  {userState.role === 'student' ? (
                     <RenderAttedanceStudent />
                  ) : (
                     userState.role === 'teacher' && <RenderAttedanceTeacher />
                  )}
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </Box>
   )
}

export default Attedance
