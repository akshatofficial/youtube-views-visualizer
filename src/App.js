import React from "react";
import "./App.css";
import Display from "./components/Display";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer />
      <Display />
    </>
  );
};

export default App;
