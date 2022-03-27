import { useTranslation } from "react-i18next";
import { LoginFormPropsTypes } from "../types";

const LoginForm: React.FC<LoginFormPropsTypes> = ({
    handleSubmit,
    userName,
    setUserName,
    password,
    setPassword,
  }) => {
    const { t } = useTranslation()

   return ( <form onSubmit={handleSubmit} className="mt-3">
      <div className="form-group mb-3">
        <label className="form-label">{t('nickname')}</label>
        <input
          type="text"
          className="form-control"
          placeholder={t('nickname_in_form_placeholder')}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
  
      <div className="form-group mb-3">
        <label className="form-label">{t('password_in_form')}</label>
        <input
          type="password"
          className="form-control"
          placeholder={t('password_in_form_placeholder')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
  
      <button disabled={!userName || !password} className="btn btn-primary">
      {t('login')}
      </button>
    </form>)
  };
  
  export default LoginForm;
  