import { Box, Button, Flex, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../Formik/FormikControl'

const Login = () => {
   const validationSchema = Yup.object({
      username: Yup.string().required('Username diperlukan'),
      password: Yup.string().required('Password diperlukan'),
      role: Yup.string().required('Role diperlukan'),
   })

   const handleSubmit = (values, actions) => {}

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
                           color='red'
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
