import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const CardDashboard = ({ icon, title, description, num }) => {
   return (
      <Flex
         bg='white'
         borderRadius='lg'
         boxShadow='lg'
         p='20px'
         alignItems='center'
         height='max-content'
         gridGap='20px'
      >
         <Box bg='text' p='7px' borderRadius='lg'>
            {icon}
         </Box>
         <Box display='flex' flexDirection='column'>
            <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight='700'>
               {title}
            </Text>
            <Text fontSize={['xs', 'sm', 'md', 'lg']}>{description}</Text>
         </Box>
         <Text fontSize={['5xl']} color='text'>
            {num}
         </Text>
      </Flex>
   )
}

export default CardDashboard
