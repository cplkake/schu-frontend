import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ShoeSizeOption } from '../index';
import './shoeInformation.css'

export default function ShoeInformation({ productId, productData, setCart }) {
  const [size, setSize] = useState(false); 
  const toggleOverlay = useOutletContext()[4];

  const shoeModel = productData.shoe_model;
  const shoeSizes = productData.shoe_sizes.sort((a, b) => a.size - b.size);
  const productPicNames = ['side-right.jpg', 'three-quart-front-right.jpg', 'top-profile.jpg', 'rear-profile.jpg'];
  
  const findStockLeft = (sizeOption) => shoeSizes.find(sizeObj => sizeObj.size == sizeOption).stock;
  
  // will not select sizes that are out of stock
  const handleClick = (sizeOption) => {
    if (findStockLeft(sizeOption) > 0) setSize(sizeOption);    
  }

  const addToCart = () => {
    const newCartItem = {
      brandName: shoeModel.brand.name,
      brandId: shoeModel.brand['_id'],
      shoeName: shoeModel.model,
      shoeId: productId,
      colour: shoeModel.colour,
      price: shoeModel.price,
      size: size,
      quantity: 1,
      stockLeft: findStockLeft(size),
      profilePic: `https://schu-images.s3.us-west-004.backblazeb2.com/${shoeModel.albumURI}/side-right.jpg`,
    };

    setCart(prevCartState => {
      const newState = [...prevCartState];
      let cartItemMatch = newState.find(cartItem => cartItem.shoeId === newCartItem.shoeId && cartItem.size === newCartItem.size);
      if (cartItemMatch) {
        cartItemMatch.quantity += 1;
        return newState;
      }
      return newState.concat([newCartItem])
    });

    toggleOverlay();
  }


  return (
    <div className="productInformation">
      <div className="productGallery">
        {productPicNames.map(picName => (
          <img src={`https://schu-images.s3.us-west-004.backblazeb2.com/${productData.shoe_model.albumURI}/${picName}`} alt="" /> 
        ))}
      </div>
      <div className="productDetails outerContainer">
        <div className="productDetails innerContainer">
          <div className="productDetails">
            <h1>{shoeModel.model}</h1>
            <p className="byBrandName">by {shoeModel.brand.name}</p>
            <h3>${shoeModel.price}</h3>
            <p className="productDescription">{shoeModel.description}</p>
          </div>
          <div className="productForm">
            <div className='selectContainer'>
              {productData && (shoeSizes.map(sizeObj => (
                <ShoeSizeOption 
                  key={sizeObj.size}
                  size={sizeObj.size}
                  inStock={sizeObj.stock !== 0}
                  handleClick={handleClick}
                  selected={sizeObj.size === size}
                />
              )))}
            </div>
            <button
                className="addBag"
                onClick={addToCart}
                disabled={!size}
            >
              <span className="buttonText">Add to bag</span>
            </button>
            <p className="productColour">Colour: {shoeModel.colour}</p>
          </div>
        </div>
      </div>
    </div>
  )
}