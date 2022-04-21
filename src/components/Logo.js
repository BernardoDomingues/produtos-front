import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoImage from "../assets/Exemplo.png";

const Logo = ({ extraStyle }) => {
  const history = useNavigate();
  return (
    <Image
      src={LogoImage}
      alt="project logo"
      onClick={() => history("/")}
      extraStyle={extraStyle}
    />
  );
};

const Image = styled.img`
  ${(props) => props.extraStyle};
  cursor: pointer;

  @media screen and (max-width: 1035px) {
    margin-left: 10px;
  }
`;

export default Logo;
