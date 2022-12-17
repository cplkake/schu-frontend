import { Link } from 'react-router-dom';
import './overlayCartItem.css';

export default function OverlayCartItem(props) {
  return (
    <div className="overlayCartItem">
      <div className="overlayCartItemPic">
        <Link to={`/collections/${props.brand}/${props.model}`}>
          <img src={props.profilePic} alt="" />
        </Link>
      </div>
      <div className="overlayCartItemDescription">
        <div className="overlayCartItemNameQuantPrice">
          <Link to={`/collections/${props.brandId}/${props.shoeId}`} className='overlayItemNameLink'>
            <p>{`${props.quantity}x ${props.shoeName}`}</p>
          </Link>
          <p>{`$${props.price * props.quantity}`}</p>
        </div>
        <div className="overlayCartItemColour">
          <p>{props.colour}</p>
        </div>
        <div className="overlayCartItemSizeRemove">
          <p>{`US ${props.size}`}</p>
          <button onClick={props.removeItem}>Remove</button>
        </div>
      </div>
    </div>
  )
}