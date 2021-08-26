import { Badge, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CardClass from '../../../components/CardClass'
import Navigation from '../../../components/Navigation'
import Info from './Info'
import Modul from './Modul'
import Silabus from './Silabus'

const ClassroomDetail = (props) => {
   const classId = props.match.params.id

   return (
      <Box px={['25px', '50px', '100px', '150px']} py={['20px', '50px']}>
         {/* Header */}
         <Flex gridGap={['5px', '20px']} alignItems='center' mb='30px'>
            <Text fontSize={['2xl', '3xl', '4xl', '5xl']} fontWeight='700'>
               Pendidikan Kewarganegaraan
            </Text>
            <Badge
               colorScheme='green'
               textAlign='center'
               h='max-content'
               px='10px'
               py='5px'
               fontWeight='300'
            >
               Active
            </Badge>
         </Flex>

         {/* Navigation */}
         <Navigation id={classId} />

         <Switch>
            <Route path='/t/kelas/:id' component={Info} exact />
            <Route path='/t/kelas/:id/silabus' component={Silabus} />
            <Route path='/t/kelas/:id/modul' component={Modul} />
         </Switch>
      </Box>
   )
}

export default ClassroomDetail
