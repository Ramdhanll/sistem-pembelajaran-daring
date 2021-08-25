import { Avatar, Box, Flex } from '@chakra-ui/react'
import React from 'react'

const CardClass = () => {
   return (
      <Box py='20px' px='10px' bg='white' boxShadow='lg' borderRadius='md'>
         <Flex>
            <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
         </Flex>
      </Box>
   )
}

export default CardClass
