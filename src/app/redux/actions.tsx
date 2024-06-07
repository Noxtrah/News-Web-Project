// actions.ts
export const setUserProfilePicture = (profilePicture: string | undefined) => ({
  type: 'SET_USER_PROFILE_PICTURE',
  payload: profilePicture,
});
