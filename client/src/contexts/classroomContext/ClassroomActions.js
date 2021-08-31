export const addClassroom = (classroom) => ({
   type: 'ADD',
   payload: classroom,
})

export const updateClassroom = (classroom) => ({
   type: 'UPDATE',
   payload: classroom,
})

export const clearClassroom = () => ({
   type: 'CLEAR',
})
