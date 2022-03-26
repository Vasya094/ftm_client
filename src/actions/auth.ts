import axios from "axios";
import { UserToAuthTypes } from "../types";

export const register = async (user: UserToAuthTypes) =>
  await axios.post(`${process.env.REACT_APP_API}/register`, user);

export const login = async (user: UserToAuthTypes) =>
  await axios.post(`${process.env.REACT_APP_API}/login`, user);

// update user in local storage
export const updateUserInLocalStorage = (
  user: UserToAuthTypes,
  next: () => void
) => {
  if (window.localStorage.getItem("auth")) {
    let auth = JSON.parse(localStorage.getItem("auth") as string);
    auth.user = user;
    localStorage.setItem("auth", JSON.stringify(auth));
    next();
  }
};
