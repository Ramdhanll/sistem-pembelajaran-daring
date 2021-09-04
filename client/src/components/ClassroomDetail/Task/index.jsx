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
} from '@chakra-ui/react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import CardTask from '../../CardTask'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../../Formik/FormikControl'

import { ClassroomContext } from '../../../contexts/classroomContext/classroomContext'
import TaskService from '../../../services/TaskService'
import useSWR, { mutate } from 'swr'
import ReactPlayer from 'react-player'
import { AuthContext } from '../../../contexts/authContext/AuthContexts'

const Task = () => {
   const toast = useToast()
   const { isOpen, onOpen, onClose } = useDisclosure()
   const {
      isOpen: isOpenDrawerDetail,
      onOpen: onOpenDrawerDetail,
      onClose: onCloseDrawerDetail,
   } = useDisclosure()
   const [taskSelected, setTaskSelected] = useState({})

   const { userState } = useContext(AuthContext)
   const { classroomState, classroomDispatch } = useContext(ClassroomContext)

   const { data, error } = useSWR(`/api/tasks/${classroomState?._id}`)

   // SECTION Drawer detail
   const [attend, setattend] = useState('')
   const [presents, setPresents] = useState([])
   const [missings, setMissings] = useState([])
   const [permits, setPermits] = useState([])
   const [sicks, setSicks] = useState([])

   const handleOpenDrawerDetail = (task) => {
      setTaskSelected(task)

      task.tasks.map((item) => {
         if (item.task === 'present') {
            setPresents((presents) => [...presents, item])
         } else if (item.task === 'sick') {
            setSicks((sicks) => [...sicks, item])
         } else if (item.task === 'missing') {
            setMissings((missings) => [...missings, item])
         } else if (item.task === 'permit') {
            setPermits((permits) => [...permits, item])
         }
      })
      onOpenDrawerDetail()
   }

   useEffect(() => {
      const exist = taskSelected?.tasks?.find(
         (item) => item.student?._id === userState._id
      )
      if (exist) setattend(exist.task)
   }, [taskSelected])

   // SECTION Formik Teacher
   const [documentUpload, setDocumentUpload] = useState(null)
   const documentRef = useRef(null)
   const [isAdd, setIsAdd] = useState(true)

   const validationSchema = Yup.object({
      title: Yup.string().required('Judul diperlukan'),
      body: Yup.string().required('Body diperlukan'),
      due: Yup.date().required('Batas akhir diperlukan'),
   })

   const handleOpenModalFormik = (isAdd) => {
      setIsAdd(isAdd)
      onOpen()
   }

   const handleUploadDocument = (e) => {
      const file = e.target.files[0]
      const extension = file.name.slice(file.name.indexOf('.') + 1)

      if (extension !== 'pdf') {
         documentRef.current.value = ''
         return toast({
            title: 'Gagal upload',
            description: 'File harus berupa PDF',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      }
      if (file?.size > 5_000_000) {
         documentRef.current.value = ''

         return toast({
            title: 'Gagal upload',
            description: 'File lebih dari 5mb',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } else {
         return setDocumentUpload(file)
      }
   }

   const handleSubmit = async (values, actions) => {
      actions.setSubmitting(false)

      const reqData = new FormData()
      reqData.append('classroom', JSON.stringify(classroomState._id))
      reqData.append('title', values.title)
      reqData.append('body', values.body)
      reqData.append('document', documentUpload)
      reqData.append('due', values.due)

      try {
         if (isAdd) {
            await TaskService.create(reqData)
         } else {
            await TaskService.update(taskSelected._id, reqData)
         }
         documentRef.current.value = ''

         setDocumentUpload(null)
         mutate(`/api/tasks/${classroomState?._id}`)
         onClose()
         setTaskSelected({})
         toast({
            title: 'Berhasil',
            description: `berhasil ${isAdd ? 'menambahkan' : 'merubah'} task`,
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         toast({
            title: 'Gagal',
            description: `gagal ${isAdd ? 'menambahkan' : 'merubah'} task`,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      }
   }

   // SECTION Formik Edit Teacher
   const handleOpenModalEdit = (task) => {
      setIsAdd(false)
      setTaskSelected(task)
      onOpen()
   }

   // SECTION Formik Student
   const validationSchemaStudent = Yup.object({
      task: Yup.string().required('Kehadiran diperlukan'),
   })

   const handleSubmitStudent = async (values, actions) => {
      try {
         let tasks = {
            student: userState._id,
            task: values.task,
         }

         await TaskService.update(taskSelected._id, tasks)
         mutate(`/api/tasks/${classroomState?._id}`)
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
         actions.setSubmitting(false)
         toast({
            title: 'Gagal',
            description: error.response.data.error,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      }
   }

   const RenderTaskStudent = () => (
      <Box>
         <Formik
            initialValues={{
               task: attend || '',
            }}
            onSubmit={handleSubmitStudent}
            validationSchema={validationSchemaStudent}
            enableReinitialize
         >
            {(props) => (
               <Form>
                  <FormikControl
                     disabled={attend !== '' && true}
                     control='radio'
                     name='task'
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
                     isDisabled={attend !== '' && true}
                  >
                     Submit
                  </Button>
               </Form>
            )}
         </Formik>
      </Box>
   )

   // SECTION TEACHER
   const RenderTaskTeacher = () => (
      <Box>
         <VStack spacing={4} alignItems='self-start'>
            <Box dangerouslySetInnerHTML={{ __html: taskSelected?.body }} />

            {taskSelected.document && (
               <VStack spacing={4} alignItems='flex-start' mt='20px'>
                  <Badge variant='subtle' colorScheme='green'>
                     Lampiran
                  </Badge>
                  <Link href={taskSelected?.document} isExternal>
                     <Image
                        w='70px'
                        h='70px'
                        src={'http://localhost:5000/uploads/pdf-icon.png'}
                     />
                     click me
                  </Link>
               </VStack>
            )}
         </VStack>
      </Box>
   )

   const handleDisabledFromDue = (due) => {
      const dueTime = new Date(due)
      const now = new Date()

      if (now - dueTime < 0) {
         return false
      } else {
         return true
      }
   }

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
            {data?.tasks?.length ? (
               data?.tasks.map((task, i) => (
                  <CardTask
                     key={i}
                     task={task}
                     handleOpenDrawerDetail={handleOpenDrawerDetail}
                     handleOpenModalEdit={handleOpenModalEdit}
                  />
               ))
            ) : (
               <Badge px={50} py={3} colorScheme='yellow'>
                  Tugas belum tersedia
               </Badge>
            )}
         </VStack>
         {/* Modal add and edit */}
         <Modal
            isOpen={isOpen}
            onClose={onClose}
            onOverlayClick={() => setTaskSelected({})}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Form Tugas</ModalHeader>
               <ModalCloseButton _focus={{ outline: 'none' }} />
               <ModalBody>
                  <Formik
                     initialValues={{
                        title: taskSelected?.title || '',
                        body: taskSelected?.body || '',
                        due: taskSelected?.due
                           ? taskSelected?.due?.substring(0, 16)
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
                                 control='textEditor'
                                 name='body'
                                 label='Body'
                                 body={props.values?.body}
                              />

                              <FormControl id='document'>
                                 <FormLabel>Document</FormLabel>
                                 <Input
                                    type='file'
                                    onChange={(e) => handleUploadDocument(e)}
                                    ref={documentRef}
                                 />
                                 <FormHelperText>PDF only.</FormHelperText>
                              </FormControl>

                              <FormikControl
                                 control='input'
                                 type='datetime-local'
                                 name='due'
                                 label='Batas akhir'
                                 disabled={!isAdd}
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

         {/* Drawer Detail Task */}
         <Drawer
            isOpen={isOpenDrawerDetail}
            placement='right'
            onClose={onCloseDrawerDetail}
            size='lg'
            onOverlayClick={() => {
               setTaskSelected({})
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
                     {taskSelected?.title}
                  </Text>
                  <Flex justifyContent='space-between'>
                     <Text color='textSecondary' fontSize={['sm', 'md', 'lg']}>
                        {new Date(taskSelected?.createdAt).toLocaleDateString(
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
                           {new Date(taskSelected?.due).toLocaleDateString(
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
                     <RenderTaskStudent />
                  ) : (
                     userState.role === 'teacher' && <RenderTaskTeacher />
                  )}
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </Box>
   )
}

export default Task
