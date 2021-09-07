import {
   Avatar,
   Box,
   Button,
   CircularProgress,
   HStack,
   ListItem,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
   Table,
   TableCaption,
   Tbody,
   Td,
   Text,
   Th,
   Thead,
   Tr,
   UnorderedList,
   useDisclosure,
   useToast,
   VStack,
} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { MdAdd, MdDelete, MdEdit, MdRemoveRedEye } from 'react-icons/md'

import { AuthContext } from '../../../contexts/authContext/AuthContexts'
import Pagination from '../../../components/Pagination'
import useSWR, { mutate } from 'swr'

import { Formik, Form } from 'formik'
import FormikControl from '../../../Formik/FormikControl'

import * as Yup from 'yup'
import StudentService from '../../../services/StudentService'
import AlertDialogComponent from '../../../components/AlertDialogComponent'
import Search from '../../../components/Search'

const ManageStudents = () => {
   const toast = useToast()
   const { userState } = useContext(AuthContext)
   const [student, setStudent] = useState({})
   const [querySearch, setQuerySearch] = useState('')
   const [pageIndex, setPageIndex] = useState(1)
   const { data } = useSWR(
      `/api/students?page=${pageIndex}&name=${querySearch}&nis=${querySearch}`
   )

   const [loading, setLoading] = useState(false)

   const handlePagination = (value) => {
      setPageIndex(value)
   }

   // SECTION Detail Student
   const {
      isOpen: isOpenModalDetail,
      onOpen: onOpenModalDetail,
      onClose: onCloseModalDetail,
   } = useDisclosure()

   const handleOpenModalDetail = (student) => {
      setStudent(student)

      onOpenModalDetail()
   }

   // SECTION Delete
   const [isOpenDelete, setIsOpenDelete] = useState(false)
   const onCloseDelete = () => setIsOpenDelete(false)
   const [idDelete, setIdDelete] = useState('')

   const handleOpenAlertDelete = (id) => {
      setIsOpenDelete(true)
      setIdDelete(id)
   }

   const handleDelete = async () => {
      setLoading(true)
      try {
         await StudentService.delete(idDelete)
         setLoading(false)
         mutate(
            `/api/students?page=${pageIndex}&name=${querySearch}&nis=${querySearch}`
         )
         setIsOpenDelete(false)
         setIdDelete('')
         toast({
            title: 'Berhasil',
            description: 'berhasil hapus siswa',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         setLoading(false)
         toast({
            title: 'Gagal',
            description: 'gagat hapus siswa',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
         console.log('error', error.response)
      }
   }

   // SECTION Formik
   const [isAdd, setIsAdd] = useState(true)
   const { isOpen, onOpen, onClose } = useDisclosure()

   const handleModalStudent = ({ isAdd, student }) => {
      if (isAdd) {
         setIsAdd(true)
      } else {
         setIsAdd(false)
         setStudent(student)
      }

      onOpen()
   }

   const validationSchema = Yup.object({
      nis: Yup.number()
         .required('NIS diperlukan')
         .test('is-10', 'Harus memiliki 10 character', (value) => {
            if (!isNaN(value)) {
               return value.toString().length === 10
            }
         }),
      name: Yup.string().required('Nama diperlukan'),
      gender: Yup.string().required('Jenis kelamin diperlukan'),
      year_of_entry: Yup.string().required('Tahun ajaran diperlukan'),
      email: Yup.string()
         .required('Email diperlukan')
         .email('Email tidak valid'),
   })

   const handleSubmit = async (values, actions) => {
      actions.setSubmitting(true)

      try {
         let action
         if (isAdd) {
            await StudentService.create(values)
            action = 'menambahkan'
         } else {
            await StudentService.update(student._id, values)
            action = 'mengubah'
         }
         mutate(
            `/api/students?page=${pageIndex}&name=${querySearch}&nis=${querySearch}`
         )
         onClose()
         setStudent({})
         actions.setSubmitting(false)
         toast({
            title: 'Berhasil',
            description: `berhasil ${action} siswa`,
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         const {
            data: { errors },
         } = error.response

         const renderError = (
            <UnorderedList>
               {errors.map((error, i) => (
                  <ListItem key={i}> {error.msg}</ListItem>
               ))}
            </UnorderedList>
         )
         toast({
            title: 'Gagal',
            description: renderError,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      }
   }

   return (
      <Box pt={['25px', '50px']} px={['25px', '30px', '50px', '100px']}>
         {/* Header */}
         <Text fontSize={['md', 'lg', 'xl', '2xl']} fontWeight='600'>
            Manage Siswa
         </Text>

         <Box mt={['25px', '50px']} pb='30px'>
            <HStack spacing={4}>
               <Box>
                  <Button
                     variant='solid'
                     bg='primary'
                     color='white'
                     onClick={(e) => handleModalStudent({ isAdd: true })}
                  >
                     <MdAdd size='24px' />{' '}
                     <Text
                        ml='7px'
                        display={['none', 'inline', 'inline', 'inline']}
                     >
                        Tambah Siswa
                     </Text>
                  </Button>
               </Box>

               <Search
                  setQuerySearch={setQuerySearch}
                  placeholder='Pencarian dengan nama ...'
               />
            </HStack>

            {/* Table  */}
            <Box h={['60vh', '340px']} mt='20px' overflow='auto' mb='30px'>
               <Table variant='striped' colorScheme='teal' mt='20px'>
                  <TableCaption>SMP Dharma Bhakti Tangerang</TableCaption>
                  <Thead>
                     <Tr>
                        <Th>No</Th>
                        <Th>NIS</Th>
                        <Th>Nama</Th>
                        <Th>email</Th>
                        <Th>Action</Th>
                     </Tr>
                  </Thead>
                  <Tbody>
                     {data?.students?.length ? (
                        data?.students
                           .filter((student) => student._id !== userState._id)
                           .map((student, i) => (
                              <Tr key={i}>
                                 <Td>{i + 1 + 10 * (data?.page - 1)}</Td>
                                 <Td>
                                    <Text>{student.nis}</Text>
                                 </Td>
                                 <Td>
                                    <Text>{student.name}</Text>
                                 </Td>
                                 <Td>
                                    <Text>{student.email}</Text>
                                 </Td>

                                 <Td>
                                    <HStack spacing={3}>
                                       <Button
                                          variant='solid'
                                          colorScheme='blue'
                                          onClick={(e) =>
                                             handleOpenModalDetail(student)
                                          }
                                       >
                                          <MdRemoveRedEye size='24px' />
                                       </Button>
                                       <Button
                                          variant='solid'
                                          colorScheme='yellow'
                                          onClick={(e) =>
                                             handleModalStudent({
                                                isAdd: false,
                                                student,
                                             })
                                          }
                                       >
                                          <MdEdit size='24px' />
                                       </Button>
                                       <Button
                                          variant='solid'
                                          colorScheme='red'
                                          onClick={(e) =>
                                             handleOpenAlertDelete(student._id)
                                          }
                                       >
                                          <MdDelete size='24px' />
                                       </Button>
                                    </HStack>
                                 </Td>
                              </Tr>
                           ))
                     ) : !data ? (
                        <Tr>
                           <Td
                              colSpan='5'
                              textAlign='center'
                              backgroundColor='blue.300'
                           >
                              <CircularProgress
                                 size='25px'
                                 thickness='16px'
                                 isIndeterminate
                                 color='green.300'
                              />
                           </Td>
                        </Tr>
                     ) : (
                        <Tr>
                           <Td
                              colSpan='5'
                              textAlign='center'
                              backgroundColor='blue.300'
                           >
                              Data Kosong
                           </Td>
                        </Tr>
                     )}
                  </Tbody>
               </Table>
            </Box>
            <Box display={data?.students.length ? 'inline' : 'none'}>
               <Pagination
                  page={data?.page}
                  pages={data?.pages}
                  handlePagination={handlePagination}
               />
            </Box>
         </Box>

         {/* Alert Dialog */}
         <AlertDialogComponent
            header='Hapus Student'
            body='apakah anda yakin ingin menghapus?'
            isOpen={isOpenDelete}
            onClose={onCloseDelete}
            handleConfirm={handleDelete}
            isLoading={loading}
         />

         {/* Modal add and update */}
         <Modal
            isOpen={isOpen}
            onClose={onClose}
            size='md'
            onOverlayClick={() => {
               setStudent({})
            }}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Tambah Siswa</ModalHeader>
               <ModalCloseButton _focus={{ outline: 'none' }} />
               <ModalBody pb='30px'>
                  <Formik
                     initialValues={{
                        nis: student.nis || '',
                        name: student.name || '',
                        gender: student.gender || '',
                        year_of_entry: student.year_of_entry || '',
                        email: student.email || '',
                     }}
                     onSubmit={handleSubmit}
                     validationSchema={validationSchema}
                  >
                     {(props) => (
                        <Form>
                           <VStack spacing={4}>
                              <FormikControl
                                 control='input'
                                 type='number'
                                 name='nis'
                                 label='NIS'
                                 required={true}
                              />
                              <FormikControl
                                 control='input'
                                 name='name'
                                 label='Nama'
                                 required={true}
                                 autoComplete='off'
                              />
                              <FormikControl
                                 control='input'
                                 name='email'
                                 label='Emal'
                                 type='email'
                                 required={true}
                              />
                              <FormikControl
                                 control='radio'
                                 name='gender'
                                 label='Jenis Kelamin'
                                 required={true}
                                 placeholder='Pilih jenis kelamin'
                                 options={[
                                    { key: 1, value: 'L', name: 'Laki-laki' },
                                    { key: 2, value: 'P', name: 'Perempuan' },
                                 ]}
                              />
                              <FormikControl
                                 control='select'
                                 name='year_of_entry'
                                 label='Tahun ajaran'
                                 required={true}
                                 placeholder='Pilih tahun ajaran'
                                 options={[
                                    {
                                       key: 1,
                                       value: '2021/2022',
                                       name: '2021/2022',
                                    },
                                    {
                                       key: 2,
                                       value: '2022/2023',
                                       name: '2022/2023',
                                    },
                                    {
                                       key: 3,
                                       value: '2023/2024',
                                       name: '2023/2024',
                                    },
                                    {
                                       key: 4,
                                       value: '2024/2025',
                                       name: '2024/2025',
                                    },
                                    {
                                       key: 5,
                                       value: '2025/2026',
                                       name: '2025/2026',
                                    },
                                    {
                                       key: 6,
                                       value: '2026/2027',
                                       name: '2026/2027',
                                    },
                                    {
                                       key: 7,
                                       value: '2027/2028',
                                       name: '2027/2028',
                                    },
                                    {
                                       key: 8,
                                       value: '2028/2029',
                                       name: '2028/2029',
                                    },
                                    {
                                       key: 9,
                                       value: '2029/2030',
                                       name: '2029/2030',
                                    },
                                 ]}
                              />
                           </VStack>
                           <Button
                              mt='30px'
                              variant='solid'
                              colorScheme='blue'
                              type='submit'
                              float='right'
                              isLoading={props.isSubmitting}
                           >
                              {isAdd ? 'Simpan' : 'Update'}
                           </Button>
                        </Form>
                     )}
                  </Formik>
               </ModalBody>
            </ModalContent>
         </Modal>

         {/* Modal Detail */}
         <Modal
            isOpen={isOpenModalDetail}
            onClose={onCloseModalDetail}
            onOverlayClick={(e) => setStudent({})}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Detail Siswa</ModalHeader>
               <ModalCloseButton _focus={{ outline: 'none' }} />
               <ModalBody>
                  <Box
                     display='flex'
                     alignItems='center'
                     justifyContent='center'
                     mb='15px'
                  >
                     <Avatar
                        size='xl'
                        name={student.name}
                        src={student.photo}
                     />
                  </Box>

                  <Table variant='simple'>
                     <Tbody>
                        <Tr>
                           <Th>NIS</Th>
                           <Td>{student.nis}</Td>
                        </Tr>
                        <Tr>
                           <Th>Nama</Th>

                           <Td>{student.name}</Td>
                        </Tr>
                        <Tr>
                           <Th>Email</Th>
                           <Td>{student.email}</Td>
                        </Tr>
                        <Tr>
                           <Th>Jenis Kelamin</Th>
                           <Td>
                              {student.gender === 'L'
                                 ? 'Laki-laki'
                                 : 'Perempuan'}
                           </Td>
                        </Tr>
                        <Tr>
                           <Th>Tahun Masuk</Th>
                           <Td>{student.year_of_entry}</Td>
                        </Tr>
                     </Tbody>
                  </Table>
               </ModalBody>
            </ModalContent>
         </Modal>
      </Box>
   )
}

export default ManageStudents
