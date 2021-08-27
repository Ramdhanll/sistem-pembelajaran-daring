import {
   Box,
   Button,
   Flex,
   HStack,
   Image,
   Table,
   TableCaption,
   Tbody,
   Td,
   Text,
   Tfoot,
   Th,
   Thead,
   Tr,
   Avatar,
   Link,
   useDisclosure,
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import useSWR from 'swr'
import { MdMenu } from 'react-icons/md'
import { AuthContext } from '../../contexts/authContext/AuthContexts'
import NavbarLandingPage from '../../components/NavbarLandingPage'

const Information = (props) => {
   const { isOpen, onOpen, onClose } = useDisclosure()
   const { data, error } = useSWR(`/api/informations/${props.match.params.id}`)

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
      </>
   )
}

export default Information
