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
import CardExam from '../../CardExam'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../../Formik/FormikControl'

import { ClassroomContext } from '../../../contexts/classroomContext/classroomContext'
import ExamService from '../../../services/ExamService'
import useSWR, { mutate } from 'swr'
import { AuthContext } from '../../../contexts/authContext/AuthContexts'

const Exam = () => {
   const toast = useToast()
   const { isOpen, onOpen, onClose } = useDisclosure()
   const {
      isOpen: isOpenDrawerDetail,
      onOpen: onOpenDrawerDetail,
      onClose: onCloseDrawerDetail,
   } = useDisclosure()
   const [examSelected, setExamSelected] = useState({})

   const { userState } = useContext(AuthContext)
   const { classroomState, classroomDispatch } = useContext(ClassroomContext)

   const { data, error } = useSWR(`/api/exams/${classroomState?._id}`)

   // SECTION Drawer detail
   const [myExam, setMyExam] = useState({})

   const handleOpenDrawerDetail = (exam) => {
      setExamSelected(exam)

      onOpenDrawerDetail()
   }

   useEffect(() => {
      const exist = examSelected?.exams?.find(
         (item) => item.student?._id === userState._id
      )
      if (exist) setMyExam(exist)
   }, [examSelected])

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
            await ExamService.create(reqData)
         } else {
            await ExamService.update(examSelected._id, reqData)
         }
         documentRef.current.value = ''

         setDocumentUpload(null)
         mutate(`/api/exams/${classroomState?._id}`)
         onClose()
         setExamSelected({})
         toast({
            title: 'Berhasil',
            description: `berhasil ${isAdd ? 'menambahkan' : 'merubah'} exam`,
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         toast({
            title: 'Gagal',
            description: `gagal ${isAdd ? 'menambahkan' : 'merubah'} exam`,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      }
   }

   // SECTION Formik Edit Teacher
   const handleOpenModalEdit = (exam) => {
      setIsAdd(false)
      setExamSelected(exam)
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

         await ExamService.submittedExam(examSelected._id, reqData)
         mutate(`/api/exams/${classroomState?._id}`)
         setIsLoadingAnswer(false)
         setAnswerUpload(null)
         onCloseDrawerDetail()
         answerRef.current.value = ''
         toast({
            title: 'Berhasil',
            description: 'berhasil submit ujian',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         setIsLoadingAnswer(false)
         toast({
            title: 'Gagal',
            description: 'gagal submit ujian',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      }

      setIsLoadingAnswer(false)
   }

   const handleChangeScores = async (student, score) => {
      const scoresUpdate = examSelected.exams.map((item) => {
         if (item.student._id === student) {
            item.score = score
         }

         return item
      })

      const changeExam = examSelected
      changeExam.exams = scoresUpdate

      setExamSelected(changeExam)
   }

   const RenderExamStudent = () => (
      <Box>
         <VStack spacing={4} alignItems='self-start'>
            <Box
               ml='20px'
               dangerouslySetInnerHTML={{ __html: examSelected?.body }}
            />

            {examSelected.document && (
               <VStack spacing={4} alignItems='flex-start' mt='20px'>
                  <Badge variant='subtle' colorScheme='green'>
                     Lampiran
                  </Badge>
                  <Link href={examSelected?.document} isExternal>
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
                  colorScheme={Object.keys(myExam).length ? 'green' : 'yellow'}
                  fontWeight='600'
               >
                  {Object.keys(myExam).length
                     ? 'Diserahkan'
                     : 'Belum diserahkan'}
               </Badge>
               {!Object.keys(myExam).length ? (
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
                                 {myExam.answer ? (
                                    <Link href={myExam?.answer} isExternal>
                                       <Image
                                          w='25px'
                                          h='25px'
                                          src={
                                             'http://localhost:5000/uploads/pdf-icon.png'
                                          }
                                       />
                                    </Link>
                                 ) : (
                                    <Text>Tidak menyerahkan ujian</Text>
                                 )}
                              </Td>
                              <Td>
                                 {myExam?.score
                                    ? myExam?.score
                                    : myExam.score === 0
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
   const RenderExamTeacher = () => (
      <Box>
         <VStack spacing={4} alignItems='self-start'>
            <Box
               ml='20px'
               dangerouslySetInnerHTML={{ __html: examSelected?.body }}
            />

            {examSelected.document && (
               <VStack spacing={4} alignItems='flex-start' mt='20px'>
                  <Badge variant='subtle' colorScheme='green'>
                     Lampiran
                  </Badge>
                  <Link href={examSelected?.document} isExternal>
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
               <TableCaption>TABEL NILAI UJIAN</TableCaption>
               <Thead>
                  <Tr>
                     <Th>No</Th>
                     <Th>Nama</Th>
                     <Th>Jawaban</Th>
                     <Th>Nilai</Th>
                  </Tr>
               </Thead>
               <Tbody>
                  {Object.keys(examSelected.exams).length ? (
                     examSelected.exams.map((exam, i) => (
                        <Tr key={i}>
                           <Td>{i + 1}</Td>
                           <Td>
                              <HStack spacing={3}>
                                 <Avatar
                                    size='sm'
                                    name='Dan Abrahmov'
                                    src='https://bit.ly/dan-abramov'
                                 />
                                 <Text> {exam.student.name} </Text>
                              </HStack>
                           </Td>
                           <Td>
                              {exam.answer ? (
                                 <Link href={exam?.answer} isExternal>
                                    <Image
                                       w='25px'
                                       h='25px'
                                       src={
                                          'http://localhost:5000/uploads/pdf-icon.png'
                                       }
                                    />
                                 </Link>
                              ) : (
                                 <Text>Tidak menyerahkan ujian</Text>
                              )}
                           </Td>
                           <Td w='110px'>
                              <Input
                                 textAlign='center'
                                 type='number'
                                 min='0'
                                 max='100'
                                 // value={exam.score || ''}
                                 defaultValue={exam.score}
                                 onChange={(e) => {
                                    if (e.target.value === '') {
                                       handleChangeScores(
                                          exam.student._id,
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
                                          exam.student._id,
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
         await ExamService.givingGrades(
            JSON.stringify(examSelected._id),
            examSelected
         )
         setIsLoadingUpdateScore(false)

         mutate(`/api/exams/${classroomState?._id}`)
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
            {data?.exams?.length ? (
               data?.exams.map((exam, i) => (
                  <CardExam
                     key={i}
                     exam={exam}
                     handleOpenDrawerDetail={handleOpenDrawerDetail}
                     handleOpenModalEdit={handleOpenModalEdit}
                  />
               ))
            ) : (
               <Badge px={50} py={3} colorScheme='yellow'>
                  Ujian belum tersedia
               </Badge>
            )}
         </VStack>
         {/* Modal add and edit */}
         <Modal
            isOpen={isOpen}
            onClose={onClose}
            onOverlayClick={() => setExamSelected({})}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Form Ujian</ModalHeader>
               <ModalCloseButton _focus={{ outline: 'none' }} />
               <ModalBody>
                  <Formik
                     initialValues={{
                        title: examSelected?.title || '',
                        body: examSelected?.body || '',
                        due: examSelected?.due
                           ? examSelected?.due.substring(0, 16)
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

         {/* Drawer Detail Exam */}
         <Drawer
            isOpen={isOpenDrawerDetail}
            placement='right'
            onClose={onCloseDrawerDetail}
            size='lg'
            onOverlayClick={() => {
               setExamSelected(null)
               setMyExam({})
            }}
         >
            <DrawerOverlay />
            <DrawerContent>
               <DrawerCloseButton _focus={{ outline: 'none' }} />
               <DrawerHeader>
                  <Text fontSize={['lg', 'xl', '2xl']} fontWeight='600'>
                     {examSelected?.title}
                  </Text>
                  <Flex justifyContent='space-between'>
                     <Text color='textSecondary' fontSize={['sm', 'md', 'lg']}>
                        {new Date(examSelected?.createdAt).toLocaleDateString(
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
                           {new Date(examSelected?.due).toLocaleDateString(
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
                     <RenderExamStudent />
                  ) : (
                     userState.role === 'teacher' && <RenderExamTeacher />
                  )}
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </Box>
   )
}

export default Exam
