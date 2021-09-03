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
   const { data, error } = useSWR(`/api/classrooms?members=${userState._id}`)

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

   const validationSchema = Yup.object({
      code: Yup.string().required('Kode diperlukan!'),
   })

   const handleSubmit = async (values, actions) => {
      actions.setSubmitting(true)

      try {
         const res = await classroomService.join(
            JSON.stringify(userState._id),
            values.code
         )
         mutate(`/api/classrooms?members=${userState._id}`)
         onClose()
         console.log(res)
         actions.setSubmitting(false)
         toast({
            title: 'Berhasil',
            description: 'Berhasil gabung kelas',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         toast({
            title: 'Gagal',
            description: error.response.data.message,
            status: 'warning',
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
         <Modal isOpen={isOpen} onClose={onClose} size='xs'>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Join Kelas</ModalHeader>
               <ModalCloseButton _focus={{ outline: 'none' }} />
               <ModalBody>
                  <Formik
                     initialValues={{
                        code: '',
                     }}
                     validationSchema={validationSchema}
                     onSubmit={handleSubmit}
                  >
                     {(props) => (
                        <Form>
                           <VStack spacing={5}>
                              <FormikControl
                                 control='input'
                                 name='code'
                                 label='Kode'
                                 required={true}
                                 placeholder='Masukan kode kelas'
                              />

                              <Button
                                 alignSelf='flex-end'
                                 variant='solid'
                                 bg='primary'
                                 color='#fff'
                                 type='submit'
                                 isLoading={props.isSubmitting}
                              >
                                 Join
                              </Button>
                           </VStack>
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
