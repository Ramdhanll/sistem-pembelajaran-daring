import {
   Box,
   Divider,
   Text,
   Badge,
   Table,
   Tbody,
   Td,
   Th,
   Tr,
} from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { ClassroomContext } from '../../../contexts/classroomContext/classroomContext'
import useSWR from 'swr'
import { AuthContext } from '../../../contexts/authContext/AuthContexts'

const Report = () => {
   const { userState } = useContext(AuthContext)
   const { classroomState } = useContext(ClassroomContext)
   const [reportDetail, setReportDetail] = useState({})
   const { data } = useSWR(`/api/reports/${classroomState._id}`)

   useEffect(() => {
      if (data?.report) {
         const report = data?.report?.members?.find(
            (member) => member.student._id === userState._id
         )
         setReportDetail(report)
      }
   }, [data, userState._id])

   return (
      <>
         {data?.report ? (
            <Box
               bg='white'
               boxShadow='lg'
               borderRadius='md'
               py='10px'
               px='20px'
               display='flex'
               flexDirection='column'
               w={['100%', '100%', '100%', '80%']}
            >
               {/* Header */}
               <Box w='100%'>
                  <Text
                     textAlign='center'
                     fontSize={['xl', '2xl', '3xl', '4xl']}
                     fontWeight='600'
                     color='text'
                  >
                     RAPOR {classroomState.subject.toUpperCase()}
                  </Text>
                  <Divider h='3px' />
               </Box>

               {/* Information */}
               <Box
                  display='flex'
                  justifyContent='space-between'
                  mt='20px'
                  gridGap='30px'
                  flexDirection={['column', 'column', 'row', 'row']}
               >
                  {/* Information student */}
                  <Box flex='0.5'>
                     <Badge mb='10px'>Informasi siswa</Badge>
                     <Table variant='unstyled' size='sm'>
                        <Tbody>
                           <Tr>
                              <Th w='190px' color='text'>
                                 NIS
                              </Th>
                              <Td color='gray.500'>{userState?.nis}</Td>
                           </Tr>
                           <Tr>
                              <Th w='190px' color='text'>
                                 Nama
                              </Th>
                              <Td color='gray.500'>{userState?.name}</Td>
                           </Tr>
                           <Tr>
                              <Th w='190px' color='text'>
                                 Jenis Kelamin
                              </Th>
                              <Td color='gray.500'>
                                 {userState?.gender === 'L'
                                    ? 'Laki-laki'
                                    : 'Perempuan'}
                              </Td>
                           </Tr>
                        </Tbody>
                     </Table>
                  </Box>

                  {/* Information classroom */}
                  <Box flex='0.5'>
                     <Badge mb='10px'>Informasi kelas</Badge>
                     <Table variant='unstyled' size='sm'>
                        <Tbody>
                           <Tr>
                              <Th w='190px' color='text'>
                                 Mata Pelajaran
                              </Th>
                              <Td color='gray.500'>
                                 {classroomState?.subject}
                              </Td>
                           </Tr>
                           <Tr>
                              <Th w='190px' color='text'>
                                 Kelas
                              </Th>
                              <Td color='gray.500'>
                                 {classroomState?.classroom}
                              </Td>
                           </Tr>
                           <Tr>
                              <Th w='190px' color='text'>
                                 Guru
                              </Th>
                              <Td color='gray.500'>
                                 {classroomState?.teacher.name}
                              </Td>
                           </Tr>
                        </Tbody>
                     </Table>
                  </Box>
               </Box>
               <Divider h='3px' />
               {/* Scores */}
               <Box
                  display='flex'
                  justifyContent='space-between'
                  mt='20px'
                  gridGap='30px'
                  flexDirection={['column', 'column', 'row', 'row']}
               >
                  {/* Information student */}
                  <Box flex='0.5'>
                     <Badge mb='10px'>Informasi absensi</Badge>
                     <Table variant='unstyled' size='sm'>
                        <Tbody>
                           <Tr>
                              <Th w='190px' color='text'>
                                 Hadir
                              </Th>
                              <Td color='gray.500'>
                                 {reportDetail?.attedances?.present}
                              </Td>
                           </Tr>
                           <Tr>
                              <Th w='190px' color='text'>
                                 Sakit
                              </Th>
                              <Td color='gray.500'>
                                 {reportDetail?.attedances?.sick}
                              </Td>
                           </Tr>
                           <Tr>
                              <Th w='190px' color='text'>
                                 Izin
                              </Th>
                              <Td color='gray.500'>
                                 {reportDetail?.attedances?.permit}
                              </Td>
                           </Tr>
                           <Tr>
                              <Th w='190px' color='text'>
                                 Tanpa keterangan
                              </Th>
                              <Td color='gray.500'>
                                 {reportDetail?.attedances?.missing}
                              </Td>
                           </Tr>
                        </Tbody>
                     </Table>
                  </Box>

                  {/* Information score */}
                  <Box flex='0.5'>
                     <Badge mb='10px'>Informasi nilai</Badge>

                     <Table variant='unstyled' size='sm'>
                        <Tbody>
                           <Tr>
                              <Th w='190px' color='text'>
                                 RH
                              </Th>
                              <Td color='gray.500'>{reportDetail?.rhScore}</Td>
                           </Tr>
                           <Tr>
                              <Th w='190px' color='text'>
                                 PTS
                              </Th>
                              <Td color='gray.500'>{reportDetail?.ptsScore}</Td>
                           </Tr>
                           <Tr>
                              <Th w='190px' color='text'>
                                 PAS
                              </Th>
                              <Td color='gray.500'>{reportDetail?.pasScore}</Td>
                           </Tr>
                           <Tr>
                              <Th w='190px' color='text'>
                                 Rapor
                              </Th>
                              <Td color='gray.500'>
                                 {reportDetail?.finalScore}
                              </Td>
                           </Tr>
                        </Tbody>
                     </Table>
                  </Box>
               </Box>
            </Box>
         ) : (
            <Box
               bg='yellow'
               boxShadow='lg'
               borderRadius='md'
               py='10px'
               px='20px'
               display='flex'
               flexDirection='column'
               w={['100%', '100%', '100%', '80%']}
            >
               <Text fontSize={['sm', 'md', 'lg', 'xl']} textAlign='center'>
                  Rapor belum tersedia
               </Text>
            </Box>
         )}
      </>
   )
}

export default Report
