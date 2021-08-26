import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const Silabus = () => {
   return (
      <Box>
         {/* Description Mata Pelajaran */}
         <Box>
            <Text fontWeight='600' fontSize={['md', 'lg', 'xl', '2xl']}>
               Deskripsi Mata Pelajaran
            </Text>
            <Text
               fontSize={['sm', 'md', 'lg', 'xl']}
               fontWeight='100'
               mt={['5px', '10px']}
               textAlign='justify'
            >
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
               quo laudantium velit itaque veniam unde adipisci sequi corrupti
               beatae dicta, magni hic, sunt consequatur alias aut ipsum vitae a
               quibusdam? Voluptatum veritatis ex delectus, expedita eveniet,
               iusto dicta optio aliquam dolor mollitia porro quibusdam ipsa
               neque exercitationem explicabo alias hic necessitatibus. Eos
               eveniet, magni a cupiditate ratione voluptatibus porro earum.
            </Text>
         </Box>

         {/* Bobot dan Penilaian */}
         {/* <Box mt={['25px', '50px']}>
            <Text fontWeight='600' fontSize={['md', 'lg', 'xl', '2xl']}>
               Penilaian dan Bobot
            </Text>
         </Box> */}
      </Box>
   )
}

export default Silabus
