import {
   Badge,
   Box,
   Button,
   Flex,
   FormControl,
   FormLabel,
   HStack,
   Input,
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
import React, { useContext, useEffect, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import CardClass from '../../../components/CardClass'
import * as Yup from 'yup'
import FormikControl from '../../../Formik/FormikControl'
import randomString from 'randomstring'
import classroomService from '../../../services/classroomService'
import useSWR, { mutate } from 'swr'
import { AuthContext } from '../../../contexts/authContext/AuthContexts'
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars'

const Classroom = () => {
   const toast = useToast()
   const { isOpen, onOpen, onClose } = useDisclosure()
   const [classroom7, setClassroom7] = useState([])
   const [classroom8, setClassroom8] = useState([])
   const [classroom9, setClassroom9] = useState([])
   const { userState } = useContext(AuthContext)
   const orderDay = {
      Senin: 1,
      Selasa: 2,
      Rabu: 3,
      Kamis: 4,
      Jumat: 5,
      Sabtu: 6,
      Minggu: 7,
   }
   const { data, error } = useSWR(`/api/classrooms?teacher=${userState._id}`)

   useEffect(() => {
      setClassroom7(
         data?.classrooms.filter((classroom) => classroom.classroom === '7')
      )
      setClassroom8(
         data?.classrooms.filter((classroom) => classroom.classroom === '8')
      )
      setClassroom9(
         data?.classrooms.filter((classroom) => classroom.classroom === '9')
      )
   }, [data])

   // SECTION Formik

   const initialValues = {
      subject: '',
      description: '',
      classroom: '',
      day_schedule: '',
      school_year: '',
      from: '',
      to: '',
      code: '',
   }

   const validationSchema = Yup.object({
      subject: Yup.string().required('Mata pelajaran diperlukan!'),
      description: Yup.string().required('Deskripsi diperlukan!'),
      classroom: Yup.string().required('Kelas diperlukan!'),
      school_year: Yup.string().required('Tahun ajaran!'),
      day_schedule: Yup.string().required('Jadwal diperlukan!'),
      from: Yup.string().required('Waktu dari diperlukan!'),
      to: Yup.string().required('Waktu sampai diperlukan!'),
      code: Yup.string().required('Kode diperlukan!'),
   })

   const handleSubmit = async (values, actions) => {
      actions.setSubmitting(true)

      try {
         const res = await classroomService.create(values)
         mutate(`/api/classrooms?teacher=${userState._id}`)
         onClose()
         actions.setSubmitting(false)
         toast({
            title: 'Berhasil',
            description: 'classroom berhasil dibuat',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         toast({
            title: 'Gagal',
            description: error.response.data.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
         actions.setSubmitting(false)
      }
   }

   return (
      <Box pt={['25px', '50px']} px={['20px', '100px']} pb='50px'>
         {/* Header */}
         <Flex justifyContent='space-between' alignItems='center'>
            <Text fontSize={['md', 'lg', 'xl', '2xl']} fontWeight='400'>
               Daftar Kelas
            </Text>

            <Button
               variant='ghost'
               _focus={{ outline: 'none' }}
               onClick={onOpen}
            >
               <MdAdd size='24px' />
            </Button>
         </Flex>

         <VStack spacing={4} alignItems='flex-start'>
            <Box overflow='auto' w='90vw'>
               <Text
                  fontSize={['sm', 'md', 'lg', 'xl']}
                  fontWeight='700'
                  mt='50px'
               >
                  Kelas 7
               </Text>

               <Flex mt='30px' gridGap='10' overflow='auto'>
                  {classroom7?.length ? (
                     classroom7
                        ?.filter((classroom) => classroom.classroom === '7')
                        .sort(
                           (a, b) =>
                              orderDay[a.day_schedule] -
                              orderDay[b.day_schedule]
                        )
                        .map((classroom, i) => (
                           <CardClass key={i} classroom={classroom} />
                        ))
                  ) : (
                     <Badge px={50} py={3} colorScheme='yellow'>
                        Data tidak ada
                     </Badge>
                  )}
               </Flex>
            </Box>
            <Box overflow='auto' w='90vw'>
               <Text
                  fontSize={['sm', 'md', 'lg', 'xl']}
                  fontWeight='700'
                  mt='50px'
               >
                  Kelas 8
               </Text>

               <Flex mt='30px' gridGap='10' overflow='auto'>
                  {classroom8?.length ? (
                     classroom8
                        ?.filter((classroom) => classroom.classroom === '8')
                        .map((classroom, i) => (
                           <CardClass key={i} classroom={classroom} />
                        ))
                  ) : (
                     <Badge px={50} py={3} colorScheme='yellow'>
                        Data tidak ada
                     </Badge>
                  )}
               </Flex>
            </Box>
            <Box overflow='auto' w='90vw'>
               <Text
                  fontSize={['sm', 'md', 'lg', 'xl']}
                  fontWeight='700'
                  mt='50px'
               >
                  Kelas 9
               </Text>

               <Flex mt='30px' gridGap='10' overflow='auto'>
                  {classroom9?.length ? (
                     classroom9
                        ?.filter((classroom) => classroom.classroom === '9')
                        .map((classroom, i) => (
                           <CardClass key={i} classroom={classroom} />
                        ))
                  ) : (
                     <Badge px={50} py={3} colorScheme='yellow'>
                        Data tidak ada
                     </Badge>
                  )}
               </Flex>
            </Box>
         </VStack>

         {/* Modal add class */}
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Tambah Kelas</ModalHeader>
               <ModalCloseButton _focus={{ outline: 'none' }} />
               <ModalBody>
                  <Formik
                     initialValues={initialValues}
                     validationSchema={validationSchema}
                     onSubmit={handleSubmit}
                  >
                     {(props) => (
                        <Form>
                           <VStack spacing={5}>
                              <FormikControl
                                 control='input'
                                 name='subject'
                                 label='Mata Pelajaran'
                                 required={true}
                                 placeholder='e.g Bahasa Indonesia'
                              />
                              <FormikControl
                                 control='input'
                                 name='description'
                                 label='Deskripsi'
                                 required={true}
                                 placeholder='e.g Kelas 7B'
                              />
                              <FormikControl
                                 control='select'
                                 name='classroom'
                                 label='Kelas'
                                 required={true}
                                 placeholder='Pilih kelas'
                                 options={[
                                    { key: 1, name: '7', value: '7' },
                                    { key: 2, name: '8', value: '8' },
                                    { key: 3, name: '9', value: '9' },
                                 ]}
                              />

                              <FormikControl
                                 control='select'
                                 name='school_year'
                                 label='Kelas Ajaran'
                                 required={true}
                                 placeholder='Pilih tahun ajaran'
                                 options={[
                                    {
                                       key: 1,
                                       name: '2021/2022',
                                       value: '2021/2022',
                                    },
                                    {
                                       key: 2,
                                       name: '2022/2023',
                                       value: '2022/2023',
                                    },
                                    {
                                       key: 3,
                                       name: '2023/2024',
                                       value: '2023/2024',
                                    },
                                    {
                                       key: 4,
                                       name: '2024/2025',
                                       value: '2024/2025',
                                    },
                                    {
                                       key: 5,
                                       name: '2025/2026',
                                       value: '2025/2026',
                                    },
                                    {
                                       key: 6,
                                       name: '2026/2027',
                                       value: '2026/2027',
                                    },
                                    {
                                       key: 7,
                                       name: '2027/2028',
                                       value: '2027/2028',
                                    },
                                 ]}
                              />
                              <FormikControl
                                 control='select'
                                 name='day_schedule'
                                 label='Jadwal'
                                 required={true}
                                 placeholder='Pilih hari'
                                 options={[
                                    { key: 1, name: 'Senin', value: 'Senin' },
                                    { key: 2, name: 'Selasa', value: 'Selasa' },
                                    { key: 3, name: 'Rabu', value: 'Rabu' },
                                    { key: 4, name: 'Kamis', value: 'Kamis' },
                                    { key: 5, name: 'Jumat', value: 'Jumat' },
                                    { key: 6, name: 'Sabtu', value: 'Sabtu' },
                                    { key: 7, name: 'Minggu', value: 'Minggu' },
                                 ]}
                              />
                              <HStack
                                 w='100%'
                                 spacing={3}
                                 alignItems='center'
                                 justifyContent='flex-start'
                              >
                                 <FormikControl
                                    control='input'
                                    type='time'
                                    name='from'
                                    label='Dari'
                                    required={true}
                                 />

                                 <FormikControl
                                    control='input'
                                    type='time'
                                    name='to'
                                    label='Sampai'
                                    required={true}
                                    format='HH:mm'
                                 />
                              </HStack>

                              <FormikControl
                                 control='input'
                                 name='code'
                                 label='Kode'
                                 required={true}
                                 placeholder='e.g a4s5f6'
                              />
                           </VStack>

                           <HStack
                              spacing='3'
                              justifyContent='flex-end'
                              py='30px'
                           >
                              <Button
                                 variant='link'
                                 colorScheme='cyan'
                                 _focus={{ outline: 'none' }}
                                 onClick={(e) => {
                                    props.setFieldValue(
                                       'code',
                                       randomString.generate(7)
                                    )
                                 }}
                              >
                                 Generate Code
                              </Button>
                              <Button
                                 variant='solid'
                                 bg='primary'
                                 color='#fff'
                                 type='submit'
                                 isLoading={props.isSubmitting}
                              >
                                 Create
                              </Button>
                           </HStack>
                        </Form>
                     )}
                  </Formik>
               </ModalBody>
            </ModalContent>
         </Modal>
      </Box>
   )
}

export default Classroom
