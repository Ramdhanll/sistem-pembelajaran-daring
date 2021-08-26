import { Box, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = ({ id }) => {
   return (
      <HStack
         mb={['25px', '50px']}
         spacing={['30px', '60px']}
         overflow='auto'
         bg='white'
         px='30px'
         py='10px'
         borderRadius='md'
         boxShadow='lg'
         w={['', '', '', 'max-content']}
      >
         <NavLink to={`/t/kelas/${id}`} activeStyle={styles.active} exact>
            <Text fontSize={['lg', 'xl', '2xl']}>Info</Text>
         </NavLink>
         <NavLink to={`/t/kelas/${id}/silabus`} activeStyle={styles.active}>
            <Text fontSize={['lg', 'xl', '2xl']}>Silabus</Text>
         </NavLink>
         <NavLink to={`/t/kelas/${id}/modul`} activeStyle={styles.active}>
            <Text fontSize={['lg', 'xl', '2xl']}>Modul</Text>
         </NavLink>
         <NavLink to={`/t/kelas/${id}/absen`} activeStyle={styles.active}>
            <Text fontSize={['lg', 'xl', '2xl']}>Absen</Text>
         </NavLink>
         <NavLink to={`/t/kelas/${id}/tugas`} activeStyle={styles.active}>
            <Text fontSize={['lg', 'xl', '2xl']}>Tugas</Text>
         </NavLink>
         <NavLink to={`/t/kelas/${id}/ujian`} activeStyle={styles.active}>
            <Text fontSize={['lg', 'xl', '2xl']}>Ujian</Text>
         </NavLink>
         <NavLink to={`/t/kelas/${id}/rapor`} activeStyle={styles.active}>
            <Text fontSize={['lg', 'xl', '2xl']}>Rapor</Text>
         </NavLink>
      </HStack>
   )
}

const styles = {
   active: {
      borderBottomColor: '#34364A',
      borderBottomWidth: '5px',
      fontWeight: 600,
      borderRadius: '2px',
   },
}

export default Navigation
