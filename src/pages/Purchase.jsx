import { useEffect, useState } from "react";
import getConfig from '../utils/getConfig'
import axios from "axios";
import './Purchase.css'

const Purchase = () => {
  const [productsCard, setProductsCard ] = useState([])
  useEffect(() => {
    axios
    .get("https://e-commerce-api-v2.academlo.tech/api/v1/purchases",getConfig())
    .then((resp)=> setProductsCard(resp.data))
  }, [])
  
  return (
    <div className="center">
      <h1>Purchase</h1>
        {productsCard.map(item => (
          <div 
          className="container_pucharse"
          key={item.id}>
            <div className="imgimg_purchase">
            <img src={item.product?.images[0].url} style={{ width: 50, objectFit: "contain" }} alt="" />
            </div>
            <div className="title_purchase">
            {item.product?.title}
            </div>
            <div className="price">
            {item.product?.price}
            </div>
            <div className="quantity">
            {item.quantity}
            </div>
            <div className="total_purchase">
            {item.product?.price * item.quantity}
            </div>
          </div>
        ))
        }
    </div>
  );
};

export default Purchase;