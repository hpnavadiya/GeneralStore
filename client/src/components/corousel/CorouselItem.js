import React from 'react';
import "./Corousel.scss";
import { Link } from "react-router-dom";
import { shortenText } from "../../utils";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";

const CorouselItem = ({ _id, url, name, price, description, click }) => {
  return (
    <div className="carouselItem">
      <Link
        key={_id}
        to={`/dashboard/admin/product/${_id}`}
        className="product-link"
      >
        <img className="product--image" src={url} alt="product" />
        <p className="price">{`$${price}`}</p>
        <h4>{shortenText(name, 18)}</h4>
        <p className="--mb">{shortenText(description, 26)}</p>
      </Link>
      <button className="btn btn-primary --btn-block" onClick={click}>Add To Cart</button>
    </div>
  )
}

export default CorouselItem
