import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import Store from "../store/Store";
import { SSRProvider } from "react-bootstrap";
import styles from "../assets/scss/main.scss";
import 'react-toastify/dist/ReactToastify.css';

// Import axios.js so that it can inject token in every request
require("../services/axios");
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <SSRProvider>
        <Provider store={Store}>
          <Component {...pageProps}></Component>
        </Provider>
      </SSRProvider>
    );
  }
}

const makeStore = () => Store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
