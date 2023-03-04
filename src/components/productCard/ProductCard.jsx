import { Link } from "react-router-dom";
import './productCard.css';

// accepts the id of a shoe model and its brand, and url of the profilePic
// returns a product card linking to the product page of the item
export default function ProductCard(props) {  

  return (
    <div className="productCard">
      <div className="productImageContainer">
        <img src={`https://schu-images.s3.us-west-004.backblazeb2.com/${props.albumURI}/side-right.jpg`} alt="" className="product-main-image" />
        <img src={`https://schu-images.s3.us-west-004.backblazeb2.com/${props.albumURI}/three-quart-front-right.jpg`} alt="" className="product-alt-image" />
      </div>
      <div className="productDetails">
        <p className="brandLink">{props.brand}</p>
        <p className="productName">{props.model}</p>
        <p className="productPrice">{`CA$${props.price}.00`}</p>
      </div>
      <Link to={`/collections/${props.brandId}/${props.modelId}`} className="productLink"></Link>
    </div>
  )
}