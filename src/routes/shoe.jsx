import { useOutletContext, useLocation } from "react-router-dom"
import useFetch from '../hooks/useFetch';
import { ShoeInformation } from '../components/index';
import '../index.css';

export default function Shoe() {
  const currentPath = useLocation().pathname;
  const { data: shoeDataArray } = useFetch(`/api${currentPath}`);
  
  const context = useOutletContext();
  const setCart = context[3];
  const productId = currentPath.match(/[^/]+(?=a$|$)/)[0];

  return (
    <main>
      {shoeDataArray[0] && <ShoeInformation 
        key={productId}
        productId={productId}
        productData={shoeDataArray[0]}
        setCart={setCart}
      />}
    </main>
  );
};