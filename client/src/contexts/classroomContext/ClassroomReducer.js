const ClassroomReducer = (state, action) => {
   switch (action.type) {
      case 'ADD':
         return {
            classroomState: action.payload,
         }
      case 'UPDATE':
         return {
            classroomState: action.payload,

            // ...state,
            // ...action.payload,
         }
      default:
         return { ...state }
   }
}

export default ClassroomReducer
