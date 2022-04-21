import React from "react";
import styled from "styled-components";
import BasePage from "../../components/BasePage";
import colors from "../../helpers/colors";

const About = () => {
  return (
    <>
      <BasePage>
        <ProfileGrid>
          <Card>
            <Title>Bernardo Domingues</Title>
            <p>
              Apaixonado por tecnologia, desde cedo me interessei pelo mundo da
              programação, sempre buscando aprender coisas novas e expandindo
              meus horizontes.No momento da criação desse projeto, cursava o
              quarto período de Engenharia de Computação na UNIFEI e trabalhando
              há 1 ano na Rede Melhor Compra.
            </p>
            <CardFooter>
              <span
                onClick={() =>
                  window.open(
                    "https://linkedin.com/in/bernardo-domingues14",
                    "_blank"
                  )
                }
                style={{ cursor: 'pointer' }}
              >
                LinkedIn
              </span>
              <br />
              <span
                onClick={() =>
                  window.open(
                    "https://github.com/BernardoDomingues",
                    "_blank"
                  )
                }
                style={{ cursor: 'pointer' }}
              >
                GitHub
              </span>
            </CardFooter>
          </Card>
          <Card>
            <Title>UNIFEI - Campus Itabira</Title>
            <p>
              Instituição de ensino superior pública federal, considerada a
              primeira universidade tecnológica e foi a décima escola
              de engenharia do país. Extremamente conceituada entre as
              universidades de engenharia do Brasil, atua há mais de 100 anos no
              ensino.
            </p>
            <CardFooter>
              <span
                onClick={() =>
                  window.open(
                    "https://unifei.edu.br/",
                    "_blank"
                  )
                }
                style={{ cursor: 'pointer' }}
              >
                WebSite
              </span>
              <br />
              <span
                onClick={() =>
                  window.open(
                    "https://pt.wikipedia.org/wiki/Universidade_Federal_de_Itajub%C3%A1",
                    "_blank"
                  )
                }
                style={{ cursor: 'pointer' }}
              >
                Wikipedia
              </span>
            </CardFooter>
          </Card>
        </ProfileGrid>
      </BasePage>
    </>
  );
};

const ProfileGrid = styled.div`
  margin: 50px 180px 50px 180px;
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-flow: column;

  @media screen and (max-width: 800px) {
    grid-template-rows: 1fr 1fr 1fr;
    grid-auto-flow: column;
  }

  @media screen and (min-width: 801px) and (max-width: 1024px) {
    grid-template-rows: 1fr 1fr;
    grid-auto-flow: column;
  }
`;

const Card = styled.div`
  border: 2px solid;
  text-align: center;
  border-radius: 25px;
  padding: 10px;
  font-size: 20px;
  height: 500px;
  min-width: 300px;
  background-color: ${colors.secondaryGreen};
  color: ${colors.backgroundColor};
  border: 1px solid ${colors.primaryGreen};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
`;

const Title = styled.h3`
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
`;

const CardFooter = styled.div`
  text-decoration: none;
  color: ${colors.backgroundColor};
  margin-top: 20px;
`;

export default About;
