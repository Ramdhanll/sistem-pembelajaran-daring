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
import AuthService from '../../services/AuthService'
import { AuthContext } from '../../contexts/authContext/AuthContexts'

const Login = ({ history }) => {
   const toast = useToast()
   const { userState, userDispatch } = useContext(AuthContext)

   useEffect(() => {
      if (userState?.role) history.push(localStorage.getItem('goto') || '/')
   }, [])

   const validationSchema = Yup.object({
      username: Yup.string().required('Username diperlukan'),
      password: Yup.string().required('Password diperlukan'),
      role: Yup.string().required('Role diperlukan'),
   })

   const handleSubmit = async (values, actions) => {
      actions.setSubmitting(true)

      let role
      let goto

      if (values.role === 'student') {
         role = 'siswa'
         goto = '/s'
      } else if (values.role === 'teacher') {
         role = 'guru'
         goto = '/t'
      } else {
         role = 'admin'
         goto = '/a'
      }

      localStorage.setItem('goto', goto)

      try {
         await AuthService.login(values, userDispatch)
         actions.setSubmitting(false)
         history.push(goto)
         toast({
            title: 'Login Berhasil',
            description: `Berhasil login sebagai ${role}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
         })
      } catch (error) {
         actions.setSubmitting(false)
         toast({
            title: 'Login Tidak Berhasil',
            description: `gagal masuk sebagai ${role}`,
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
         alignItems='center'
         justifyContent='center'
         w='100vw'
         h='100vh'
      >
         <Flex
            boxShadow='2xl'
            borderRadius='lg'
            p='30px 60px'
            alignItems='center'
            flexDirection='column'
         >
            <Image
               boxSize='50px'
               borderRadius='full'
               objectFit='cover'
               src='https://images.unsplash.com/photo-1587653559430-aadd3ac46e3f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=819&q=80'
               alt='Segun Adebayo'
            />

            <Text
               textAlign='center'
               fontSize='xl'
               fontWeight='700'
               mt='15px'
               mb='30px'
            >
               SIAKAD <br /> SMP DHARMA BHAKTI <br /> TANGERANG
            </Text>

            <Formik
               initialValues={{
                  username: '',
                  password: '',
                  role: '',
               }}
               onSubmit={handleSubmit}
               validationSchema={validationSchema}
            >
               {(props) => (
                  <Form>
                     <VStack spacing={5}>
                        <FormikControl
                           control='input'
                           name='username'
                           label='Username'
                           required={true}
                           fontWeight='400'
                        />

                        <FormikControl
                           control='input'
                           type='password'
                           name='password'
                           label='Password'
                           required={true}
                           fontWeight='400'
                        />

                        <FormikControl
                           control='select'
                           name='role'
                           label='Role'
                           required={true}
                           placeholder='Pilih role'
                           options={[
                              { key: 1, value: 'student', name: 'Siswa' },
                              { key: 2, value: 'teacher', name: 'Guru' },
                              { key: 3, value: 'admin', name: 'Admin' },
                           ]}
                        />

                        <Button
                           variant='solid'
                           bg='primary'
                           color='white'
                           w='100%'
                           type='submit'
                        >
                           Masuk
                        </Button>
                     </VStack>
                  </Form>
               )}
            </Formik>
         </Flex>
      </Box>
   )
}

export default Login
