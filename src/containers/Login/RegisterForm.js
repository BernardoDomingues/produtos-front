import React from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

import { postRegister } from "../../services/register";

import { useLogin } from "../../providers/login";

import colors from "../../helpers/colors";
import InputField from "../../components/InputField";
import BigButton from "../../components/BigButton";

const RegisterForm = () => {
  const { setFormState } = useLogin();

  const values = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  const loginSchema = Yup.object().shape({
    name: Yup.string().required("Nome de usuário Obrigatório!"),
    email: Yup.string().email("Email Inválido!").required("Campo Obrigatório!"),
    password: Yup.string()
      .min(5, "Muito Pequena!")
      .max(50, "Muito Longa!")
      .required("Campo Obrigatório!"),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Senhas incompatíveis"
    ),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const response = await postRegister(values);
    if (response.errors) {
      let errors = '';
      response.errors.map((error) => errors = `${errors}${error.msg}.`);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errors,
      })
    } else {
      setSubmitting(false);
      resetForm();
      setFormState("login");
    }
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
              <div style={{ display: "grid" }}>
                <InputField
                  name="name"
                  type="text"
                  label="Nome de Usuário:"
                />
                <InputField name="email" type="email" label="Email:" />
                <InputField name="password" type="password" label="Senha:" />
                <InputField
                  name="passwordConfirmation"
                  type="password"
                  label="Confirme sua Senha:"
                />
              </div>
              <ButtonGrid>
                <BigButton type="submit" disabled={isSubmitting}>
                  Cadastrar
                </BigButton>
                <BackButton onClick={() => setFormState("login")}>
                  Voltar
                </BackButton>
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

const BackButton = styled(BigButton)`
  background: ${colors.white};
  border: 1px solid ${colors.red};
  color: ${colors.red};
  margin-bottom: 10px;
`;

const ButtonGrid = styled.div`
  display: grid;
  gap: 10px;
`;

export default RegisterForm;
