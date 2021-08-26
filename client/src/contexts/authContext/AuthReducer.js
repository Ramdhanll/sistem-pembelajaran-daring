const AuthReducer = (state, action) => {
   switch (action.type) {
      case 'LOGIN_START':
         return {
            userState: null,
            loading: true,
            error: false,
         }
      case 'LOGIN_SUCCESS':
         return {
            userState: action.payload,
            loading: false,
            error: false,
         }
      case 'LOGIN_FAILURE':
         return {
            userState: null,
            loading: false,
            error: false,
         }
      case 'LOGOUT':
         return {
            userState: null,
            loading: false,
            error: false,
         }
      default:
         return { ...state }
   }
}

export default AuthReducer
