import {
   Box,
   Table,
   TableCaption,
   Tbody,
   Td,
   Th,
   Thead,
   Tr,
   Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import useSWR from 'swr'
import Pagination from '../Pagination'

const TableInformations = () => {
   const [pageIndex, setPageIndex] = useState(1)
   const { data: dataInformation } = useSWR(
      `/api/informations?page=${pageIndex}`
   )

   const handlePagination = (value) => {
      setPageIndex(value)
   }

   return (
      <>
         <Box h={['60vh', '340px']} mt='20px' overflow='auto' mb='30px'>
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
                        <Td>{i + 1 + 10 * (dataInformation?.page - 1)}</Td>
                        <Td color='blue' textDecoration='underline'>
                           <NavLink to={`/informasi/${information._id}`}>
                              {information.title}
                           </NavLink>
                        </Td>
                        <Td>
                           {' '}
                           {new Date(information.createdAt).toLocaleDateString(
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
      </>
   )
}

export default TableInformations
