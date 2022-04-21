import React from "react";
import styled from "styled-components";
import { Default } from 'react-spinners-css';
import colors from "../helpers/colors";

const Loading = () => <Container><Default color={colors.secondaryGreen} /></Container>

const Container = styled.div`
  height: 90vh;
  width: 100vw;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export default Loading;
