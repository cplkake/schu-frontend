import { Link } from "react-router-dom";
import './brandCard.css';

// returns a brand card linking to the collections page featuring products made by the brand
// gets passed in the name of a brand, brand id and an image url
export default function BrandCard(props) {
  const brandURI = props.brandId;
  const brand = props.brand;
  const picURL = props.picURL;
  
  return (
    <Link to={`/collections/${brandURI}`}>
      <div className="brandCard">
        <img src={`${picURL}`} alt="" />
        <div className="brand-overlay-container">
          <p className="brand-overlay-text">{brand}</p>
          <p className="shop-now">Shop Now</p>
        </div>
      </div>
    </Link>
  );
}