import {
   Avatar,
   Badge,
   Box,
   Flex,
   HStack,
   Text,
   VStack,
} from '@chakra-ui/react'
import React from 'react'
import { MdAccessTime, MdDateRange, MdPeople } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
const CardClass = ({
   title,
   description,
   teacher,
   date,
   time,
   members,
   status,
}) => {
   return (
      <NavLink to='/t/kelas/asdasd'>
         <Box
            display='flex'
            bg='white'
            boxShadow='lg'
            borderRadius='lg'
            minW={['330px', '360px', '380px']}
         >
            <Flex
               direction='column'
               minW={['330px', '360px', '380px']}
               borderRadius='lg'
            >
               <Box
                  bg={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                  py='20px'
                  px='25px'
                  borderTopLeftRadius='lg'
                  borderTopRightRadius='lg'
               >
                  <Flex direction='column'>
                     <Text fontWeight='600' fontSize={['md', 'lg', 'xl']}>
                        {title}
                     </Text>
                     <Text
                        fontWeight='300'
                        color='textSecondary'
                        fontSize={['sm', 'md', 'lg']}
                     >
                        {description}
                     </Text>
                  </Flex>
               </Box>
               <Box
                  pl='70px'
                  py='20px'
                  px='25px'
                  display='flex'
                  alignItems='flex-start'
                  gridGap='7'
                  minW={['330px', '360px', '380px']}
               >
                  <Avatar
                     name='Dan Abrahmov'
                     src='https://bit.ly/dan-abramov'
                     size='lg'
                  />
                  <VStack spacing={3} alignItems='flex-start'>
                     <Text fontWeight='600' fontSize={['md', 'lg', 'xl']}>
                        {teacher}
                     </Text>
                     <HStack spacing={2} alignItems='center'>
                        <MdDateRange size='24px' />
                        <Text
                           fontWeight='300'
                           color='textSecondary'
                           fontSize={['sm', 'md', 'lg']}
                        >
                           {date}
                        </Text>
                     </HStack>
                     <HStack spacing={2} alignItems='center'>
                        <MdAccessTime size='24px' />
                        <Text
                           fontWeight='300'
                           color='textSecondary'
                           fontSize={['sm', 'md', 'lg']}
                        >
                           {time} WIB
                        </Text>
                     </HStack>
                     <HStack spacing={2} alignItems='center'>
                        <MdPeople size='24px' />
                        <Text
                           fontWeight='300'
                           color='textSecondary'
                           fontSize={['sm', 'md', 'lg']}
                        >
                           {members} Orang
                        </Text>
                     </HStack>

                     <Badge colorScheme='green' px={4} py={1}>
                        {status}
                     </Badge>
                  </VStack>
               </Box>
            </Flex>
         </Box>
      </NavLink>
   )
}

export default CardClass
