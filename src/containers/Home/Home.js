import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import colors from "../../helpers/colors";

import { listproducts } from "../../services/products";

import BasePage from "../../components/BasePage";
import Loading from "../../components/Loading";

const setDisableButton = (pages) => (pages === 0 ? true : false);

const InfoPages = ({ total, pages }) => {
  const totalPages = Math.floor(total / 9);
  const atualPage = pages / 9;

  return (
    <span>
      {atualPage + 1}/{totalPages}
    </span>
  );
};

const Home = () => {
  const history = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [findedResults, setFindedResults] = useState(0);
  const [pagination, setPagination] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await listproducts(pagination);
      setProducts(data.list);
      setFindedResults(data.totalCount);
      setLoading(false);
    };
    fetchData();
  }, [pagination]);

  const setProduct = (productId) => {
    localStorage.setItem("id", productId);
    history("/produto");
  };

  return (
    <>
      <BasePage>
        {loading ? <Loading /> :
          <>
            <Grid>
              {products.map((pokemon) => {
                const name = pokemon.name;
                const frontImage = pokemon.frontImage;
                const backImage = pokemon.backImage;
                return (
                  <Card key={pokemon.id} onClick={() => setProduct(pokemon.id)}>
                    <h4>{name}</h4>
                    <Images>
                      <img id="FRONT_IMAGE" src={frontImage} alt="front pokemon img" />
                      <img id="BACK_IMAGE" src={backImage} alt="front pokemon img" />
                    </Images>
                  </Card>
                );
              })}
            </Grid>
            <Footer>
              <Button
                disabled={setDisableButton(pagination)}
                onClick={() => setPagination(pagination - 9)}
              >
                <IoIosArrowBack />
              </Button>
              <InfoPages total={findedResults} pages={pagination} />
              <Button onClick={() => setPagination(pagination + 9)}>
                <IoIosArrowForward />
              </Button>
            </Footer>
          
          </>
        }
      </BasePage>
    </>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  margin: 20px;
  gap: 10px;
`;

const Card = styled.div`
  text-align: center;
  border: 1px solid ${colors.secondaryGreen};
  border-radius: 5px;
  cursor: pointer;

  h4 {
    text-transform: capitalize;
  }
`;

const Images = styled.span`
  #BACK_IMAGE {
    display: none;
  }

  :hover {
    #FRONT_IMAGE {
      display: none;
    }
    #BACK_IMAGE {
      display: inline;
    }
  }
`;

const Footer = styled.div`
  color: ${colors.secondaryGreen};
  text-align: center;
  margin-bottom: 10px;
`;

const Button = styled.button`
  border: 1px solid ${colors.secondaryGreen};
  color: ${colors.secondaryGreen};
  height: 30px;
  cursor: pointer;

  :disabled {
    cursor: default;
  }
`;

export default Home;
