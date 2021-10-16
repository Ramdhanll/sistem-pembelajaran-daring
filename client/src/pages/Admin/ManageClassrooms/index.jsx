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
import React, { useContext, useEffect, useState } from 'react'
import { MdAdd, MdDelete, MdEdit, MdRemoveRedEye } from 'react-icons/md'

import { AuthContext } from '../../../contexts/authContext/AuthContexts'
import Pagination from '../../../components/Pagination'
import useSWR, { mutate } from 'swr'

import { Formik, Form } from 'formik'
import FormikControl from '../../../Formik/FormikControl'

import * as Yup from 'yup'
import ClassroomService from '../../../services/classroomService'
import AlertDialogComponent from '../../../components/AlertDialogComponent'
import Search from '../../../components/Search'

import { NavLink } from 'react-router-dom'

const ManageClassrooms = () => {
   const toast = useToast()
   const { userState } = useContext(AuthContext)
   const [classroom, setClassroom] = useState({})
   const [querySearch, setQuerySearch] = useState('')
   const [pageIndex, setPageIndex] = useState(1)

   useEffect(() => {
      setPageIndex(1)
   }, [querySearch])

   const { data } = useSWR(
      `/api/classrooms?page=${pageIndex}&subject=${querySearch}`
   )

   console.log(data)

   const [loading, setLoading] = useState(false)

   const handlePagination = (value) => {
      setPageIndex(value)
   }

   // SECTION Detail Classroom
   const {
      isOpen: isOpenModalDetail,
      onOpen: onOpenModalDetail,
      onClose: onCloseModalDetail,
   } = useDisclosure()

   const handleOpenModalDetail = (classroom) => {
      setClassroom(classroom)

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
         await ClassroomService.deleteClassroom(idDelete)
         setLoading(false)
         mutate(`/api/classrooms?page=${pageIndex}&name=${querySearch}`)
         setIsOpenDelete(false)
         setIdDelete('')
         toast({
            title: 'Berhasil',
            description: 'berhasil hapus kelas',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         setLoading(false)
         toast({
            title: 'Gagal',
            description: 'gagat hapus kelas',
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

   const handleModalClassroom = ({ isAdd, classroom }) => {
      if (isAdd) {
         setIsAdd(true)
      } else {
         setIsAdd(false)
         setClassroom(classroom)
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
            await ClassroomService.create(values)
            action = 'menambahkan'
         } else {
            await ClassroomService.update(classroom._id, values)
            action = 'mengubah'
         }
         mutate(`/api/classrooms?page=${pageIndex}&name=${querySearch}`)
         onClose()
         setClassroom({})
         actions.setSubmitting(false)
         toast({
            title: 'Berhasil',
            description: `berhasil ${action} kelas`,
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
            Manage Kelas
         </Text>

         <Box mt={['25px', '50px']} pb='30px'>
            <HStack spacing={4}>
               <Box>
                  {/* <Button
                     variant='solid'
                     bg='primary'
                     color='white'
                     onClick={(e) => handleModalClassroom({ isAdd: true })}
                  >
                     <MdAdd size='24px' />{' '}
                     <Text
                        ml='7px'
                        display={['none', 'inline', 'inline', 'inline']}
                     >
                        Tambah Kelas
                     </Text>
                  </Button> */}
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
                        <Th>Mata Pelajaran</Th>
                        <Th>Guru</Th>
                        <Th>Kelas</Th>
                        <Th>Tahun Ajaran</Th>
                        <Th>Action</Th>
                     </Tr>
                  </Thead>
                  <Tbody>
                     {data?.classrooms?.length ? (
                        data?.classrooms.map((classroom, i) => (
                           <Tr key={i}>
                              {/* <Td>{i + 1 + 10 * (data?.page - 1)}</Td> */}
                              <Td>{i + 1}</Td>
                              <Td>
                                 <Text>{classroom.subject}</Text>
                              </Td>
                              <Td>
                                 <Text>{classroom.teacher.name}</Text>
                              </Td>
                              <Td>
                                 <Text>{classroom.classroom}</Text>
                              </Td>
                              <Td>
                                 <Text>{classroom.school_year}</Text>
                              </Td>

                              <Td>
                                 <HStack spacing={3}>
                                    <NavLink to={`/a/kelas/${classroom._id}`}>
                                       <Button
                                          variant='solid'
                                          colorScheme='blue'
                                       >
                                          <MdRemoveRedEye size='24px' />
                                       </Button>
                                    </NavLink>
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
            <Box display={data?.classrooms.length ? 'inline' : 'none'}>
               <Pagination
                  page={data?.page}
                  pages={data?.pages}
                  handlePagination={handlePagination}
               />
            </Box>
         </Box>

         {/* Alert Dialog */}
         <AlertDialogComponent
            header='Hapus Classroom'
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
               setClassroom({})
            }}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Tambah Kelas</ModalHeader>
               <ModalCloseButton _focus={{ outline: 'none' }} />
               <ModalBody pb='30px'>
                  <Formik
                     initialValues={{
                        name: classroom.name || '',
                        gender: classroom.gender || '',
                        year_of_entry: classroom.year_of_entry || '',
                        email: classroom.email || '',
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
                                 label='Email'
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
            onOverlayClick={(e) => setClassroom({})}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Detail Kelas</ModalHeader>
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
                        name={classroom.name}
                        src={classroom.photo}
                     />
                  </Box>

                  <Table variant='simple'>
                     <Tbody>
                        <Tr>
                           <Th>Nama</Th>

                           <Td>{classroom.name}</Td>
                        </Tr>
                        <Tr>
                           <Th>Email</Th>
                           <Td>{classroom.email}</Td>
                        </Tr>
                        <Tr>
                           <Th>Jenis Kelamin</Th>
                           <Td>
                              {classroom.gender === 'L'
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

export default ManageClassrooms
