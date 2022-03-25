import { useTranslation } from "react-i18next";
import { LoginFormPropsTypes } from "../utils/tsTypes";

const LoginForm: React.FC<LoginFormPropsTypes> = ({
    handleSubmit,
    email,
    setEmail,
    password,
    setPassword,
  }) => {
    const { t } = useTranslation()

   return ( <form onSubmit={handleSubmit} className="mt-3">
      <div className="form-group mb-3">
        <label className="form-label">{t('email_in_form')}</label>
        <input
          type="email"
          className="form-control"
          placeholder={t('email_in_form_placeholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
  
      <button disabled={!email || !password} className="btn btn-primary">
      {t('login')}
      </button>
    </form>)
  };
  
  export default LoginForm;
  