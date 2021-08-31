const ClassroomReducer = (state, action) => {
   switch (action.type) {
      case 'ADD':
         return {
            classroomState: action.payload,
         }
      case 'UPDATE':
         return {
            classroomState: action.payload,
         }
      case 'CLEAR':
         localStorage.removeItem('classroom')
         return {
            classroomState: null,
         }
      default:
         return { ...state }
   }
}

export default ClassroomReducer
