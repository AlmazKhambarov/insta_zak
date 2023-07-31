import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import MainRoutes from './MainRoutes/MainRoutes';
import 'font-awesome/css/font-awesome.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <MainRoutes />
    </Provider>
  </BrowserRouter>
);
