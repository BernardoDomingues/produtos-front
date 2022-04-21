import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoTrashBinOutline } from 'react-icons/io5';

import colors from "../../helpers/colors";

import { useProducts } from "../../providers/products";

import { getproduct } from "../../services/products";

import BasePage from "../../components/BasePage";
import Loading from "../../components/Loading";
import BigButton from "../../components/BigButton";

const Cart = () => {
  const {
    cart,
    removeToCart,
    reloadPage,
    sendSell
  } = useProducts();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all(cart.map(async (productData) => await getproduct(productData.id)));
      setProducts(data);
      setLoading(false);
    };

    fetchData();
  }, [reloadPage]);

  return (
    <BasePage>
      {loading ? <Loading /> : 
        <Grid>
          {products.map((product, index) => {
            const name = product.name;
            const frontImage = product.frontImage;
            const backImage = product.backImage;
            return (
              <Card key={product.id}>
                <h4>{name}</h4>
                <Images>
                  <img id="FRONT_IMAGE" src={frontImage} alt="front product img" />
                  <img id="BACK_IMAGE" src={backImage} alt="front product img" />
                </Images>
                <TrashDiv onClick={() => removeToCart(index)}><IoTrashBinOutline /></TrashDiv>
              </Card>
            );
          })}
        </Grid>
      }
      <ButtonArea>
        {cart.length === 0 ? <div>Carrinho Vazio</div> : <BigButton onClick={() => sendSell()}>Finalizar Compra</BigButton>}
      </ButtonArea>
    </BasePage>
  )
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

  h4 {
    text-transform: capitalize;
    color: ${colors.primaryGreen};
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

const TrashDiv = styled.div`
  cursor: pointer;
  font-size: 25px;
  color: ${colors.red};
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
`;

export default Cart;
