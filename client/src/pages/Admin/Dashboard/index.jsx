import {
   Box,
   Flex,
   HStack,
   Table,
   TableCaption,
   Tbody,
   Td,
   Text,
   Tfoot,
   Th,
   Thead,
   Tr,
} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { MdLocalLibrary } from 'react-icons/md'
import { GiTeacher } from 'react-icons/gi'
import { RiAdminFill } from 'react-icons/ri'
import { IoMdPeople } from 'react-icons/io'

import CardDashboard from '../../../components/CardDashboard'
import { AuthContext } from '../../../contexts/authContext/AuthContexts'
import useSWR from 'swr'
import { NavLink } from 'react-router-dom'
import Pagination from '../../../components/Pagination'

const Dashboard = () => {
   const { userState, userDispatch } = useContext(AuthContext)

   const [pageIndex, setPageIndex] = useState(1)
   const { data: dataInformation, error } = useSWR(
      `/api/informations?page=${pageIndex}`
   )

   const handlePagination = (value) => {
      setPageIndex(value)
   }

   return (
      <Box pt={['25px', '50px']} px={['25px', '30px', '50px', '100px']}>
         {/* Header */}
         <Text fontSize={['md', 'lg', 'xl', '2xl']} fontWeight='400'>
            Dashboard
         </Text>

         <Flex
            direction={['column', 'row']}
            gridGap={['5', '10']}
            alignItems={['flex-start', 'center']}
         >
            <Text
               w='max-content'
               mt={['25px', '30px', '50px', '50px']}
               fontSize={['3xl', '4xl', '5xl', '6xl']}
               fontWeight='700'
            >
               Selamat Datang, <br /> {userState.name}
            </Text>

            <Flex
               flex='1'
               wrap='wrap'
               gridGap='15px'
               align='center'
               justifyContent={['flex-start', 'flex-end']}
            >
               <CardDashboard
                  icon={<MdLocalLibrary size='40px' color='#FCAD3D' />}
                  title='Kelas'
                  description='kelas terdaftar'
                  num='8'
               />

               <CardDashboard
                  icon={<RiAdminFill size='40px' color='#FCAD3D' />}
                  title='Admin'
                  description='admin terdaftar'
                  num='8'
               />
               <CardDashboard
                  icon={<GiTeacher size='40px' color='#FCAD3D' />}
                  title='Guru'
                  description='guru terdaftar'
                  num='8'
               />

               <CardDashboard
                  icon={<IoMdPeople size='40px' color='#FCAD3D' />}
                  title='Siswa'
                  description='siswa terdaftar'
                  num='200'
               />
            </Flex>
         </Flex>

         {/* Informasi */}
         <Box mt='50px' pb='30px'>
            <Text fontSize={['md', 'lg', 'xl', '2xl']} fontWeight='400'>
               Informasi
            </Text>

            <Box h={['60vh', '300px']} mt='20px' overflow='auto' mb='30px'>
               <Table variant='striped' colorScheme='teal' mt='20px'>
                  <TableCaption>SMP Dharma Bhakti Tangerang</TableCaption>
                  <Thead>
                     <Tr>
                        <Th>No</Th>
                        <Th>Judul</Th>
                        <Th>Tanggal</Th>
                     </Tr>
                  </Thead>
                  <Tbody>
                     {dataInformation?.informations.map((information, i) => (
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
                        </Tr>
                     ))}
                  </Tbody>
               </Table>
            </Box>
            <Pagination
               page={dataInformation?.page}
               pages={dataInformation?.pages}
               handlePagination={handlePagination}
            />
         </Box>
      </Box>
   )
}

export default Dashboard
