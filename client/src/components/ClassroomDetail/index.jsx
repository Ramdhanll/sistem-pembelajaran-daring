import {
   Badge,
   Box,
   Button,
   Flex,
   Skeleton,
   SkeletonText,
   Text,
} from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import useSWR from 'swr'
import CardClass from '../../components/CardClass'
import Navigation from '../../components/Navigation'
import {
   addClassroom,
   clearClassroom,
} from '../../contexts/classroomContext/ClassroomActions'
import Attedance from './Attedance'
import Info from './Info'
import Modul from './Modul'
import Silabus from './Silabus'
import { ClassroomContext } from '../../contexts/classroomContext/classroomContext'

const ClassroomDetail = (props) => {
   const classId = props.match.params.id
   const { data, error } = useSWR(`/api/classrooms/${classId}`)
   const { classroomState, classroomDispatch } = useContext(ClassroomContext)

   useEffect(() => {
      if (data !== undefined) {
         classroomDispatch(addClassroom(data.classroom))
      }

      return () => {
         classroomDispatch(clearClassroom())
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
            <SkeletonText isLoaded={classroomState !== null}>
               <Box
                  gridGap={['5px', '20px']}
                  alignItems='center'
                  display='flex'
               >
                  <Text
                     fontSize={['2xl', '3xl', '4xl', '5xl']}
                     fontWeight='700'
                  >
                     {classroomState?.subject}
                  </Text>
                  <Badge
                     colorScheme='green'
                     textAlign='center'
                     h='max-content'
                     px='10px'
                     py='5px'
                     fontWeight='300'
                  >
                     {classroomState?.status}
                  </Badge>
               </Box>
            </SkeletonText>
            <Box>
               <NavLink to={`${localStorage.getItem('goto')}/kelas`}>
                  <Button variant='outline' colorScheme='blackAlpha'>
                     Kembali
                  </Button>
               </NavLink>
            </Box>
         </Flex>

         {/* Navigation */}
         <Skeleton isLoaded={classroomState !== null}>
            <Navigation id={classId} />
         </Skeleton>

         <Skeleton isLoaded={classroomState !== null}>
            <Switch>
               <Route
                  path={`${localStorage.getItem('goto')}/kelas/:id`}
                  component={Info}
                  exact
               />
               <Route
                  path={`${localStorage.getItem('goto')}/kelas/:id/silabus`}
                  component={Silabus}
               />
               <Route
                  path={`${localStorage.getItem('goto')}/kelas/:id/modul`}
                  component={Modul}
               />
               <Route
                  path={`${localStorage.getItem('goto')}/kelas/:id/absen`}
                  component={Attedance}
               />
            </Switch>
         </Skeleton>
      </Box>
   )
}

export default ClassroomDetail
