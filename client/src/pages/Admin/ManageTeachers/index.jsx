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
import {
   MdAdd,
   MdDelete,
   MdEdit,
   MdLocalLibrary,
   MdRemoveRedEye,
   MdSearch,
} from 'react-icons/md'

import { AuthContext } from '../../../contexts/authContext/AuthContexts'
import Pagination from '../../../components/Pagination'
import useSWR, { mutate } from 'swr'

import { Formik, Form } from 'formik'
import FormikControl from '../../../Formik/FormikControl'

import * as Yup from 'yup'
import TeacherService from '../../../services/TeacherService'
import AlertDialogComponent from '../../../components/AlertDialogComponent'
import Search from '../../../components/Search'

const ManageTeachers = () => {
   const toast = useToast()
   const { userState, userDispatch } = useContext(AuthContext)
   const [teacher, setTeacher] = useState({})
   const [querySearch, setQuerySearch] = useState('')
   const [pageIndex, setPageIndex] = useState(1)
   const { data, error } = useSWR(
      `/api/teachers?page=${pageIndex}&name=${querySearch}&nis=${querySearch}`
   )

   const [loading, setLoading] = useState(false)

   const handlePagination = (value) => {
      setPageIndex(value)
   }

   // SECTION Detail Teacher
   const {
      isOpen: isOpenModalDetail,
      onOpen: onOpenModalDetail,
      onClose: onCloseModalDetail,
   } = useDisclosure()

   const handleOpenModalDetail = (teacher) => {
      setTeacher(teacher)

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
         await TeacherService.delete(idDelete)
         setLoading(false)
         mutate(
            `/api/teachers?page=${pageIndex}&name=${querySearch}&nis=${querySearch}`
         )
         setIsOpenDelete(false)
         setIdDelete('')
         toast({
            title: 'Berhasil',
            description: 'berhasil hapus guru',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         setLoading(false)
         toast({
            title: 'Gagal',
            description: 'gagat hapus guru',
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

   const handleModalTeacher = ({ isAdd, teacher }) => {
      if (isAdd) {
         setIsAdd(true)
      } else {
         setIsAdd(false)
         setTeacher(teacher)
      }

      onOpen()
   }

   const validationSchema = Yup.object({
      name: Yup.string().required('Nama diperlukan'),
      gender: Yup.string().required('Jenis kelamin diperlukan'),
      email: Yup.string()
         .required('Email diperlukan')
         .email('Email tidak valid'),
   })

   const handleSubmit = async (values, actions) => {
      actions.setSubmitting(true)

      try {
         let action

         if (isAdd) {
            await TeacherService.create(values)
            action = 'menambahkan'
         } else {
            await TeacherService.update(teacher._id, values)
            action = 'mengubah'
         }
         mutate(
            `/api/teachers?page=${pageIndex}&name=${querySearch}&nis=${querySearch}`
         )
         onClose()
         setTeacher({})
         actions.setSubmitting(false)
         toast({
            title: 'Berhasil',
            description: `berhasil ${action} guru`,
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         const {
            data: { errors },
         } = error.response

         console.log(errors)

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
            Manage Guru
         </Text>

         <Box mt={['25px', '50px']} pb='30px'>
            <HStack spacing={4}>
               <Box>
                  <Button
                     variant='solid'
                     bg='primary'
                     color='white'
                     onClick={(e) => handleModalTeacher({ isAdd: true })}
                  >
                     <MdAdd size='24px' />{' '}
                     <Text
                        ml='7px'
                        display={['none', 'inline', 'inline', 'inline']}
                     >
                        Tambah Guru
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
                        <Th>Nama</Th>
                        <Th>email</Th>
                        <Th>Action</Th>
                     </Tr>
                  </Thead>
                  <Tbody>
                     {data?.teachers?.length ? (
                        data?.teachers
                           .filter((teacher) => teacher._id !== userState._id)
                           .map((teacher, i) => (
                              <Tr key={i}>
                                 <Td>{i + 1 + 10 * (data?.page - 1)}</Td>
                                 <Td>
                                    <Text>{teacher.name}</Text>
                                 </Td>
                                 <Td>
                                    <Text>{teacher.email}</Text>
                                 </Td>

                                 <Td>
                                    <HStack spacing={3}>
                                       <Button
                                          variant='solid'
                                          colorScheme='blue'
                                          onClick={(e) =>
                                             handleOpenModalDetail(teacher)
                                          }
                                       >
                                          <MdRemoveRedEye size='24px' />
                                       </Button>
                                       <Button
                                          variant='solid'
                                          colorScheme='yellow'
                                          onClick={(e) =>
                                             handleModalTeacher({
                                                isAdd: false,
                                                teacher,
                                             })
                                          }
                                       >
                                          <MdEdit size='24px' />
                                       </Button>
                                       <Button
                                          variant='solid'
                                          colorScheme='red'
                                          onClick={(e) =>
                                             handleOpenAlertDelete(teacher._id)
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
            <Box display={data?.teachers.length ? 'inline' : 'none'}>
               <Pagination
                  page={data?.page}
                  pages={data?.pages}
                  handlePagination={handlePagination}
               />
            </Box>
         </Box>

         {/* Alert Dialog */}
         <AlertDialogComponent
            header='Hapus Teacher'
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
               setTeacher({})
            }}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Tambah Guru</ModalHeader>
               <ModalCloseButton _focus={{ outline: 'none' }} />
               <ModalBody pb='30px'>
                  <Formik
                     initialValues={{
                        name: teacher.name || '',
                        gender: teacher.gender || '',
                        year_of_entry: teacher.year_of_entry || '',
                        email: teacher.email || '',
                     }}
                     onSubmit={handleSubmit}
                     validationSchema={validationSchema}
                  >
                     {(props) => (
                        <Form>
                           <VStack spacing={4}>
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
            onOverlayClick={(e) => setTeacher({})}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Detail Guru</ModalHeader>
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
                        name={teacher.name}
                        src={teacher.photo}
                     />
                  </Box>

                  <Table variant='simple'>
                     <Tbody>
                        <Tr>
                           <Th>Nama</Th>

                           <Td>{teacher.name}</Td>
                        </Tr>
                        <Tr>
                           <Th>Email</Th>
                           <Td>{teacher.email}</Td>
                        </Tr>
                        <Tr>
                           <Th>Jenis Kelamin</Th>
                           <Td>
                              {teacher.gender === 'L'
                                 ? 'Laki-laki'
                                 : 'Perempuan'}
                           </Td>
                        </Tr>
                     </Tbody>
                  </Table>
               </ModalBody>
            </ModalContent>
         </Modal>
      </Box>
   )
}

export default ManageTeachers
