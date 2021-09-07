import {
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
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md'

import { AuthContext } from '../../../contexts/authContext/AuthContexts'
import Pagination from '../../../components/Pagination'
import useSWR, { mutate } from 'swr'

import { Formik, Form } from 'formik'
import FormikControl from '../../../Formik/FormikControl'

import * as Yup from 'yup'
import AdminService from '../../../services/AdminService'
import AlertDialogComponent from '../../../components/AlertDialogComponent'
import Search from '../../../components/Search'

const ManageAdmin = () => {
   const toast = useToast()
   const { userState } = useContext(AuthContext)
   const [name, setName] = useState('')
   const [pageIndex, setPageIndex] = useState(1)
   const { data } = useSWR(`/api/admins?page=${pageIndex}&name=${name}`)
   const [loading, setLoading] = useState(false)

   const handlePagination = (value) => {
      setPageIndex(value)
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
         await AdminService.delete(idDelete)
         setLoading(false)
         mutate(`/api/admins?page=${pageIndex}&name=${name}`)
         setIsOpenDelete(false)
         setIdDelete('')
         toast({
            title: 'Berhasil',
            description: 'berhasil hapus admin',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         setLoading(false)
         toast({
            title: 'Gagal',
            description: 'gagat hapus admin',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
         console.log('error', error.response)
      }
   }

   // SECTION Formik
   const [admin, setAdmin] = useState({})
   const [isAdd, setIsAdd] = useState(true)
   const { isOpen, onOpen, onClose } = useDisclosure()

   const handleModalAdmin = ({ isAdd, admin }) => {
      if (isAdd) {
         setIsAdd(true)
      } else {
         setIsAdd(false)
         setAdmin(admin)
      }

      onOpen()
   }

   const validationSchema = Yup.object({
      name: Yup.string().required('Nama diperlukan!'),
      email: Yup.string()
         .required('Email diperlukan')
         .email('Email tidak valid'),
      gender: Yup.string().required('Jenis kelamin diperlukan!'),
   })

   const handleSubmit = async (values, actions) => {
      actions.setSubmitting(true)

      try {
         if (isAdd) {
            await AdminService.create(values)
         } else {
            await AdminService.update(admin._id, values)
         }
         mutate(`/api/admins?page=${pageIndex}&name=${name}`)
         onClose()
         setAdmin({})
         actions.setSubmitting(false)
         toast({
            title: 'Berhasil',
            description: 'berhasil menambahkan admin',
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
            Manage Admin
         </Text>

         <Box mt={['25px', '50px']} pb='30px'>
            <HStack spacing={4}>
               <Box>
                  <Button
                     variant='solid'
                     bg='primary'
                     color='white'
                     onClick={(e) => handleModalAdmin({ isAdd: true })}
                  >
                     <MdAdd size='24px' />{' '}
                     <Text
                        ml='7px'
                        display={['none', 'inline', 'inline', 'inline']}
                     >
                        Tambah Admin
                     </Text>
                  </Button>
               </Box>

               <Search
                  setQuerySearch={setName}
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
                     {data?.admins.length ? (
                        data?.admins
                           .filter((admin) => admin._id !== userState._id)
                           .map((admin, i) => (
                              <Tr key={i}>
                                 <Td>{i + 1 + 10 * (data?.page - 1)}</Td>
                                 <Td>
                                    <Text>{admin.name}</Text>
                                 </Td>
                                 <Td>
                                    <Text>{admin.email}</Text>
                                 </Td>

                                 <Td>
                                    <HStack spacing={3}>
                                       <Button
                                          variant='solid'
                                          colorScheme='yellow'
                                          onClick={(e) =>
                                             handleModalAdmin({
                                                isAdd: false,
                                                admin,
                                             })
                                          }
                                       >
                                          <MdEdit size='24px' />
                                       </Button>
                                       <Button
                                          variant='solid'
                                          colorScheme='red'
                                          onClick={(e) =>
                                             handleOpenAlertDelete(admin._id)
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
                              colSpan='4'
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
                              colSpan='4'
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
            <Box display={data?.admins.length ? 'inline' : 'none'}>
               <Pagination
                  page={data?.page}
                  pages={data?.pages}
                  handlePagination={handlePagination}
               />
            </Box>
         </Box>

         {/* Alert Dialog */}
         <AlertDialogComponent
            header='Hapus Admin'
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
               setAdmin({})
            }}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Tambah Admin</ModalHeader>
               <ModalCloseButton _focus={{ outline: 'none' }} />
               <ModalBody pb='30px'>
                  <Formik
                     initialValues={{
                        name: admin.name || '',
                        email: admin.email || '',
                        gender: admin.gender || '',
                     }}
                     onSubmit={handleSubmit}
                     validationSchema={validationSchema}
                  >
                     {(props) => (
                        <Form>
                           <VStack spacing={3}>
                              <FormikControl
                                 control='input'
                                 name='name'
                                 label='Nama'
                                 required={true}
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
                                 label='Jenis kelamin'
                                 required={true}
                                 options={[
                                    { key: 1, name: 'Laki-laki', value: 'L' },
                                    { key: 2, name: 'Perempuan', value: 'P' },
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
      </Box>
   )
}

export default ManageAdmin
