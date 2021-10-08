import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import useSWR from 'swr'
import NavbarLandingPage from '../../components/NavbarLandingPage'

const Information = (props) => {
   const { data } = useSWR(`/api/informations/${props.match.params.id}`)

   if (!data) return 'Loading'

   return (
      <>
         <NavbarLandingPage />
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
                  mt='20px'
                  fontSize={['1xl', '1xl', '5xl', '6xl']}
                  fontWeight='200'
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
      </>
   )
}

export default Information
