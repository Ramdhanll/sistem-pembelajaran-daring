import { createContext, useEffect, useReducer } from 'react'
import ClassroomReducer from './ClassroomReducer'

const initialClassroomState = {
   classroomState: JSON.parse(localStorage.getItem('classroom')) || null,
}

export const ClassroomContext = createContext(initialClassroomState)

export const ClassroomContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(ClassroomReducer, initialClassroomState)

   useEffect(() => {
      localStorage.setItem('classroom', JSON.stringify(state.classroomState))
   }, [state?.classroomState])

   return (
      <ClassroomContext.Provider
         value={{
            classroomState: state.classroomState,
            classroomDispatch: dispatch,
         }}
      >
         {children}
      </ClassroomContext.Provider>
   )
}
