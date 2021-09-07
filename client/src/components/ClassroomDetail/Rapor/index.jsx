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
   Drawer,
   DrawerBody,
   DrawerCloseButton,
   DrawerContent,
   DrawerHeader,
   DrawerOverlay,
   Text,
   Badge,
   Table,
   Thead,
   Tbody,
   Td,
   Th,
   Tr,
} from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import CardRapor from '../../CardRapor'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../../Formik/FormikControl'

import { ClassroomContext } from '../../../contexts/classroomContext/classroomContext'
// import RaporService from '../../../services/RaporService'
import useSWR, { mutate } from 'swr'
import RaporService from '../../../services/RaporService'

const Rapor = () => {
   const toast = useToast()
   const { isOpen, onOpen, onClose } = useDisclosure()
   const {
      isOpen: isOpenDrawerDetail,
      onOpen: onOpenDrawerDetail,
      onClose: onCloseDrawerDetail,
   } = useDisclosure()
   const [studentSelected, setStudentSelected] = useState({})
   const { classroomState } = useContext(ClassroomContext)
   const [reportExist, setReportExist] = useState(false)

   const { data } = useSWR(`/api/reports/${classroomState._id}`)

   useEffect(() => {
      if (data?.report) {
         setReportExist(true)
      } else {
         setReportExist(false)
      }
   }, [data])

   const { data: dataTasks } = useSWR(`/api/tasks/${classroomState?._id}`)

   const { data: dataExams } = useSWR(`/api/exams/${classroomState?._id}`)

   // SECTION Drawer detail
   const handleOpenDrawerDetail = (student) => {
      setStudentSelected(student)
      onOpenDrawerDetail()
   }

   // SECTION Formik
   const validationSchema = Yup.object({
      pts: Yup.string().required('PTS diperlukan'),
      pas: Yup.string().required('PAS diperlukan'),
   })

   const handleOpenModalFormik = (isAdd) => {
      if (dataTasks?.tasks?.length < 5) {
         return toast({
            title: 'Warning',
            description: 'Buat tugas minimal 5',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      }

      if (dataExams?.exams?.length < 2) {
         return toast({
            title: 'Warning',
            description: 'Buat ujian minimal 2',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      }
      onOpen()
   }

   const handleSubmitRapor = async (values, actions) => {
      actions.setSubmitting(true)

      if (values.rh.length !== 5) {
         actions.setSubmitting(false)
         return toast({
            title: 'Warning',
            description: 'rata rata harian harus berjumlah 5',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      }

      try {
         const reqData = {
            ...values,
            classroom: JSON.stringify(classroomState._id),
         }

         if (reportExist) {
            await RaporService.update(classroomState._id, reqData)
         } else {
            await RaporService.create(reqData)
         }

         actions.setSubmitting(false)
         onClose()
         mutate(`/api/reports/${classroomState._id}`)
         mutate(`/api/tasks/${classroomState._id}`)
         mutate(`/api/examss/${classroomState._id}`)
         toast({
            title: 'Berhasi',
            description: `berhasil ${reportExist ? 'ubah' : 'tambah'} rapor`,
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         actions.setSubmitting(false)
         toast({
            title: 'Gagal',
            description: `gagal ${reportExist ? 'ubah' : 'tambah'} rapor`,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      }
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
            {reportExist ? 'Edit rapor' : 'Buat rapor'}
         </Button>
         <Text fontSize={['md', 'lg', 'xl', '2xl']} fontWeight='600' mb='30px'>
            ERapor
         </Text>
         <VStack spacing={5} alignItems='flex-start'>
            {data?.report?.members.length ? (
               data?.report?.members.map((item, i) => (
                  <CardRapor
                     key={i}
                     student={item.student}
                     handleOpenDrawerDetail={() => handleOpenDrawerDetail(item)}
                  />
               ))
            ) : (
               <Badge px={50} py={3} colorScheme='yellow'>
                  Anggota tidak ada
               </Badge>
            )}
         </VStack>

         {/* Modal add rapor */}
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Buat Rapor</ModalHeader>
               <ModalCloseButton _focus={{ outline: 'none' }} />
               <ModalBody>
                  {/* RH */}
                  <Box>
                     <Formik
                        initialValues={{
                           rh: data?.report?.rh || [],
                           pts: data?.report?.pts || '',
                           pas: data?.report?.pas || '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmitRapor}
                        enableReinitialize
                     >
                        {(props) => (
                           <Form>
                              <VStack spacing={5} alignItems='flex-start'>
                                 <VStack spacing={3} alignItems='flex-start'>
                                    <Text
                                       fontSize={['sm', 'md', 'lg', 'xl']}
                                       fontWeight='600'
                                    >
                                       Rata Rata Harian
                                    </Text>
                                    {dataTasks?.tasks?.map((task, i) => (
                                       <FormikControl
                                          key={i}
                                          control='checkbox'
                                          name='rh'
                                          label={task.title}
                                          value={task._id}
                                       />
                                    ))}
                                 </VStack>
                                 <VStack spacing={3} alignItems='flex-start'>
                                    <Text
                                       fontSize={['sm', 'md', 'lg', 'xl']}
                                       fontWeight='600'
                                    >
                                       PTS
                                    </Text>
                                    <FormikControl
                                       control='radio'
                                       name='pts'
                                       flexDirection='column'
                                       gridGap='10px'
                                       options={[
                                          ...dataExams?.exams?.map(
                                             (exam, i) => ({
                                                key: i,
                                                name: exam.title,
                                                value: exam._id,
                                             })
                                          ),
                                       ]}
                                    />
                                 </VStack>
                                 <VStack spacing={3} alignItems='flex-start'>
                                    <Text
                                       fontSize={['sm', 'md', 'lg', 'xl']}
                                       fontWeight='600'
                                    >
                                       PAS
                                    </Text>
                                    <FormikControl
                                       control='radio'
                                       name='pas'
                                       flexDirection='column'
                                       gridGap='10px'
                                       options={[
                                          ...dataExams?.exams?.map(
                                             (exam, i) => ({
                                                key: i,
                                                name: exam.title,
                                                value: exam._id,
                                             })
                                          ),
                                       ]}
                                    />
                                 </VStack>
                                 <Box
                                    pb='20px'
                                    display='flex'
                                    justifyContent='flex-end'
                                    w='100%'
                                 >
                                    <Button
                                       variant='solid'
                                       bg='primary'
                                       color='white'
                                       type='submit'
                                       isLoading={props.isSubmitting}
                                    >
                                       {reportExist ? 'Update' : 'Submit'}
                                    </Button>
                                 </Box>
                              </VStack>
                           </Form>
                        )}
                     </Formik>
                  </Box>
               </ModalBody>
            </ModalContent>
         </Modal>

         {/* Drawer Detail Rapor */}
         <Drawer
            isOpen={isOpenDrawerDetail}
            placement='right'
            onClose={onCloseDrawerDetail}
            size='md'
         >
            <DrawerOverlay />
            <DrawerContent>
               <DrawerCloseButton _focus={{ outline: 'none' }} />
               <DrawerHeader>
                  <Text fontSize={['lg', 'xl', '2xl']} fontWeight='600'>
                     ERapor
                  </Text>
               </DrawerHeader>

               <DrawerBody>
                  <VStack spacing={5} alignItems='flex-start'>
                     {/* Attedances */}
                     <Box>
                        <Text
                           fontSize={['sm', 'md', 'lg', 'xl']}
                           fontWeight='600'
                        >
                           Absensi
                        </Text>
                        <Table>
                           <Tbody>
                              <Tr>
                                 <Th>Hadir</Th>
                                 <Td>{studentSelected?.attedances?.present}</Td>
                              </Tr>
                              <Tr>
                                 <Th>Sakit</Th>
                                 <Td>{studentSelected?.attedances?.sick}</Td>
                              </Tr>
                              <Tr>
                                 <Th>Izin</Th>
                                 <Td>{studentSelected?.attedances?.permit}</Td>
                              </Tr>
                              <Tr>
                                 <Th>Tanpa keterangan</Th>
                                 <Td>{studentSelected?.attedances?.missing}</Td>
                              </Tr>
                           </Tbody>
                        </Table>
                     </Box>

                     {/* Scores */}
                     <Box>
                        <Text
                           fontSize={['sm', 'md', 'lg', 'xl']}
                           fontWeight='600'
                        >
                           Nilai
                        </Text>
                        <Table variant='simple'>
                           <Thead>
                              <Tr>
                                 <Th>RH</Th>
                                 <Th>PTS</Th>
                                 <Th>PAS</Th>
                                 <Th>Rapor</Th>
                              </Tr>
                           </Thead>
                           <Tbody>
                              <Tr>
                                 <Td>{studentSelected?.rhScore}</Td>
                                 <Td>{studentSelected?.ptsScore}</Td>
                                 <Td>{studentSelected?.pasScore}</Td>
                                 <Td>{studentSelected?.finalScore}</Td>
                              </Tr>
                           </Tbody>
                        </Table>
                     </Box>
                  </VStack>
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </Box>
   )
}

export default Rapor
