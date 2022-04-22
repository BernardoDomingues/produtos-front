import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useLogin } from '../../providers/login';

import { getUserSells } from "../../services/sells";

import BasePage from "../../components/BasePage";
import Loading from "../../components/Loading";
import colors from "../../helpers/colors";

const Profile = () => {
  const { userData, userToken } = useLogin();
  const [userSells, setUserSells] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserSells(userData.id, userToken);
      setUserSells(data.sells);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <BasePage>
        {loading ? <Loading /> :
        <Container>
          <h2>Dados de Usuário</h2>
          <span>Nome de Usuário: </span><span>{userData.name}</span>
          <br />
          <span>Email: </span><span>{userData.email}</span>
          <br />
          <h2>Compras</h2>
          {
          userSells.length === 0
            ?
            <div>Nenhuma compra realizada, acesse o catálogo!</div>
            :
            <Grid>
              {userSells.map((sell) => 
                <Card>
                  <div>Id: {sell.id}</div>
                  <div>Data: {sell.date}</div>
                  <div>Produto(s): {sell.products.map((product) => <li>{product.name}</li>)}</div>
                </Card>
              )}
            </Grid>
          }
        </Container>
      }
      </BasePage>
    </>
  );
};

const Container = styled.div`
  text-align: center;
  color: ${colors.primaryGreen};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const Card = styled.div`
  border: solid 1px ${colors.primaryGreen};
  margin: 10px;
  max-width: 300px;
  padding: 10px;
`;

export default Profile;
