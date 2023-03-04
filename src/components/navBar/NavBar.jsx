import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { OverlayCartItem } from '../index';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import './navBar.css';

export default function NavBar({cart, setCart, cartOverlay, toggleCartOverlay}) {
  
  // state tracking if the app is currently scrolled to the top of the page
  const [navBarPosition, setNavBarPosition] = useState('topPage');
  const [menuOverlay, setMenuOverlay] = useState(false);
  
  const { width } = useWindowDimensions();
  const location = useLocation()
  const numCartItems = cart.reduce((totalItems, currentItem) => totalItems + currentItem.quantity, 0)
  const subTotal = cart.reduce((prevTotal, cartItem) => prevTotal + cartItem.price * cartItem.quantity, 0);
  const navLinkStyle = {
    textDecoration: "none",
    color: location.pathname === '/' ? 'inherit' : 'black',
    fontSize: '16px',
    fontWeight: '400',
    paddingRight: "20px",
  }
  const navLogoLinkStyle = {
    textDecoration: "none",
    color: location.pathname === '/' ? 'inherit' : 'black',
    fontSize: "25px",
    fontWeight: "700",
    paddingRight: width > 1023 ? "40px" : "0px",
    zIndex: 100,
  }

  const toggleMenuOverlay = () => {
    menuOverlay ? setMenuOverlay(false) : setMenuOverlay(true);
  }
  
  const removeItem = (shoeId, size) => {
    setCart(prevCartState => (
      prevCartState.filter(cartItem => cartItem.shoeId !== shoeId || cartItem.size !== size)
    ))
  }
    
  const renderOverlayMenu = () => {
    return (
      <div className='cartItemsSummaryContainer'>
        <div className="menuItems">
          <Link to='/collections' style={navLinkStyle} className='menuLink' onClick={toggleMenuOverlay}>Shop</Link>
          <Link to='/collections/new-arrivals' style={navLinkStyle} className='menuLink' onClick={toggleMenuOverlay}>New Arrivals</Link>
        </div>
      </div>
    )
  }
  
  // render a summary of the items in the cart if it is not empty
  // otherwise render the message "Your bag is currently empty"
  const renderOverlayCartSummary = () => {
    if (numCartItems) {
      return (
        <div className="cartItemsSummaryContainer">
          <div className="cartItems">
            {cart.map(cartItem => (
              <OverlayCartItem
                key={`${cartItem.shoeId}${cartItem.size}${cartItem.quantity}`}
                brandName={cartItem.brandName}
                brandId={cartItem.brandId}
                shoeName={cartItem.shoeName}
                shoeId={cartItem.shoeId}
                colour={cartItem.colour}
                price={cartItem.price}
                size={cartItem.size}
                quantity={cartItem.quantity}
                profilePic={cartItem.profilePic}
                removeItem={() => removeItem(cartItem.shoeId, cartItem.size)}
              />
            ))}
          </div>
          <div className="cartTotalAndCheckout">
            <div className="subTotalContainer">
              <p>Subtotal:</p>
              <p>{`$${subTotal}`}</p>
            </div>
            <div className="checkOutContainer">
              <Link to='cart' onClick={toggleCartOverlay}>
                <button className="checkOut">Checkout</button>
              </Link>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="emptyOverlayCart">
          <p>Your bag is currently empty</p>
        </div>
      )
    }
  }
  
  const WideNavBar = () => {
    return (
      <nav className={`navBar ${navBarPosition}`}>
      <div className="leftLinks">
        <Link to='/' style={navLogoLinkStyle}>SCHU</Link>
        <Link to='/collections' style={navLinkStyle}>Shop</Link>        
        <Link to='/collections/new-arrivals' style={navLinkStyle}>New Arrivals</Link>        
      </div>
      <div className="overlays">
        <div className={`pageOverlay ${cartOverlay ? 'activeOverlay' : null}`} onClick={toggleCartOverlay}></div>
        <div className={`navOverlay ${cartOverlay ? 'activeOverlay' : null}`}>
          {renderOverlayCartSummary()}
        </div>
      </div>
      <button id='shoppingBagIcon' onClick={toggleCartOverlay}>{numCartItems}</button>
    </nav>  
    )
  }
  
  const MobileNavBar = () => {
    return (
      <nav className={`navBar ${navBarPosition}`}>
        <div className={`hamburgerContainer ${menuOverlay ? 'activeOverlay' : null}`} onClick={toggleMenuOverlay}>
          <span className={`line line1 ${location.pathname === '/' ? 'home' : 'notHome'}`}></span>
          <span className={`line line2 ${location.pathname === '/' ? 'home' : 'notHome'}`}></span>
          <span className={`line line3 ${location.pathname === '/' ? 'home' : 'notHome'}`}></span>
        </div>
        <div className="overlays">
          <div className={`pageOverlay ${menuOverlay ? 'activeOverlay' : null}`} onClick={toggleMenuOverlay}></div>
          <div className={`navOverlay ${menuOverlay ? 'activeOverlay' : null}`}>
            {renderOverlayMenu()}
          </div>
        </div>
        <Link to='/' style={navLogoLinkStyle} onClick={() => setMenuOverlay(false)}>SCHU</Link>
        <div className="overlays">
          <div className={`pageOverlay ${cartOverlay ? 'activeOverlay' : null}`} onClick={toggleCartOverlay}></div>
          <div className={`navOverlay ${cartOverlay ? 'activeOverlay' : null}`}>
            {renderOverlayCartSummary()}
          </div>
        </div>
        <button id='shoppingBagIcon' onClick={toggleCartOverlay}>{numCartItems}</button>
      </nav>
    )
  }
  
  useEffect(() => {
    const onScroll = () => {
      if (!cartOverlay) setNavBarPosition(window.pageYOffset === 0 ? '' : 'notTopPage');
    }
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll);
  }, [cartOverlay]);


  return (
    width > 1023 ? <WideNavBar /> : <MobileNavBar />
  )
}