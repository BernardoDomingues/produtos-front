import React from "react";
import styled from "styled-components";

import BasePage from "../../components/BasePage";

import { useLogin } from '../../providers/login';

const Profile = () => {
  const { userData } = useLogin();

  return (
    <>
      <BasePage>
        <Container>
          <span>Nome de Usuário: </span><span>{userData.name}</span>
          <br />
          <span>Email: </span><span>{userData.email}</span>
          <br />
        </Container>
      </BasePage>
    </>
  );
};

const Container = styled.div`
  text-align: center;
`;

export default Profile;
