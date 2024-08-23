import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { RouterProvider } from 'react-router-dom';
import PageRoutes from './Routes/PageRoutes.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={PageRoutes} />
  </Provider>

);

reportWebVitals();
