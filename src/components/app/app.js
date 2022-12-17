import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { NavBar, Footer, ScrollToTop } from '../index';
import './app.css';

function App() {
    
  // cart is an array of products that the user has added to cart
  const [cart, setCart] = useLocalStorage('cart', []);
  
  // cartOverlay is a boolean state recording if the shopping cart in the navbar component is currently being viewed
  const [cartOverlay, setCartOverlay] = useState(false);

  // might not be needed
  const [apiRoute, setApiRoute] = useState('');

  const toggleCartOverlay = () => {
    cartOverlay ? setCartOverlay(false) : setCartOverlay(true);
  }

  return (
    <div className="App">
      <ScrollToTop 
        cartOverlay={cartOverlay}
        setCartOverlay={setCartOverlay}
      />
      <NavBar 
        cart={cart}
        setCart={setCart}
        cartOverlay={cartOverlay}
        toggleCartOverlay={toggleCartOverlay}
      />
      <Outlet context={[apiRoute, setApiRoute, cart, setCart, toggleCartOverlay]} />
      <Footer />
    </div>
  );
}

export default App;