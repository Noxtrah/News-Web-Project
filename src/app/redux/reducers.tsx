// reducers.ts
interface State {
    userProfilePicture: string | undefined;
  }
  
  const initialState: State = {
    userProfilePicture: undefined,
  };
  
  const reducer = (state = initialState, action: any): State => {
    switch (action.type) {
      case 'SET_USER_PROFILE_PICTURE':
        return {
          ...state,
          userProfilePicture: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  