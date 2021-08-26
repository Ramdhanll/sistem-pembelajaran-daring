import {
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
   Text,
   useDisclosure,
   VStack,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { MdAdd } from 'react-icons/md'
import CardClass from '../../../components/CardClass'
import * as Yup from 'yup'
import FormikControl from '../../../Formik/FormikControl'
import randomString from 'randomstring'

const Classroom = () => {
   const { isOpen, onOpen, onClose } = useDisclosure()

   const openModalAdd = () => {
      onOpen()
   }

   // SECTION Formik

   const initialValues = {
      subject: '',
      description: '',
      classroom: '',
      code: '',
   }

   const validationSchema = Yup.object({
      subject: Yup.string().required('Mata pelajaran diperlukan!'),
      description: Yup.string().required('Deskripsi diperlukan!'),
      classroom: Yup.string().required('Kelas diperlukan!'),
      school_year: Yup.string().required('Tahun ajaran!'),
      code: Yup.string().required('Kode diperlukan!'),
   })

   const handleSubmit = (values, actions) => {
      console.log(values)

      actions.setSubmitting(false)
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
               onClick={openModalAdd}
            >
               <MdAdd size='24px' />
            </Button>
         </Flex>
         <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight='700' mt='50px'>
            Kelas 7
         </Text>

         <Flex mt='30px' gridGap='10' overflow='auto'>
            <CardClass
               title='Pendidikan Kewarganegaraan'
               description='Kelas 7 B'
               teacher='Uzumaki Naruto'
               date='Selasa'
               time='07:00 - 08:00'
               members='24'
               status='active'
            />

            <CardClass
               title='Pendidikan Kewarganegaraan'
               description='Kelas 7 B'
               teacher='Uzumaki Naruto'
               date='Selasa'
               time='07:00 - 08:00'
               members='24'
               status='active'
            />
         </Flex>

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
