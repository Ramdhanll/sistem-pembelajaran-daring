import {
   Box,
   Button,
   Flex,
   Image,
   Text,
   useToast,
   VStack,
} from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../Formik/FormikControl'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext/AuthContexts'

import AuthService from '../../services/AuthService'

import Logo from '../../images/logo.jpg'

const ResetPassword = ({ history }) => {
   const toast = useToast()
   const { userState } = useContext(AuthContext)

   useEffect(() => {
      if (userState?.role)
         history.push(localStorage.getItem('urlCurrent') || '/')
   }, [userState?.role, history])

   const validationSchema = Yup.object({
      email: Yup.string().required('Email diperlukan!').email('Email invalid!'),
   })

   const handleSubmit = async (values, actions) => {
      actions.setSubmitting(true)
      try {
         const result = await AuthService.resetPassword(values)
         actions.setSubmitting(false)
         toast({
            title: 'Berhasil',
            description: result?.message ?? `Silahkan cek email anda `,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         toast({
            title: 'Tidak Berhasil',
            description: error.response.data?.message ?? 'User tidak ditemukan',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      }
   }

   return (
      <Box
         display='flex'
         alignItems={['', 'center', 'center', 'center']}
         justifyContent='center'
         h='100vh'
      >
         <Flex
            my={['0px', '50px', '50px', '50px']}
            w='300px'
            bg='white'
            boxShadow='2xl'
            borderRadius='lg'
            p='20px 30px'
            alignItems='center'
            flexDirection='column'
         >
            <Image
               boxSize='50px'
               borderRadius='full'
               objectFit='cover'
               src={Logo}
               alt='Segun Adebayo'
            />

            <Text
               textAlign='center'
               fontSize='xl'
               fontWeight='700'
               mt='15px'
               mb='5px'
            >
               Lupa Password?
            </Text>

            <Text color='gray.300' textAlign='center' mb='15px'>
               Masukan email dan sistem akan mengirim pesan untuk dapatkan
               kembali akun anda
            </Text>

            <Formik
               initialValues={{
                  email: '',
               }}
               onSubmit={handleSubmit}
               validationSchema={validationSchema}
            >
               {(props) => (
                  <Form>
                     <VStack spacing={5}>
                        <FormikControl
                           control='input'
                           name='email'
                           label='Email'
                           required={true}
                           fontWeight='400'
                           placeholder='Email'
                           autoComplete='off'
                        />

                        <Button
                           variant='solid'
                           bg='primary'
                           color='white'
                           w='100%'
                           type='submit'
                           isLoading={props.isSubmitting}
                        >
                           Reset Password
                        </Button>

                        <NavLink to='/login'>
                           <Text textAlign='center' textDecoration='underline'>
                              kembali login
                           </Text>
                        </NavLink>
                     </VStack>
                  </Form>
               )}
            </Formik>
         </Flex>
      </Box>
   )
}

export default ResetPassword
