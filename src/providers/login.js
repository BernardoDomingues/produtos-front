import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

export const LoginContext = React.createContext({});

export const LoginProvider = ({ children }) => {
  const [formState, setFormState] = useState("login");
  const [loginAuth, setLoginAuth] = useState(false);
  const [userToken, setUserToken] = useState('');

  const readCookie = () => {
    const user = Cookies.get("user");
    const cookiesUserToken = Cookies.get("userToken");
    if (user) {
      setLoginAuth(true);
      setUserToken(cookiesUserToken);
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <LoginContext.Provider
      value={{
        formState,
        setFormState,
        loginAuth,
        setLoginAuth,
        setUserToken,
        userToken,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

LoginProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useLogin = () => React.useContext(LoginContext);
