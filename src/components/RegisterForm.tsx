import React from "react"
import { useTranslation } from "react-i18next"
import { RegisterFormPropsTypes } from "../utils/tsTypes"

const RegisterForm: React.FC<RegisterFormPropsTypes> = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  const { t } = useTranslation()

  return (
    <form onSubmit={handleSubmit} className='mt-3'>
      <div className='form-group mb-3'>
        <label className='form-label'>{t("name_in_form")}</label>
        <input
          type='text'
          className='form-control'
          placeholder={t("name_in_form_placeholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className='form-group mb-3'>
        <label className='form-label'>{t("email_in_form")}</label>
        <input
          type='email'
          className='form-control'
          placeholder={t("email_in_form_placeholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className='form-group mb-3'>
        <label className='form-label'>{t("password_in_form")}</label>
        <input
          type='password'
          className='form-control'
          placeholder={t("password_in_form_placeholder")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        disabled={!name || !email || !password}
        className='btn btn-primary'
      >
        {t("registration_lable")}
      </button>
    </form>
  )
}

export default RegisterForm
