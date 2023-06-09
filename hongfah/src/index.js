import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { createStore } from 'redux'
import { Provider } from "react-redux";
import dataUser from "./reducers/dataUser";
import { BrowserRouter } from "react-router-dom";
import 'antd/dist/antd.less';
axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.headers.post["Content-Type"] = "application/json";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(dataUser);


root.render(
  <React.StrictMode>
  <BrowserRouter>
    <Provider store={store} >
    <App />
    </Provider>
  </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
