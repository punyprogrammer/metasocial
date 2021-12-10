export const LoginStart = (userCredential) => ({
  type: "LOGIN_START",
});
export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});
export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});
export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});
export const UpdateStart = (userCredentials) => ({
  type: "UPDATE_START",
});
export const UpdateSuccess = (user) => ({
  type: "UPDATE_SUCCESS",
  payload: user,
});
export const UpdateFailure = () => ({
  type: "UPDATE_FAILURE",
});

export const Unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});
