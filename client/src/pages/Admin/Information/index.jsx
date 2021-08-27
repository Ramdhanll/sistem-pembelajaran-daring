import {
   Box,
   Button,
   Flex,
   FormControl,
   FormLabel,
   HStack,
   Input,
   Link,
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
import React, { useContext, useState } from 'react'
import { MdAdd, MdDelete, MdEdit, MdLocalLibrary } from 'react-icons/md'
import { GiTeacher } from 'react-icons/gi'
import { RiAdminFill } from 'react-icons/ri'
import { IoMdPeople } from 'react-icons/io'

import CardDashboard from '../../../components/CardDashboard'
import { AuthContext } from '../../../contexts/authContext/AuthContexts'
import Pagination from '../../../components/Pagination'
import useSWR, { mutate } from 'swr'

import { Formik, Form, setIn } from 'formik'
import FormikControl from '../../../Formik/FormikControl'

import * as Yup from 'yup'
import InformationService from '../../../services/InformationService'
import AlertDialogComponent from '../../../components/AlertDialogComponent'
import { NavLink } from 'react-router-dom'

const Information = () => {
   const toast = useToast()
   const [pageIndex, setPageIndex] = useState(1)
   const { userState, userDispatch } = useContext(AuthContext)
   const { data, error } = useSWR(`/api/informations?page=${pageIndex}`)

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
      try {
         await InformationService.delete(idDelete)
         mutate(`/api/informations?page=${pageIndex}`)
         setIsOpenDelete(false)
         setIdDelete('')
         toast({
            title: 'Berhasil',
            description: 'berhasil hapus informasi',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         toast({
            title: 'Gagal',
            description: 'gagat hapus informasi',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
         console.log('error', error.response)
      }
   }

   // SECTION Formik
   const [information, setInformation] = useState({})
   const [isAdd, setIsAdd] = useState(true)
   const { isOpen, onOpen, onClose } = useDisclosure()

   const handleModalInformation = ({ isAdd, information }) => {
      if (isAdd) {
         setIsAdd(true)
      } else {
         setIsAdd(false)
         setInformation(information)
      }

      onOpen()
   }

   const validationSchema = Yup.object({
      title: Yup.string().required('Judul diperlukan!'),
      body: Yup.string().required('Body diperlukan'),
   })

   const handleSubmit = async (values, actions) => {
      actions.setSubmitting(true)

      try {
         if (isAdd) {
            await InformationService.create(values)
         } else {
            await InformationService.update(information._id, values)
         }
         mutate(`/api/informations?page=${pageIndex}`)
         onClose()
         actions.setSubmitting(false)
         toast({
            title: 'Berhasil',
            description: 'berhasil menambahkan informasi',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         toast({
            title: 'Gagal',
            description: 'gagat menambahkan informasi',
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
            Informasi dan Berita
         </Text>

         {/* Informasi */}
         <Box mt={['25px', '50px']} pb='30px'>
            <Button
               variant='solid'
               bg='primary'
               color='white'
               onClick={(e) => handleModalInformation({ isAdd: true })}
            >
               <MdAdd size='24px' />{' '}
               <Text ml='7px' display={['none', 'inline', 'inline', 'inline']}>
                  Tambah Informasi dan berita
               </Text>
            </Button>

            {/* Table  */}
            <Box h={['60vh', '300px']} mt='20px' overflow='auto' mb='30px'>
               <Table variant='striped' colorScheme='teal' mt='20px'>
                  <TableCaption>SMP Dharma Bhakti Tangerang</TableCaption>
                  <Thead>
                     <Tr>
                        <Th>No</Th>
                        <Th>Judul</Th>
                        <Th>Tanggal</Th>
                        <Th>Action</Th>
                     </Tr>
                  </Thead>
                  <Tbody>
                     {data?.informations.map((information, i) => (
                        <Tr key={i}>
                           <Td>{i + 1}</Td>
                           <Td color='blue' textDecoration='underline'>
                              <NavLink to={`/informasi/${information._id}`}>
                                 {information.title}
                              </NavLink>
                           </Td>
                           <Td>
                              {' '}
                              {new Date(
                                 information.createdAt
                              ).toLocaleDateString('id', {
                                 weekday: 'long',
                                 year: 'numeric',
                                 month: 'long',
                                 day: 'numeric',
                                 hour: '2-digit',
                                 minute: '2-digit',
                              })}
                              <Text display='inline'> WIB</Text>
                           </Td>

                           <Td>
                              <HStack spacing={3}>
                                 <Button
                                    variant='solid'
                                    colorScheme='yellow'
                                    onClick={(e) =>
                                       handleModalInformation({
                                          isAdd: false,
                                          information,
                                       })
                                    }
                                 >
                                    <MdEdit size='24px' />
                                 </Button>
                                 <Button
                                    variant='solid'
                                    colorScheme='red'
                                    onClick={(e) =>
                                       handleOpenAlertDelete(information._id)
                                    }
                                 >
                                    <MdDelete size='24px' />
                                 </Button>
                              </HStack>
                           </Td>
                        </Tr>
                     ))}
                  </Tbody>
               </Table>
            </Box>
            <Pagination
               page={data?.page}
               pages={data?.pages}
               handlePagination={handlePagination}
            />
         </Box>

         {/* Alert Dialog */}
         <AlertDialogComponent
            header='Hapus Informasi'
            body='apakah anda yakin ingin menghapus?'
            isOpen={isOpenDelete}
            onClose={onCloseDelete}
            handleConfirm={handleDelete}
         />

         {/* Modal add and update */}
         <Modal
            isOpen={isOpen}
            onClose={onClose}
            size='lg'
            onOverlayClick={() => {
               setInformation({})
            }}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Tambah Informasi</ModalHeader>
               <ModalCloseButton _focus={{ outline: 'none' }} />
               <ModalBody pb='30px'>
                  <Formik
                     initialValues={{
                        title: information.title || '',
                        body: information.body || '',
                     }}
                     onSubmit={handleSubmit}
                     validationSchema={validationSchema}
                  >
                     {(props) => (
                        <Form>
                           <VStack spacing={3}>
                              <FormikControl
                                 control='input'
                                 name='title'
                                 label='Judul'
                                 required={true}
                              />
                              <FormikControl
                                 control='textEditor'
                                 name='body'
                                 label='Body'
                                 required={true}
                                 body={props.values?.body}
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

export default Information