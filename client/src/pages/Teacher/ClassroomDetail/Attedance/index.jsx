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
} from '@chakra-ui/react'
import React, { useContext, useRef, useState } from 'react'
import CardAttedance from '../../../../components/CardAttedance'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../../../Formik/FormikControl'
import { ClassroomContext } from '../../../../contexts/classroomContext/classroomContext'
import AttedanceService from '../../../../services/AttedanceService'
import useSWR, { mutate } from 'swr'
import ReactPlayer from 'react-player'

const Attedance = () => {
   const toast = useToast()
   const { isOpen, onOpen, onClose } = useDisclosure()
   const {
      isOpen: isOpenDrawerDetail,
      onOpen: onOpenDrawerDetail,
      onClose: onCloseDrawerDetail,
   } = useDisclosure()
   const [attedanceSelected, setAttedanceSelected] = useState({})

   const { classroomState, classroomDispatch } = useContext(ClassroomContext)

   const { data, error } = useSWR(`/api/attedances/${classroomState?._id}`)

   // SECTION Drawer detail

   const handleOpenDrawerDetail = (attedance) => {
      setAttedanceSelected(attedance)
      onOpenDrawerDetail()
   }

   // SECTION Formik
   const [isAdd, setIsAdd] = useState(true)

   const validationSchema = Yup.object({
      title: Yup.string().required('Judul diperlukan'),
   })

   const handleOpenModalFormik = (isAdd) => {
      setIsAdd(isAdd)
      onOpen()
   }

   const handleSubmit = async (values, actions) => {
      actions.setSubmitting(false)

      const reqData = {
         ...values,
         classroom: JSON.stringify(classroomState._id),
      }

      try {
         if (isAdd) {
            await AttedanceService.create(reqData)
         } else {
            await AttedanceService.update(attedanceSelected._id, reqData)
         }

         mutate(`/api/attedances/${classroomState?._id}`)
         onClose()
         setAttedanceSelected({})
         toast({
            title: 'Berhasil',
            description: 'berhasil membuat attedance',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         toast({
            title: 'Gagal',
            description: 'gagal membuat attedance',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      }
   }

   // SECTION Formik Edit
   const handleOpenModalEdit = (attedance) => {
      setIsAdd(false)
      setAttedanceSelected(attedance)
      onOpen()
   }
   return (
      <Box>
         <Button
            variant='solid'
            bg='primary'
            color='white'
            mb='20px'
            onClick={() => handleOpenModalFormik(true)}
         >
            Tambah
         </Button>
         {data?.attedances?.length ? (
            <VStack spacing={5} alignItems='flex-start'>
               {data?.attedances.map((attedance, i) => (
                  <CardAttedance
                     key={i}
                     attedance={attedance}
                     handleOpenDrawerDetail={handleOpenDrawerDetail}
                     handleOpenModalEdit={handleOpenModalEdit}
                  />
               ))}
            </VStack>
         ) : null}

         {/* Modal add and edit */}
         <Modal
            isOpen={isOpen}
            onClose={onClose}
            onOverlayClick={() => setAttedanceSelected({})}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Form Absen</ModalHeader>
               <ModalCloseButton _focus={{ outline: 'none' }} />
               <ModalBody>
                  <Formik
                     initialValues={{
                        title: attedanceSelected?.title || '',
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

         {/* Drawer Detail Attedance */}
         <Drawer
            isOpen={isOpenDrawerDetail}
            placement='right'
            onClose={onCloseDrawerDetail}
            size='lg'
            onOverlayClick={() => setAttedanceSelected({})}
         >
            <DrawerOverlay />
            <DrawerContent>
               <DrawerCloseButton _focus={{ outline: 'none' }} />
               <DrawerHeader>
                  <Text fontSize={['lg', 'xl', '2xl']} fontWeight='600'>
                     {attedanceSelected?.title}
                  </Text>
                  <Text
                     color='textSecondary'
                     fontSize={['xs', 'sm', 'md']}
                     mt='5px'
                  >
                     {new Date(attedanceSelected?.createdAt).toLocaleDateString(
                        'id',
                        {
                           weekday: 'long',
                           year: 'numeric',
                           month: 'long',
                           day: 'numeric',
                           hour: '2-digit',
                           minute: '2-digit',
                        }
                     )}
                  </Text>
               </DrawerHeader>

               <DrawerBody>
                  <Box
                     fontSize={['sm', 'md', 'lg']}
                     mt='10px'
                     fontWeight='100'
                     dangerouslySetInnerHTML={{
                        __html: attedanceSelected?.body,
                     }}
                  />

                  {attedanceSelected.video && (
                     <VStack spacing={4} alignItems='flex-start' mt='20px'>
                        <Badge variant='subtle' colorScheme='green'>
                           Materi Vidio
                        </Badge>

                        <Box>
                           <ReactPlayer
                              url={attedanceSelected?.video}
                              controls={true}
                           />
                        </Box>
                     </VStack>
                  )}

                  {attedanceSelected.document && (
                     <VStack spacing={4} alignItems='flex-start' mt='20px'>
                        <Badge variant='subtle' colorScheme='green'>
                           Lampiran
                        </Badge>
                        <Link href={attedanceSelected?.document} isExternal>
                           <Image
                              w='70px'
                              h='70px'
                              src={'http://localhost:5000/uploads/pdf-icon.png'}
                           />
                           click me
                        </Link>
                     </VStack>
                  )}
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </Box>
   )
}

export default Attedance
