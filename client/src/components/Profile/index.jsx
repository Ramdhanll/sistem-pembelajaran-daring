import {
   Box,
   VStack,
   Text,
   Avatar,
   Table,
   Tbody,
   Tr,
   Th,
   Td,
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext/AuthContexts'

const Profile = () => {
   const { userState } = useContext(AuthContext)
   console.log(userState)
   return (
      <Box
         display='flex'
         justifyContent='center'
         pt={['25px', '50px']}
         px={['25px', '100px']}
      >
         <Box
            w='sm'
            boxShadow='lg'
            borderRadius='md'
            display='flex'
            justifyContent='center'
            alignItems='center'
            bg='#26235C'
            py='30px'
            px='10px'
            flexDirection='column'
            gridGap='20px'
         >
            <Avatar size='xl' name={userState.name} src={userState?.photo} />
            <VStack spacing={1}>
               <Text
                  color='white'
                  fontWeight='600'
                  fontSize={['sm', 'md', 'lg', 'xl']}
               >
                  {userState?.name}
               </Text>
               <Text color='gray.500' fontSize={['xs', 'sm', 'md', 'lg']}>
                  {userState?.role === 'teacher'
                     ? 'Guru'
                     : userState?.role === 'student'
                     ? 'Siswa'
                     : 'Admin'}
               </Text>
            </VStack>
            <Box>
               <Table variant='unstyled'>
                  <Tbody>
                     <Tr>
                        <Th
                           textAlign='left'
                           w='190px'
                           color='white'
                           fontSize={['xs', 'sm']}
                        >
                           NIS
                        </Th>
                        <Td color='gray.500' fontSize={['xs', 'sm']}>
                           {userState.nis}
                        </Td>
                     </Tr>
                     <Tr>
                        <Th w='190px' color='white' fontSize={['xs', 'sm']}>
                           Jenis kelamin
                        </Th>
                        <Td color='gray.500' fontSize={['xs', 'sm']}>
                           {userState.gender === 'L'
                              ? 'Laki-laki'
                              : 'Perempuan'}
                        </Td>
                     </Tr>
                     <Tr>
                        <Th w='190px' color='white' fontSize={['xs', 'sm']}>
                           Tahuan masuk
                        </Th>
                        <Td color='gray.500' fontSize={['xs', 'sm']}>
                           {userState.year_of_entry}
                        </Td>
                     </Tr>
                  </Tbody>
               </Table>
            </Box>
         </Box>
      </Box>
   )
}

export default Profile
