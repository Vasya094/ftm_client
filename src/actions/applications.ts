import axios from "axios"
import { MainFiltersTypes, NewApplicationTypes } from "../types"

const apiUrl = process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_PROD
    : process.env.REACT_APP_API

export const createApplication = async (
  token: string,
  data: NewApplicationTypes
) =>
  await axios.post(`${apiUrl}/create-application`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const allApplications = async (filters?: MainFiltersTypes) =>
  await axios.get(`${apiUrl}/applications`, {
    params: {
      ...filters,
    },
  })

export const myApplications = async (token: string) =>
  await axios.get(`${apiUrl}/my-applications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const deleteApplication = async (
  token: string,
  applicationId: string
) => {
  await axios.delete(
    `${apiUrl}/delete-application/${applicationId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}
export const read = async (applicationId: string) =>
  await axios.get(`${apiUrl}/application/${applicationId}`)

// export const updateApplications = async (token: string, data, applicationId: string) =>
//   await axios.put(
//     `${process.env.REACT_APP_API}/update-hotel/${applicationId}`,
//     data,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

export const userApplications = async (token: string) =>
  await axios.get(`${apiUrl}/user-application-bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export const isAlreadyBooked = async (token: string, applicationId: string) =>
  await axios.get(
    `${apiUrl}/is-already-booked/${applicationId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
