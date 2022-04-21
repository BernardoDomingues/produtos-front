import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export const ProductsContext = React.createContext({});

export const ProductsProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (productId) => {
    const searchCart = Cookies.get("cart");
    if (searchCart) {
      const oldCart = JSON.parse(Cookies.get("cart"));
      const newCart = [...oldCart, productId];
      Cookies.set("cart", JSON.stringify(newCart));
      setCart(newCart);
    } else {
      const newCart = [productId];
      Cookies.set("cart", JSON.stringify(newCart));
      setCart(newCart);
    }
    Swal.fire({
      icon: 'success',
      title: 'Sucesso',
      text: 'Produto adicionado ao carrinho',
    })
  };

  const checkCart = () => {
    const searchCart = Cookies.get("cart");
    if (searchCart) {
      setCart(JSON.parse(searchCart));
    }
  }

  useEffect(() => {
    checkCart();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        cart,
        setCart,
        addToCart
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
