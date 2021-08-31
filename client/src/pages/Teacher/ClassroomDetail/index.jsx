import { Badge, Box, Button, Flex, Text } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import useSWR from 'swr'
import CardClass from '../../../components/CardClass'
import Navigation from '../../../components/Navigation'
import { addClassroom } from '../../../contexts/classroomContext/ClassroomActions'
import { ClassroomContext } from '../../../contexts/classroomContext/classroomContext'
import Info from './Info'
import Modul from './Modul'
import Silabus from './Silabus'

const ClassroomDetail = (props) => {
   const classId = props.match.params.id
   const { data, error } = useSWR(`/api/classrooms/${classId}`)
   const { classroomState, classroomDispatch } = useContext(ClassroomContext)

   useEffect(() => {
      if (data !== undefined) {
         classroomDispatch(addClassroom(data.classroom))
      }
   }, [data])

   return (
      <Box px={['25px', '50px', '100px', '150px']} py={['20px', '50px']}>
         {/* Header */}
         <Flex
            mb='30px'
            justifyContent='space-between'
            alignItems='center'
            gridGap='20px'
         >
            <Box gridGap={['5px', '20px']} alignItems='center' display='flex'>
               <Text fontSize={['2xl', '3xl', '4xl', '5xl']} fontWeight='700'>
                  {classroomState.subject}
               </Text>
               <Badge
                  colorScheme='green'
                  textAlign='center'
                  h='max-content'
                  px='10px'
                  py='5px'
                  fontWeight='300'
               >
                  {classroomState.status}
               </Badge>
            </Box>
            <Box>
               <NavLink to='/t/kelas'>
                  <Button variant='outline' colorScheme='blackAlpha'>
                     Kembali
                  </Button>
               </NavLink>
            </Box>
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
