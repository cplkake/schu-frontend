import { useOutletContext, Link } from "react-router-dom";
import { CartItemCard } from "../components";

export default function Cart() {
  const context = useOutletContext();
  const cart = context[2];
  const setCart = context[3];

  const subTotal = cart.reduce((prevTotal, cartItem) => prevTotal + cartItem.price * cartItem.quantity, 0);

  const handlePayment = () => {
    alert('We have reached the end of this U.I. Hope you enjoyed the tour! Feedback is kindly appreciated.')
  }

  const renderCartSummary = () => {
    if (subTotal) {
      return (
        <div className="cartItemsContainer">
          {cart.map(cartItem => (
            <CartItemCard
              key={`${cartItem.shoeId}${cartItem.size}${cartItem.quantity}`}
              brandId={cartItem.brandId}
              brandName={cartItem.brandName}
              shoeId={cartItem.shoeId}
              shoeName={cartItem.shoeName}
              colour={cartItem.colour}
              price={cartItem.price}
              quantity={cartItem.quantity}
              stockLeft={cartItem.stockLeft}
              size={cartItem.size}
              setCart={setCart}
              profilePic={cartItem.profilePic}
            />
          ))}
        </div>
      );
    }
    return (
      <div className="emptyCart">
        <p>Your bag is currently empty</p>
      </div>
    )
  }
    

  return (
    <main className="cart">
      <div className="cartContainer outerContainer">
        <div className="cartContainer innerContainer">
          <h2>Your bag</h2>
          <Link to='/collections' className="keepShoppingLink">
            <p>&lt; Keep Shopping</p>
          </Link>
          {renderCartSummary()}
        </div>
      </div>
      <div className="paymentContainer">
        <div className="subTotal">
          <p>SUBTOTAL</p>
          <p>{`${subTotal}.00 CAD`}</p>
        </div>
        <div className="paymentButtonContainer">
          <button onClick={handlePayment}>CONTINUE</button>
        </div>
      </div>
    </main>
  )
}