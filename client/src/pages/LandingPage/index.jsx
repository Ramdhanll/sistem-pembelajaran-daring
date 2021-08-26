import {
   Box,
   Button,
   Drawer,
   DrawerBody,
   DrawerCloseButton,
   DrawerContent,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   Flex,
   Image,
   Link,
   Text,
   Input,
   useDisclosure,
   VStack,
   Avatar,
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { MdMenu } from 'react-icons/md'
import { AuthContext } from '../../contexts/authContext/AuthContexts'

const LandingPage = () => {
   const { userState } = useContext(AuthContext)
   const { isOpen, onOpen, onClose } = useDisclosure()

   return (
      <Box>
         {/* Navbar */}
         <Flex
            h='80px'
            p={['7px 25px', '15px 50px']}
            alignItems='center'
            justifyContent='space-between'
         >
            <Image
               boxSize='50px'
               borderRadius='full'
               objectFit='cover'
               src='https://images.unsplash.com/photo-1587653559430-aadd3ac46e3f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=819&q=80'
               alt='Segun Adebayo'
            />

            {/* Burger Bar For Handphone */}
            <Box display={['flex', 'none']}>
               <Button onClick={onOpen}>
                  <MdMenu />
               </Button>
            </Box>

            <Box
               flex='1'
               display={['none', 'flex']}
               alignItems='center'
               justifyContent='space-between'
            >
               {/* Nav */}
               <Flex
                  alignItems='center'
                  ml='50px'
                  justifyContent='space-between'
                  w='250px'
               >
                  <Link
                     href='#home'
                     _hover={{
                        textDecoration: 'none',
                     }}
                     _focus={{
                        outline: 'none',
                     }}
                  >
                     Home
                  </Link>
                  <Link
                     href='#sejarah'
                     _hover={{
                        textDecoration: 'none',
                     }}
                     _focus={{
                        outline: 'none',
                     }}
                  >
                     Sejarah
                  </Link>
                  <Link
                     href='#visi-misi'
                     _hover={{
                        textDecoration: 'none',
                     }}
                     _focus={{
                        outline: 'none',
                     }}
                  >
                     Visi dan Misi
                  </Link>
               </Flex>

               {userState ? (
                  <NavLink to={localStorage.getItem('goto')}>
                     <Flex
                        alignItems='center'
                        justifyContent='space-between'
                        bg='#fff'
                     >
                        <Text mr='30px'>{userState.name}</Text>
                        <Avatar name='Dan Abrahmov' src={userState.photo} />
                     </Flex>
                  </NavLink>
               ) : (
                  <NavLink to='/login'>
                     <Button variant='solid' bg='#E5E9F2'>
                        Masuk
                     </Button>
                  </NavLink>
               )}
            </Box>
         </Flex>

         {/* Home */}
         <Box
            h='90vh'
            id='home'
            display='flex'
            px={['25px', '100px']}
            pt={['20px', '80px']}
            mb='30px'
            overflow='hidden'
            flexDirection={['column-reverse', 'row']}
         >
            <Box flex='0.7' mt={['20px', '0', '0', '0px']}>
               <Text
                  fontSize={['2xl', '3xl', '4xl', '5xl']}
                  fontWeight='700'
                  textAlign='left'
               >
                  SMP DHARMA BHAKTI TANGERANG
               </Text>
               <Text
                  mt={['20px', '40px']}
                  w='90%'
                  fontSize={['md', 'lg', 'xl']}
                  textAlign='justify'
               >
                  t aut fugit, sed quia consequuntur magni dolores eos qui
                  ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                  qui dolorem ipsum quia dolor sit amet, consectetur,
               </Text>
            </Box>

            <Box
               flex='0.5'
               display='flex'
               alignItems='center'
               justifyContent='center'
            >
               <Image
                  // boxSize={['full', '400px']}
                  w='full'
                  h={['300px', '400px']}
                  borderRadius='lg'
                  objectFit='cover'
                  src='https://images.unsplash.com/photo-1554435493-93422e8220c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80'
                  alt='Segun Adebayo'
               />
            </Box>
         </Box>

         {/* Sejarah */}
         <Box
            bg='#ECEEF2'
            h='max-content'
            px={['25px', '100px']}
            pt={['40px', '80px']}
            pb={['40px', '80px']}
            id='sejarah'
            mb='30px'
         >
            <Text fontWeight='700' fontSize={['2xl', '3xl', '4xl', '5xl']}>
               Sejarah
            </Text>
            <Flex mt={['20px', '50px']} flexDirection={['column', 'row']}>
               <Box flex='0.5'>
                  <Image
                     w='full'
                     h={['300px', '400px']}
                     // boxSize={['300px', '400px']}
                     borderRadius='lg'
                     objectFit='cover'
                     src='https://images.unsplash.com/photo-1581362072978-14998d01fdaa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=331&q=80'
                     alt='Segun Adebayo'
                  />
               </Box>

               <Box flex='0.7'>
                  <Text
                     fontSize={['sm', 'md', 'lg', 'xl']}
                     textAlign='justify'
                     ml={['0px', '50px']}
                     mt={['30px', '0px']}
                  >
                     t aut fugit, sed quia consequuntur magni dolores eos qui
                     ratione voluptatem sequi nesciunt. Neque porro quisquam
                     est, qui dolorem ipsum quia dolor sit amet, consectetur, t
                     aut fugit, sed quia consequuntur magni dolores eos qui
                     ratione voluptatem sequi nesciunt. Neque porro untur magni
                     dolores eos qui ratione voluptatem sequi nesciunt. Neque
                     porro untur magni dolores eos qui ratione voluptatem sequi
                     nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                     dolor sit amet, consectetur,
                  </Text>
               </Box>
            </Flex>
         </Box>

         {/* Visi dan Misi */}
         <Box
            h='max-content'
            px={['25px', '100px']}
            pt={['20px', '80px']}
            pb={['40px', '80px']}
            id='visi-misi'
         >
            <Text fontWeight='700' fontSize={['2xl', '3xl', '4xl', '5xl']}>
               Visi dan Misi
            </Text>
            <Flex mt='30px' flexDirection={['column', 'row']}>
               <Box flex='0.5'>
                  <Text fontWeight='700' fontSize={['lg', 'xl', '2xl', '3xl']}>
                     Visi
                  </Text>

                  <Text
                     fontSize={['sm', 'md', 'lg', 'xl']}
                     mt='20px'
                     pr='50px'
                     textAlign='justify'
                  >
                     t aut fugit, sed quia consequuntur magni dolores eos qui
                     ratione voluptatem sequi nesciunt. Neque porro quisquam
                     est, qui dolorem ipsum quia dolor sit amet, consectetur, t
                     aut fugit, sed quia consequuntur magni dolores eos qui
                     ratione voluptatem sequi nesciunt. Neque porro untur magni
                     dolores eos qui ratione voluptatem sequi nesciunt. Neque
                     porro untur magni dolores eos qui ratione voluptatem sequi
                     nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                     dolor sit amet, consectetur,
                  </Text>
               </Box>

               <Box flex='0.5' mt={['30px', '0px']}>
                  <Text fontWeight='700' fontSize={['lg', 'xl', '2xl', '3xl']}>
                     Misi
                  </Text>

                  <Text
                     fontSize={['sm', 'md', 'lg', 'xl']}
                     mt='20px'
                     pr='50px'
                     textAlign='justify'
                  >
                     t aut fugit, sed quia consequuntur magni dolores eos qui
                     ratione voluptatem sequi nesciunt. Neque porro quisquam
                     est, qui dolorem ipsum quia dolor sit amet, consectetur, t
                     aut fugit, sed quia consequuntur magni dolores eos qui
                     ratione voluptatem sequi nesciunt. Neque porro untur magni
                     dolores eos qui ratione voluptatem sequi nesciunt. Neque
                     porro untur magni dolores eos qui ratione voluptatem sequi
                     nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                     dolor sit amet, consectetur,
                  </Text>
               </Box>
            </Flex>
         </Box>

         <Box h='30px' bg='#ECEEF2'></Box>

         {/* Drawer Nav */}
         <Drawer isOpen={isOpen} placement='top' onClose={onClose} size='full'>
            <DrawerOverlay />
            <DrawerContent>
               <DrawerCloseButton _focus={{ outline: 'none' }} />
               <DrawerHeader></DrawerHeader>

               <DrawerBody>
                  <VStack spacing={6}>
                     <Link
                        href='#home'
                        _hover={{
                           textDecoration: 'none',
                        }}
                        _focus={{
                           outline: 'none',
                        }}
                     >
                        Home
                     </Link>
                     <Link
                        href='#sejarah'
                        _hover={{
                           textDecoration: 'none',
                        }}
                        _focus={{
                           outline: 'none',
                        }}
                     >
                        Sejarah
                     </Link>
                     <Link
                        href='#visi-misi'
                        _hover={{
                           textDecoration: 'none',
                        }}
                        _focus={{
                           outline: 'none',
                        }}
                     >
                        Visi dan Misi
                     </Link>

                     <NavLink to='/login'>
                        <Button
                           variant='solid'
                           bg='primary'
                           color='white'
                           mt='30px'
                        >
                           Masuk
                        </Button>
                     </NavLink>
                  </VStack>
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </Box>
   )
}

export default LandingPage
