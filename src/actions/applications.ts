import axios from "axios";
import { MainFiltersTypes, NewApplicationTypes } from "../types";

export const createApplication = async (
  token: string,
  data: NewApplicationTypes
) =>
  await axios.post(`${process.env.REACT_APP_API}/create-application`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const allApplications = async (
  currentLng: string = "en",
  filters?: MainFiltersTypes
) =>
  await axios.get(`${process.env.REACT_APP_API}/applications`, {
    params: {
      ...filters,
      currentLng,
    },
  });

export const myApplications = async (token: string) =>
  await axios.get(`${process.env.REACT_APP_API}/my-applications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteApplication = async (
  token: string,
  applicationId: string
) => {
  debugger;
  await axios.delete(
    `${process.env.REACT_APP_API}/delete-application/${applicationId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const read = async (applicationId: string) =>
  await axios.get(`${process.env.REACT_APP_API}/application/${applicationId}`);

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
  await axios.get(`${process.env.REACT_APP_API}/user-application-bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const isAlreadyBooked = async (token: string, applicationId: string) =>
  await axios.get(
    `${process.env.REACT_APP_API}/is-already-booked/${applicationId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

// export const searchListings = async (query) =>
//   await axios.post(`${process.env.REACT_APP_API}/search-listings`, query);
