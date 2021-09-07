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
} from '@chakra-ui/react'
import React, { useContext, useRef, useState } from 'react'
import CardModul from '../../../components/CardModul'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../../Formik/FormikControl'

import { ClassroomContext } from '../../../contexts/classroomContext/classroomContext'
import ModuleService from '../../../services/ModuleService'
import useSWR, { mutate } from 'swr'
import ReactPlayer from 'react-player'
import { AuthContext } from '../../../contexts/authContext/AuthContexts'

const Modul = () => {
   const toast = useToast()
   const { isOpen, onOpen, onClose } = useDisclosure()
   const {
      isOpen: isOpenDrawerDetail,
      onOpen: onOpenDrawerDetail,
      onClose: onCloseDrawerDetail,
   } = useDisclosure()
   const [moduleSelected, setModuleSelected] = useState({})
   const { userState } = useContext(AuthContext)
   const { classroomState } = useContext(ClassroomContext)

   const { data } = useSWR(`/api/modules/${classroomState?._id}`)

   // SECTION Drawer detail

   const handleOpenDrawerDetail = (module) => {
      setModuleSelected(module)
      onOpenDrawerDetail()
   }

   // SECTION Formik
   const [documentUpload, setDocumentUpload] = useState(null)
   const documentRef = useRef(null)
   const [videoUpload, setVideoUpload] = useState(null)
   const videoRef = useRef(null)
   const [isAdd, setIsAdd] = useState(true)

   const validationSchema = Yup.object({
      title: Yup.string().required('Judul diperlukan'),
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

   const handleUploadVideo = (e) => {
      const file = e.target.files[0]
      const extension = file.name.slice(file.name.indexOf('.') + 1)

      if (extension !== 'mp4') {
         videoRef.current.value = ''

         return toast({
            title: 'Gagal upload',
            description: 'File harus berupa MP4',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      }
      if (file?.size > 50_000_000) {
         videoRef.current.value = ''

         return toast({
            title: 'Gagal upload',
            description: 'File lebih dari 50mb',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } else {
         return setVideoUpload(file)
      }
   }

   const handleSubmit = async (values, actions) => {
      actions.setSubmitting(false)

      const bodyFormData = new FormData()

      bodyFormData.append('classroom', JSON.stringify(classroomState._id))
      bodyFormData.append('title', values.title)
      bodyFormData.append('body', values.body)
      bodyFormData.append('document', documentUpload)
      bodyFormData.append('video', videoUpload)

      try {
         if (isAdd) {
            await ModuleService.create(bodyFormData)
         } else {
            await ModuleService.update(moduleSelected._id, bodyFormData)
         }

         mutate(`/api/modules/${classroomState?._id}`)
         onClose()
         setDocumentUpload(null)
         setVideoUpload(null)
         setModuleSelected({})
         toast({
            title: 'Berhasil',
            description: 'berhasil membuat modul',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         toast({
            title: 'Gagal',
            description: 'gagal membuat modul',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      }
   }

   // SECTION Formik Edit
   const handleOpenModalEdit = (module) => {
      setIsAdd(false)
      setModuleSelected(module)
      onOpen()
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
            {data?.modules?.length ? (
               data?.modules.map((module, i) => (
                  <CardModul
                     key={i}
                     module={module}
                     handleOpenDrawerDetail={handleOpenDrawerDetail}
                     handleOpenModalEdit={handleOpenModalEdit}
                  />
               ))
            ) : (
               <Badge px={50} py={3} colorScheme='yellow'>
                  Modul belum tersedia
               </Badge>
            )}
         </VStack>

         {/* Modal add and edit */}
         <Modal
            isOpen={isOpen}
            onClose={onClose}
            onOverlayClick={() => setModuleSelected({})}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Form Modul</ModalHeader>
               <ModalCloseButton _focus={{ outline: 'none' }} />
               <ModalBody>
                  <Formik
                     initialValues={{
                        title: moduleSelected?.title || '',
                        body: moduleSelected?.body || '',
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
                              <FormControl id='video'>
                                 <FormLabel>Video</FormLabel>
                                 <Input
                                    type='file'
                                    onChange={(e) => handleUploadVideo(e)}
                                    ref={videoRef}
                                 />
                                 <FormHelperText>MP4 only.</FormHelperText>
                              </FormControl>

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

         {/* Drawer Detail Modul */}
         <Drawer
            isOpen={isOpenDrawerDetail}
            placement='right'
            onClose={onCloseDrawerDetail}
            size='lg'
            onOverlayClick={() => setModuleSelected({})}
         >
            <DrawerOverlay />
            <DrawerContent>
               <DrawerCloseButton _focus={{ outline: 'none' }} />
               <DrawerHeader>
                  <Text fontSize={['lg', 'xl', '2xl']} fontWeight='600'>
                     {moduleSelected?.title}
                  </Text>
                  <Text
                     color='textSecondary'
                     fontSize={['xs', 'sm', 'md']}
                     mt='5px'
                  >
                     {new Date(moduleSelected?.createdAt).toLocaleDateString(
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
                     dangerouslySetInnerHTML={{ __html: moduleSelected?.body }}
                  />

                  {moduleSelected.video && (
                     <VStack spacing={4} alignItems='flex-start' mt='20px'>
                        <Badge variant='subtle' colorScheme='green'>
                           Materi Vidio
                        </Badge>

                        <Box>
                           <ReactPlayer
                              url={moduleSelected?.video}
                              controls={true}
                           />
                        </Box>
                     </VStack>
                  )}

                  {moduleSelected.document && (
                     <VStack spacing={4} alignItems='flex-start' mt='20px'>
                        <Badge variant='subtle' colorScheme='green'>
                           Lampiran
                        </Badge>
                        <Link href={moduleSelected?.document} isExternal>
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

export default Modul
