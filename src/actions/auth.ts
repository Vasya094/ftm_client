import axios, { AxiosError, AxiosResponse } from "axios"
import { UserToAuthTypes } from "../types"

const apiUrl =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_PROD
    : process.env.REACT_APP_API

export const register = async (user: UserToAuthTypes) =>
  await axios.post(`${apiUrl}/register`, user);

export const login = async (user: UserToAuthTypes) =>
  await axios.post(`${apiUrl}/login`, user)

// update user in local storage
export const updateUserInLocalStorage = (
  user: UserToAuthTypes,
  next: () => void
) => {
  if (window.localStorage.getItem("auth")) {
    let auth = JSON.parse(localStorage.getItem("auth") as string)
    auth.user = user
    localStorage.setItem("auth", JSON.stringify(auth))
    next()
  }
}
