import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { RegisterFormPropsTypes } from "../types"

const RegisterForm: React.FC<RegisterFormPropsTypes> = ({
  handleSubmit,
  name,
  setName,
  userName,
  setUserName,
  password,
  setPassword,
  showTipUnderUsername,
  setShowTipUnderUsername,
}) => {
  const { t } = useTranslation()

  const setUserNameInComponent = (e) => {
    if(showTipUnderUsername) {
      setShowTipUnderUsername(false)
    }
    setUserName(e.target.value)
  }

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
        <label className='form-label'>{t("nickname")}</label>
        <input
          type='text'
          className='form-control'
          placeholder={t("nickname_in_form_placeholder")}
          value={userName}
          onChange={setUserNameInComponent}
        />
        {showTipUnderUsername && (
          <p className='text-rose-600 text-sm mt-1'>
            {t("taken_username_info_under_input")}
          </p>
        )}
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
      
      <div>
        <p>{t("already_have_account")}<Link to='/login'>{t('log_text_finish')}</Link></p>
      </div>

      <button
        disabled={!name || !userName || !password}
        className='btn btn-primary'
      >
        {t("registration_lable")}
      </button>
    </form>
  )
}

export default RegisterForm
