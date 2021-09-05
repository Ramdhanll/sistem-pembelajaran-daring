import {
   Box,
   Button,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
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
   Table,
   TableCaption,
   Thead,
   Tbody,
   Td,
   Th,
   Tr,
} from '@chakra-ui/react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import CardTask from '../../CardTask'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../../Formik/FormikControl'

import { ClassroomContext } from '../../../contexts/classroomContext/classroomContext'
import TaskService from '../../../services/TaskService'
import useSWR, { mutate } from 'swr'
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
   const [myTask, setMyTask] = useState({})

   const handleOpenDrawerDetail = (task) => {
      setTaskSelected(task)

      onOpenDrawerDetail()
   }

   useEffect(() => {
      const exist = taskSelected?.tasks?.find(
         (item) => item.student?._id === userState._id
      )
      if (exist) setMyTask(exist)
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
   const answerRef = useRef(null)
   const [answerUpload, setAnswerUpload] = useState(null)
   const [isLoadingAnswer, setIsLoadingAnswer] = useState(false)
   const [isLoadingUpdateScore, setIsLoadingUpdateScore] = useState(false)

   const handleUploadAnswer = (e) => {
      const file = e.target.files[0]
      const extension = file.name.slice(file.name.indexOf('.') + 1)

      if (extension !== 'pdf') {
         answerRef.current.value = ''
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
         // answerRef.current.value = ''

         return toast({
            title: 'Gagal upload',
            description: 'File lebih dari 5mb',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } else {
         setAnswerUpload(file)
      }
   }

   const handleSubmitAnswer = async () => {
      setIsLoadingAnswer(true)

      if (!answerUpload) {
         setIsLoadingAnswer(false)

         return toast({
            title: 'Gagal submit jawaban',
            description: 'File masih kosong',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      }

      try {
         const reqData = new FormData()

         reqData.append('student', JSON.stringify(userState._id))
         reqData.append('answer', answerUpload)

         await TaskService.submittedTask(taskSelected._id, reqData)
         mutate(`/api/tasks/${classroomState?._id}`)
         setIsLoadingAnswer(false)
         setAnswerUpload(null)
         onCloseDrawerDetail()
         answerRef.current.value = ''
         toast({
            title: 'Berhasil',
            description: 'berhasil submit tugas',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         setIsLoadingAnswer(false)
         toast({
            title: 'Gagal',
            description: 'gagal submit tugas',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      }

      setIsLoadingAnswer(false)
   }

   const handleChangeScores = async (student, score) => {
      const scoresUpdate = taskSelected.tasks.map((item) => {
         if (item.student._id === student) {
            item.score = score
         }

         return item
      })

      const changeTask = taskSelected
      changeTask.tasks = scoresUpdate

      setTaskSelected(changeTask)
   }

   const RenderTaskStudent = () => (
      <Box>
         <VStack spacing={4} alignItems='self-start'>
            <Box
               ml='20px'
               dangerouslySetInnerHTML={{ __html: taskSelected?.body }}
            />

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
         <Divider h='8px' />
         <Box py='10px'>
            <VStack alignItems='flex-start' spacing={3} mb='10px'>
               <Badge
                  colorScheme={Object.keys(myTask).length ? 'green' : 'yellow'}
                  fontWeight='600'
               >
                  {Object.keys(myTask).length
                     ? 'Diserahkan'
                     : 'Belum diserahkan'}
               </Badge>
               {!Object.keys(myTask).length ? (
                  <>
                     <FormControl id='answer'>
                        <FormLabel>answer</FormLabel>
                        <Input
                           type='file'
                           onChange={(e) => handleUploadAnswer(e)}
                           ref={answerRef}
                        />
                        <FormHelperText>PDF only.</FormHelperText>
                     </FormControl>
                     {answerUpload && (
                        <HStack spacing={3}>
                           <Image
                              w='25px'
                              h='25px'
                              src={'http://localhost:5000/uploads/pdf-icon.png'}
                           />
                           <Text>{answerUpload.name}</Text>
                        </HStack>
                     )}
                     <Button
                        variant='solid'
                        bg='primary'
                        color='white'
                        size='sm'
                        onClick={handleSubmitAnswer}
                        isLoading={isLoadingAnswer}
                     >
                        Kirim Jawaban
                     </Button>
                  </>
               ) : (
                  <VStack spacing={3}>
                     <Table variant='simple'>
                        <Thead>
                           <Tr>
                              <Th>Jawaban</Th>
                              <Th>Nilai</Th>
                           </Tr>
                        </Thead>
                        <Tbody>
                           <Tr>
                              <Td>
                                 {myTask.answer ? (
                                    <Link href={myTask?.answer} isExternal>
                                       <Image
                                          w='25px'
                                          h='25px'
                                          src={
                                             'http://localhost:5000/uploads/pdf-icon.png'
                                          }
                                       />
                                    </Link>
                                 ) : (
                                    <Text>Tidak menyerahkan tugas</Text>
                                 )}
                              </Td>
                              <Td>
                                 {myTask?.score
                                    ? myTask?.score
                                    : myTask.score === 0
                                    ? '0'
                                    : 'Belum di nilai'}
                              </Td>
                           </Tr>
                        </Tbody>
                     </Table>
                  </VStack>
               )}
            </VStack>
         </Box>
      </Box>
   )

   // SECTION TEACHER
   const RenderTaskTeacher = () => (
      <Box>
         <VStack spacing={4} alignItems='self-start'>
            <Box
               ml='20px'
               dangerouslySetInnerHTML={{ __html: taskSelected?.body }}
            />

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
         <Divider h='8px' />
         <Box py='10px'>
            <HStack spacing={3} mb='10px'>
               <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight='600'>
                  Diserahkan
               </Text>
               <Button
                  variant='solid'
                  bg='primary'
                  color='white'
                  size='sm'
                  onClick={handleSubmitScores}
                  isLoading={isLoadingUpdateScore}
               >
                  Update nilai
               </Button>
            </HStack>
            <Table variant='simple'>
               <TableCaption>TABEL NILAI TUGAS</TableCaption>
               <Thead>
                  <Tr>
                     <Th>No</Th>
                     <Th>Nama</Th>
                     <Th>Jawaban</Th>
                     <Th>Nilai</Th>
                  </Tr>
               </Thead>
               <Tbody>
                  {Object.keys(taskSelected.tasks).length ? (
                     taskSelected.tasks.map((task, i) => (
                        <Tr key={i}>
                           <Td>{i + 1}</Td>
                           <Td>
                              <HStack spacing={3}>
                                 <Avatar
                                    size='sm'
                                    name='Dan Abrahmov'
                                    src='https://bit.ly/dan-abramov'
                                 />
                                 <Text> {task.student.name} </Text>
                              </HStack>
                           </Td>
                           <Td>
                              {task.answer ? (
                                 <Link href={task?.answer} isExternal>
                                    <Image
                                       w='25px'
                                       h='25px'
                                       src={
                                          'http://localhost:5000/uploads/pdf-icon.png'
                                       }
                                    />
                                 </Link>
                              ) : (
                                 <Text>Tidak menyerahkan tugas</Text>
                              )}
                           </Td>
                           <Td w='110px'>
                              <Input
                                 textAlign='center'
                                 type='number'
                                 min='0'
                                 max='100'
                                 // value={task.score || ''}
                                 defaultValue={task.score}
                                 onChange={(e) => {
                                    if (e.target.value === '') {
                                       handleChangeScores(
                                          task.student._id,
                                          e.target.value
                                       )
                                    } else if (e.target.valueAsNumber > 100) {
                                       e.target.value = e.target.value.slice(
                                          0,
                                          -1
                                       )
                                    } else if (e.target.valueAsNumber < 0) {
                                       e.target.value = Math.abs(
                                          e.target.valueAsNumber
                                       )
                                    }

                                    if (
                                       e.target.value.length === 2 ||
                                       e.target.valueAsNumber === 0 ||
                                       e.target.valueAsNumber === 100
                                    ) {
                                       handleChangeScores(
                                          task.student._id,
                                          e.target.value
                                       )
                                    }
                                 }}
                              />
                           </Td>
                        </Tr>
                     ))
                  ) : (
                     <Tr alignItems='center'>
                        <Td colSpan='4' textAlign='center' bg='yellow'>
                           Data tidak ada
                        </Td>
                     </Tr>
                  )}
               </Tbody>
            </Table>
         </Box>
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

   const convertDueToLocalTime = (time) => {
      '2021-09-05T08:19:37'
      const indexT = time.indexOf('T')
      const result = time.split(' ')
   }

   const handleSubmitScores = async () => {
      setIsLoadingUpdateScore(true)

      try {
         await TaskService.givingGrades(
            JSON.stringify(taskSelected._id),
            taskSelected
         )
         setIsLoadingUpdateScore(false)

         mutate(`/api/tasks/${classroomState?._id}`)
         setIsLoadingAnswer(false)
         onCloseDrawerDetail()
         toast({
            title: 'Berhasil',
            description: 'berhasil memberi nilai',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         setIsLoadingUpdateScore(false)
         toast({
            title: 'Gagal',
            description: 'gagal memberi nilai',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
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
                           ? taskSelected?.due.substring(0, 16)
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
                                 // disabled={!isAdd}
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
               setTaskSelected(null)
               setMyTask({})
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
