import { useState } from "react"
import RegisterForm from "../components/RegisterForm"
import { toast } from "react-toastify"
import { register } from "../actions/auth"
import { RouteProps, useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"

const Register: React.FC<RouteProps> = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { t } = useTranslation()

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    try {
      const res = await register({
        name,
        email,
        password,
      })

      if (res.data) {
        toast.success(t('RegisterSuccess'))
        window.localStorage.setItem("auth", JSON.stringify(res.data))
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        })
        navigate("/")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className='container-fluid p-5 text-center'>
        <h1>{t('registration_lable')}</h1>
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <RegisterForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
