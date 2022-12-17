import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { App } from './components/index';
import Home from './routes/home';
import Collections from './routes/collections';
import Shoe from './routes/shoe';
import Cart from './routes/cart';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />} />
        <Route path='collections' element={<Collections key={'all'} />} />
        <Route path='collections/new-arrivals' element={<Collections key={'new-arrivals'} />}/>
        <Route path='collections/:brandId' element={<Collections key={'brand'} />}/>
        <Route path='collections/:brandId/:modelId' element={<Shoe />} />
        <Route path='cart' element={<Cart />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
