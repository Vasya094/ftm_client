import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { UserInStoreTypes } from "../types"

const PrivateRoute = ({ ...rest }) => {
  const { auth } = useSelector((state) => ({ ...state })) as {
    auth: UserInStoreTypes
  }
  return auth && auth.token ? <Outlet {...rest} /> : <Navigate to='/login' />
}

export default PrivateRoute
