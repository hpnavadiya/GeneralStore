import React from "react";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { Spinner } from "./components/loader/Loader";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  axios.defaults.withCredentials = true

  return (
    <>
      <BrowserRouter>
      <ToastContainer/>
        <Header />
        <Spinner />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
