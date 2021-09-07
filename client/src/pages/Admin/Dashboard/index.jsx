import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { MdLocalLibrary } from 'react-icons/md'
import { GiTeacher } from 'react-icons/gi'
import { RiAdminFill } from 'react-icons/ri'
import { IoMdPeople } from 'react-icons/io'

import CardDashboard from '../../../components/CardDashboard'
import { AuthContext } from '../../../contexts/authContext/AuthContexts'
import TableInformations from '../../../components/TableInformations'

const Dashboard = () => {
   const { userState } = useContext(AuthContext)

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

            <TableInformations />
         </Box>
      </Box>
   )
}

export default Dashboard
