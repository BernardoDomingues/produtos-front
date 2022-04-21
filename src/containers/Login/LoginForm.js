import React from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";

import { postLogin } from "../../services/login";

import { useLogin } from '../../providers/login';

import colors from '../../helpers/colors';
import InputField from "../../components/InputField";
import BigButton from "../../components/BigButton";

const LoginForm = () => {
  const { setFormState, setLoginAuth, setUserToken, setUserData } = useLogin();
  
const values = { email: "", password: "" }

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(5, "Muito Pequena!")
    .max(50, "Muito Longa!")
    .required("Campo Obrigatório!"),
  email: Yup.string().email("Email Inválido!").required("Campo Obrigatório!")
});

const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const userData = await postLogin(values);
    console.log(userData.data.status);
    if (userData.data.status) {
      Cookies.set("user", "loginTrue");
      setUserToken(userData.data.userToken);
      const user = jwtDecode(userData.data.userToken);
      setUserData(user);
      setLoginAuth(true);
      Cookies.set("userToken", userData.data.userToken);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: userData.data.error,
      })
    }
    setSubmitting(false);
    resetForm();
};
    return (
      <>
        <Formik
          initialValues={values}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => {
            return (
              <FormData>
                <div style={{ display: 'grid' }}>
                  <InputField
                    name="email"
                    type="email"
                    label="Email:"
                  />
                  <InputField
                    name="password"
                    type="password"
                    label="Senha:"
                  />
                </div>
                <ButtonGrid>
                  <BigButton type="submit" disabled={isSubmitting}>
                    Entrar
                  </BigButton>
                  <RegisterButton onClick={() => setFormState('register')}>Cadastre-se</RegisterButton>
                </ButtonGrid>
              </FormData>
            );
          }}
        </Formik>
      </>
    );
};

const FormData = styled(Form)`
  display: grid;
  gap: 50px;
`;

const RegisterButton = styled(BigButton)`
  background: ${colors.white};
  border: 1px solid ${colors.secondaryGreen};
  color: ${colors.secondaryGreen};
`;

const ButtonGrid = styled.div`
  display: grid;
  gap: 10px;
`;

export default LoginForm;
