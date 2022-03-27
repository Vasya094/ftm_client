import { useState } from "react"
import { toast } from "react-toastify"
import { RouteProps, useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { AxiosError } from "axios"
import { NotificationContainer, NotificationManager } from "react-notifications"

import RegisterForm from "../components/RegisterForm"
import { register } from "../actions/auth"

const Register: React.FC<RouteProps> = () => {
  const [name, setName] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [showTipUnderUsername, setShowTipUnderUsername] =
    useState<boolean>(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { t } = useTranslation()

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    try {
      const userFormatedObject = {
        name: name.trim(),
        userName: userName.trim(),
        password,
      }
      const res = await register(userFormatedObject)

      if (res.data) {
        toast.success(t("RegisterSuccess"))
        window.localStorage.setItem("auth", JSON.stringify(res.data))
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        })
        navigate("/")
      }
    } catch (err) {
      const typedError = err as AxiosError
      console.error(typedError)
      if (typedError.response) {
        NotificationManager.warning(
          t(
            typedError.response.data.message
              ? typedError.response.data.message
              : "unknown_error"
          ),
          t("WarningMessage"),
          3000
        )
        setShowTipUnderUsername(true)
      }
    }
  }

  return (
    <>
      <div className='container-fluid p-5 text-center'>
        <h1>{t("registration_lable")}</h1>
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <RegisterForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              userName={userName}
              setUserName={setUserName}
              password={password}
              setPassword={setPassword}
              showTipUnderUsername={showTipUnderUsername}
              setShowTipUnderUsername={setShowTipUnderUsername}
            />
          </div>
        </div>
      </div>
      <NotificationContainer />
    </>
  )
}

export default Register
