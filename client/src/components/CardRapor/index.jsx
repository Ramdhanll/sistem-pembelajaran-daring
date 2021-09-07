import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const CardRapor = ({ student, handleOpenDrawerDetail }) => {
   return (
      <Box w='100%'>
         <Flex gridGap='10px' minH='85px'>
            <Box
               as='button'
               _hover={{
                  backgroundColor: '#ebf5ed',
               }}
               _active={{
                  backgroundColor: '#e6ede7',
               }}
               onClick={() => handleOpenDrawerDetail(student)}
               bg='white'
               borderRadius='lg'
               px='15px'
               py='10px'
               border='1px solid #888888'
               display='flex'
               gridGap='20px'
               alignItems='center'
               w={['100%', '90%', '80%', '70%']}
            >
               <Box
                  borderRadius='100%'
                  w='50px'
                  h='50px'
                  bg='#9F9F9F'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
               >
                  <Avatar name={student.name} src={student.photo} />
               </Box>
               <Box textAlign='left' flex='1'>
                  <Text>{student.name}</Text>
               </Box>
            </Box>
         </Flex>
      </Box>
   )
}

export default CardRapor
