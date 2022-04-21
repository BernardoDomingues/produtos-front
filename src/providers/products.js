import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export const ProductsContext = React.createContext({});

export const ProductsProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [reloadPage, setReloadPage] = useState(false);

  const addToCart = (productData) => {
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
        reloadPage
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
