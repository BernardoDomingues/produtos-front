import React, { useState, useEffect } from "react";
import {
  GiBroadsword,
  GiTemplarShield,
  GiCentaurHeart,
  GiSpeedometer,
} from "react-icons/gi";
import { FaCartPlus } from "react-icons/fa";
import styled from "styled-components";

import colors from "../../helpers/colors";

import { getproduct } from "../../services/products";

import BasePage from "../../components/BasePage";
import Loading from "../../components/Loading";
import BigButton from "../../components/BigButton";

const Product = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const productId = localStorage.getItem("id");
      console.log(productId);
      const data = await getproduct(productId);
      console.log(data);
      setProduct(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  console.log(loading);

  return (
    <BasePage>
    {loading ? <Loading /> :
      <Container>
        <div>
          <h2>{product.name}</h2>
          <img src={product.frontImage} />
          <img src={product.backImage} />
          {product.types.map((typeData) => (
            <div key={typeData.type.name}>{typeData.type.name}</div>
          ))}
          <div>{product.height} M</div>
          <div>{product.weight} Kg</div>
          <div>
            <GiBroadsword />
            {product.stats[1].base_stat}
          </div>
          <div>
            <GiTemplarShield />
            {product.stats[2].base_stat}
          </div>
          <div>
            <GiCentaurHeart />
            {product.stats[0].base_stat}
          </div>
          <div>
            <GiSpeedometer />
            {product.stats[5].base_stat}
          </div>
          {product.abilities.map((abilitieData) => (
            <div key={abilitieData.ability.name}>
              {abilitieData.ability.name}
            </div>
          ))}
          <ButtonArea>
            <BigButton><FaCartPlus /> Adicionar ao carrinho</BigButton>
          </ButtonArea>
        </div>
      </Container>
    }
    </BasePage>
  )
};

const Container = styled.div`
  text-transform: capitalize;
  color: ${colors.primaryGreen};
  width: 100vw;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const ButtonArea = styled.div`
  margin: 20px;
`;

export default Product;
