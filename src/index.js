import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react'


import App from './pages/App/App';
import API from "./API";
import{store, persistor} from "./store";

import './index.css';
import {Toaster} from "react-hot-toast";

const widgetContainer = document.getElementById('shopping-cart');
const widgetPaths = ['filter','cart','products', 'all', 'sale', 'menu', 'page', 'thank-you'];

const pathNameArray =  window.location.pathname.split('/');

//Removes product name from basename
if(pathNameArray.includes('preview')) {
    pathNameArray.splice(pathNameArray.indexOf('preview') - 1, 1);
    pathNameArray.splice(pathNameArray.indexOf('preview'), 1);
}

//Removes category from basename
if(pathNameArray.includes('products')) {
    pathNameArray.splice(pathNameArray.indexOf('products') + 1, 1);
    pathNameArray.splice(pathNameArray.indexOf('products'), 1);
}

if(pathNameArray.includes('page')) {
    pathNameArray.splice(pathNameArray.indexOf('page') + 1, 1);
    pathNameArray.splice(pathNameArray.indexOf('page'), 1);
}

let basename =
        pathNameArray.reduce((acc = '', path) => {
            if(!widgetPaths.includes(path)) {
                return acc + '/' + path;
            }
            return acc;
        });

basename = basename.charAt(basename.length - 1) === '/' ? basename.slice(0, -1) : basename;

API._UUID = widgetContainer?.getAttribute('data-shop-uuid');
ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <Toaster />
              <BrowserRouter basename={basename}>
                  <App />
              </BrowserRouter>
          </PersistGate>
      </Provider>
  </React.StrictMode>,
  widgetContainer
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
