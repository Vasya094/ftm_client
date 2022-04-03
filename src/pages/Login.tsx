import { useState } from "react";
import { useDispatch } from "react-redux";
import { RouteProps, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

import { login } from "../actions/auth";
import LoginForm from "../components/LoginForm";

const Login: React.FC<RouteProps> = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    console.log("SEND LOGIN DATA", { userName, password });
    try {
      let res = await login({ userName, password });

      if (res.data) {
        console.log(
          "SAVE USER RES IN REDUX AND LOCAL STORAGE THEN REDIRECT ===> "
        );
    
        window.localStorage.setItem("auth", JSON.stringify(res.data));

        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
        navigate("/my_appliactions");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { t } = useTranslation()

  return (
    <>
      <div className="container-fluid p-5 text-center">
        <h1>{t('login')}</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <LoginForm
              handleSubmit={handleSubmit}
              userName={userName}
              setUserName={setUserName}
              password={password}
              setPassword={setPassword}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
