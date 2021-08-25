import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import CardClass from '../../../components/CardClass'

const Classroom = () => {
   return (
      <Box pt={['25px', '50px']} px={['50px', '100px']}>
         {/* Header */}
         <Text fontSize={['md', 'lg', 'xl', '2xl']} fontWeight='400'>
            Daftar Kelas
         </Text>

         <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight='700' mt='50px'>
            Daftar Kelas
         </Text>

         <Flex mt='30px'>
            <CardClass />
         </Flex>
      </Box>
   )
}

export default Classroom
