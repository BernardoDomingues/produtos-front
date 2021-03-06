import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { useLogin } from "./providers/login";

import Home from "./containers/Home";
import About from "./containers/About";
import Singin from "./containers/Login";
import Error from "./containers/Error";
import Profile from "./containers/Profile";
import Product from "./containers/Product";
import Cart from "./containers/Cart";

const App = () => {
  const { loginAuth } = useLogin();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sobre" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/produto" element={<Product />} />
        <Route
          path="/login"
          element={!loginAuth ? <Singin /> : <Navigate to="/" />}
        />
        <Route
          path="/perfil"
          element={loginAuth ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/carrinho"
          element={loginAuth ? <Cart /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
