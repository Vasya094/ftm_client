import { UserInStoreTypes } from "../types";

let userState: UserInStoreTypes | null;

if (window.localStorage.getItem("auth")) {
  userState = JSON.parse(window.localStorage.getItem("auth") as string);
} else {
  userState = null; // {}
}

export const authReducer = (
  state = userState,
  action: { type: string; payload: UserInStoreTypes | null }
) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return action.payload;
    default:
      return state;
  }
};
