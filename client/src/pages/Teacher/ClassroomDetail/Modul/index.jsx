import { Box, VStack } from '@chakra-ui/react'
import React from 'react'
import CardModul from '../../../../components/CardModul'

const Modul = () => {
   return (
      <Box>
         <VStack spacing={5} alignItems='flex-start'>
            <CardModul
               title={'BAB 1 Perumusan dan penetapan pancasila asdasd'}
               date={'20 Desember 2020'}
            />
            <CardModul
               title={'BAB 1 Perumusan dan penetapan'}
               date={'20 Desember 2020'}
            />
            <CardModul
               title={'BAB 1 Perumusan dan penetapan pancasila asdasd asdasd'}
               date={'20 Desember 2020'}
            />
         </VStack>
      </Box>
   )
}

export default Modul
