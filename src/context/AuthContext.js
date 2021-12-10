import { createContext, useReducer, useEffect } from "react";

import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};
export const AuthContext = createContext(INITIAL_STATE);
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
//JSON.parse(JSON.stringify(localStorage.getItem("logged")))
// user: {
//   "_id": "6197fdbd6112bc3561385cb6",
//   "userName": "Amardeep",
//   "email": "albertking190999@gmail.com",
//   "password": "$2b$10$3vUPi.XcP./2RueRUhuBN.4xhwtHciSfjswUtonlE1MGUay4sUIBm",
//   "profilePicture": "ppic7.png",
//   "coverPicture": "post5.jpg",
//   "followers": [
//       "6197fdcd6112bc3561385cb8"
//   ],
//   "followings": [
//       "6197fdcd6112bc3561385cb8"
//   ],
//   "isAdmin": false,
//   "createdAt": "2021-11-19T19:40:45.611Z",
//   "updatedAt": "2021-11-23T16:12:23.333Z",
//   "__v": 0,
//   "description": "Zindagi koi manzil nahi balki safar hai!!",
//   "city": "Kolkata",
//   "from": "Siliguri"
// }
