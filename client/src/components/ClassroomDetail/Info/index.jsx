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
   Table,
   TableCaption,
   Tbody,
   Td,
   Text,
   Tfoot,
   Th,
   Thead,
   Tr,
   useDisclosure,
   useToast,
   VStack,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React, { useContext } from 'react'
import { MdModeEdit } from 'react-icons/md'
import useSWR from 'swr'
import { ClassroomContext } from '../../../contexts/classroomContext/classroomContext'
import randomString from 'randomstring'
import FormikControl from '../../../Formik/FormikControl'

import * as Yup from 'yup'
import classroomService from '../../../services/classroomService'

const Info = (props) => {
   const toast = useToast()
   const { isOpen, onOpen, onClose } = useDisclosure()
   const { classroomState, classroomDispatch } = useContext(ClassroomContext)
   // const { data, error } = useSWR(`/api/classrooms/${props.match.params.id}`)

   // SECTION Formik

   const initialValues = {
      subject: classroomState?.subject || '',
      description: classroomState?.description || '',
      classroom: classroomState?.classroom || '',
      day_schedule: classroomState?.day_schedule || '',
      school_year: classroomState?.school_year || '',
      from: classroomState?.from || '',
      to: classroomState?.to || '',
      code: classroomState?.code || '',
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
         await classroomService.update(
            classroomState._id,
            values,
            classroomDispatch
         )
         // mutate(`/api/classrooms?teacher=${userState._id}`)
         onClose()
         actions.setSubmitting(false)
         toast({
            title: 'Berhasil',
            description: 'classroom berhasil diubah',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         onClose()
         toast({
            title: 'Gagal',
            description: 'classroom gagal diubah',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
         actions.setSubmitting(false)
      }
   }

   return (
      <Box>
         {/*  Kelas, Tahun Ajaran, Kode */}
         <Flex
            justifyContent='space-between'
            alignItems='center'
            overflow='auto'
            gridGap='50px'
         >
            <HStack spacing={['25px', '50px']}>
               <VStack spacing={3} alignItems='flex-start' w='max-content'>
                  <Text fontWeight='600' fontSize={['lg', 'xl', '2xl']}>
                     Kelas
                  </Text>
                  <Text fontWeight='300' fontSize={['sm', 'md', 'lg', 'xl']}>
                     {classroomState?.classroom}
                  </Text>
               </VStack>
               <VStack spacing={3} alignItems='flex-start' w='max-content'>
                  <Text fontWeight='600' fontSize={['lg', 'xl', '2xl']}>
                     Tahun Ajaran
                  </Text>
                  <Text fontWeight='300' fontSize={['sm', 'md', 'lg', 'xl']}>
                     {classroomState?.school_year}
                  </Text>
               </VStack>
               <VStack spacing={3} alignItems='flex-start' w='max-content'>
                  <Text fontWeight='600' fontSize={['lg', 'xl', '2xl']}>
                     Waktu
                  </Text>
                  <Text fontWeight='300' fontSize={['sm', 'md', 'lg', 'xl']}>
                     {`${classroomState?.from} - ${classroomState?.to} WIB`}
                  </Text>
               </VStack>
               <VStack spacing={3} alignItems='flex-start' w='max-content'>
                  <Text fontWeight='600' fontSize={['lg', 'xl', '2xl']}>
                     Jadwal
                  </Text>
                  <Text fontWeight='300' fontSize={['sm', 'md', 'lg', 'xl']}>
                     {classroomState?.day_schedule}
                  </Text>
               </VStack>
               <VStack spacing={3} alignItems='flex-start' w='max-content'>
                  <Text fontWeight='600' fontSize={['lg', 'xl', '2xl']}>
                     Kode
                  </Text>
                  <Text fontWeight='300' fontSize={['sm', 'md', 'lg', 'xl']}>
                     {classroomState?.code}
                  </Text>
               </VStack>
            </HStack>
            <Box>
               <Button
                  variant='solid'
                  colorScheme='yellow'
                  _focus={{ outline: 'none' }}
                  onClick={onOpen}
               >
                  <MdModeEdit size='24px' />
               </Button>
            </Box>
         </Flex>

         {/* Teacher */}
         <Box mt='30px'>
            <Text fontWeight='600' fontSize={['lg', 'xl', '2xl']}>
               Guru
            </Text>
            <Flex alignItems='center' gridGap='15px' mt='20px'>
               <Avatar
                  name={classroomState?.teacher?.name}
                  src={classroomState?.teacher?.photo}
               />
               <Text fontSize={['md', 'lg', 'xl']}>
                  {classroomState?.teacher?.name}
               </Text>
            </Flex>
         </Box>

         {/* Members */}
         <Box mt='30px'>
            <Text fontWeight='600' fontSize={['lg', 'xl', '2xl']}>
               Anggota
            </Text>
            {classroomState?.members?.map((item, i) => (
               <Flex key={i} alignItems='center' gridGap='15px' mt='20px'>
                  <Avatar name={item.name} src={item.photo} />
                  <Text fontSize={['md', 'lg', 'xl']}>{item.name}</Text>
               </Flex>
            ))}
         </Box>

         {/* Modal Edit */}
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Detail Kelas</ModalHeader>
               <ModalCloseButton _focus={{ outline: 'none' }} />
               <ModalBody>
                  <Formik
                     initialValues={initialValues}
                     validationSchema={validationSchema}
                     onSubmit={handleSubmit}
                     enableReinitialize
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
                                 Update
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

export default Info
