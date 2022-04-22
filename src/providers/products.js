import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import { createSell } from "../services/sells";

import { useLogin } from "./login";

export const ProductsContext = React.createContext({});

export const ProductsProvider = ({ children }) => {
  const { userToken, loginAuth } = useLogin();

  const [cart, setCart] = useState([]);
  const [reloadPage, setReloadPage] = useState(false);

  const addToCart = (productData) => {
    if (loginAuth) {
      const searchCart = Cookies.get("cart");
      if (searchCart) {
        const oldCart = JSON.parse(Cookies.get("cart"));
        const newCart = [...oldCart, productData];
        Cookies.set("cart", JSON.stringify(newCart));
        setCart(newCart);
      } else {
        const newCart = [productData];
        Cookies.set("cart", JSON.stringify(newCart));
        setCart(newCart);
      }
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Produto adicionado ao carrinho',
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'É preciso estar logado para realizar uma compra',
      })
    }
  };

  const checkCart = () => {
    const searchCart = Cookies.get("cart");
    if (searchCart) {
      setCart(JSON.parse(searchCart));
    }
  };

  const removeToCart = (productIndex) => {
    const oldCart = cart.slice();
    oldCart.splice(productIndex, 1);
    const newCart = Array.from(oldCart);
    Cookies.set("cart", JSON.stringify(newCart));
    setCart(newCart);
    setReloadPage(!reloadPage)
  };

  const sendSell = async () => {
    Swal.fire({
      title: 'Finalizar venda?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const sell = await createSell({products: cart}, userToken);
        if (sell.error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: sell.error,
          })
        } else {
          Swal.fire('Venda Criada!', '', 'success');
          setCart([]);
          Cookies.remove("cart");
          setReloadPage(!reloadPage);
        }
      }
    })
  };

  useEffect(() => {
    checkCart();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeToCart,
        reloadPage,
        sendSell
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

ProductsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useProducts = () => React.useContext(ProductsContext);
