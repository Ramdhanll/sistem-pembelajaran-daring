import {
   Box,
   Flex,
   HStack,
   Table,
   TableCaption,
   Tbody,
   Td,
   Text,
   Tfoot,
   Th,
   Thead,
   Tr,
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import useSWR from 'swr'
import { AuthContext } from '../../contexts/authContext/AuthContexts'

const Information = (props) => {
   const { userState, userDispatch } = useContext(AuthContext)
   const { data, error } = useSWR(`/api/informations/${props.match.params.id}`)

   console.log(data)

   if (!data) return 'Loading'

   return (
      <Box pt={['25px', '50px']} px={['25px', '30px', '50px', '100px']}>
         {/* Header */}
         <Text fontSize={['md', 'lg', 'xl', '2xl']} fontWeight='400'>
            Informasi dan Berita
         </Text>

         <Flex
            direction='column'
            gridGap='3'
            alignItems='flex-start'
            justifyContent='flex-start'
         >
            <Text
               w='max-content'
               mt='25px'
               fontSize={['3xl', '4xl', '5xl', '6xl']}
               fontWeight='700'
            >
               {data?.information.title}
            </Text>
            <Box
               w={['100%', '80%', '90%', '70%']}
               fontSize={['sm', 'md', 'lg', 'xl']}
               dangerouslySetInnerHTML={{ __html: data?.information.body }}
            />
         </Flex>
      </Box>
   )
}

export default Information
