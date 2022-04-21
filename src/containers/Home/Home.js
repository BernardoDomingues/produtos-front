import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import colors from "../../helpers/colors";

import { listproducts, searchProduct } from "../../services/products";

import BasePage from "../../components/BasePage";
import Loading from "../../components/Loading";
import BigButton from "../../components/BigButton";

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
  const [searchValue, setSearchValue] = useState("");
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

  const searchProducts = async () => {
    if (searchValue !== "") {
      setLoading(true);
      const data = await searchProduct(searchValue);
      if (!data.status) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Produto ${searchValue} não encontrado`,
        })
      } else {
        setProducts([data.product]);
        setFindedResults(1);
      }
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchProducts();
    }
  };

  return (
    <>
      <BasePage>
        {loading ? <Loading /> :
          <>
            <Header>
              <Input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Procure um produto"
                onKeyDown={handleKeyDown}
              />
              <Button onClick={() => searchProducts()}>Search</Button>
            </Header>
            <Grid>
              {products.map((product) => {
                const name = product.name;
                const frontImage = product.frontImage;
                const backImage = product.backImage;
                return (
                  <Card key={product.id} onClick={() => setProduct(product.id)}>
                    <h4>{name}</h4>
                    <Images>
                      <img id="FRONT_IMAGE" src={frontImage} alt="front product img" />
                      <img id="BACK_IMAGE" src={backImage} alt="front product img" />
                    </Images>
                  </Card>
                );
              })}
            </Grid>
            {findedResults === 1 ? <></> :
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
            }
          </>
        }
      </BasePage>
    </>
  );
};

const Header = styled.div`
  text-align: center;
`;

const Input = styled.input`
  height: 18px;
  margin-right: 10px;
  border: 1px solid ${colors.secondaryGreen};
  color: ${colors.secondaryGreen};
  background: ${colors.white};

  :focus {
    border: 1px solid ${colors.secondaryGreen};
  }
`;

const Button = styled(BigButton)`
  background: ${colors.white};
  border: 1px solid ${colors.secondaryGreen};
  color: ${colors.secondaryGreen};
  height: 25px;

  :disabled {
    cursor: default;
  }
`;

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

export default Home;
