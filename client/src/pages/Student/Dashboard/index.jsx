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
import React, { useContext } from 'react'
import { MdLocalLibrary } from 'react-icons/md'
import { AuthContext } from '../../../contexts/authContext/AuthContexts'

const Dashboard = () => {
   const { userState, userDispatch } = useContext(AuthContext)

   console.log(userState)
   return (
      <Box pt={['25px', '50px']} px={['25px', '100px']}>
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
               mt='50px'
               fontSize={['3xl', '4xl', '5xl', '6xl']}
               fontWeight='700'
            >
               Selamat Datang, <br /> Aldi Alfiansyah
            </Text>
            <Flex
               bg='white'
               borderRadius='lg'
               boxShadow='lg'
               p='30px'
               alignItems='center'
               height='max-content'
               gridGap='30px'
            >
               <Box bg='text' p='7px' borderRadius='lg'>
                  <MdLocalLibrary size='40px' color='#FCAD3D' />
               </Box>
               <Box display='flex' flexDirection='column'>
                  <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight='700'>
                     Kelas Terdaftar
                  </Text>
                  <Text fontSize={['xs', 'sm', 'md', 'lg']}>Kelas Terbuat</Text>
               </Box>
               <Text fontSize={['5xl']} color='text'>
                  8
               </Text>
            </Flex>
         </Flex>

         {/* Informasi */}
         <Box mt='50px' pb='30px'>
            <Text fontSize={['md', 'lg', 'xl', '2xl']} fontWeight='400'>
               Informasi
            </Text>

            <Box h='300px' overflow='auto'>
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
                     {[...Array(10).keys()].map((item, i) => (
                        <Tr key={i}>
                           <Td>{i + 1}</Td>
                           <Td>Pendaftaran siswa barutahun ajaran 2021/2022</Td>
                           <Td> 20 Desember 2020</Td>
                        </Tr>
                     ))}
                  </Tbody>
               </Table>
            </Box>
         </Box>
      </Box>
   )
}

export default Dashboard
