import './cartItemCard.css'

export default function CartItemCard(props) {
  const { brandId, brandName, shoeId, shoeName, colour, price, quantity, stockLeft, size, setCart, profilePic } = props;
  const stockArray = Array.from(Array(stockLeft), (e, i)=> i + 1)
  

  const changeQuantity = e => {
    setCart(prevCartState => {
      const newState = [...prevCartState]
      let cartItemMatch = newState.find(cartItem => cartItem.shoeId === shoeId && cartItem.size === size)
      if (cartItemMatch) {
        cartItemMatch.quantity = Number(e.target.value);
        return newState;
      }
    })
  }

  const removeItem = (shoeId, size) => {
    setCart(prevCartState => (
      prevCartState.filter(cartItem => cartItem.shoeId !== shoeId || cartItem.size !== size)
    ))
  }

  return (
    <div className="cartItemCard">
      <p className="cartItemName">{shoeName}</p>
      <div className="cartItemInfo">
        <div className="cartItemPic">
            <img src={profilePic} alt="" />
        </div>
        <div className="cartItemDetails">
          <div className="cartItemColourSize">
            <p>{colour}</p>
            <p>{`US ${size}`}</p>
          </div>
          <div className="cartItemQuantity">
            <label>
              Quantity
              <select className="selectQuantity" onChange={changeQuantity} value={quantity}>
                {stockArray.map(amount => (
                  <option key={amount} value={amount}>{amount}</option>
                ))}
              </select>
            </label>
            <button onClick={() => removeItem(shoeId, size)}>Remove</button>
          </div>
          <div className="cartItemPriceBreakdown">
            <p className="quantityXprice">{`${quantity} x ${price} CAD`}</p>
            <p>{`${price * quantity} CAD`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};