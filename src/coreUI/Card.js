import React, { useState } from "react";
import ImageHandler from "./ultil/imageHandler";
import { addItemToCart, removeItemfromCart } from "./ultil/cart";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";

export default function Card({
  path,
  product,
  addtoCart = true,
  removeFromCart = true,
  reload = undefined,
  setReload = (f) => f,
}) {
  const [redirect, setRedirect] = useState(false);

  const cartTitle = product ? product.name : "No title";
  const cartDescription = product ? product.description : "No description";
  const cartPrice = product ? product.price : "No Price";

  const addToCart = () => {
    if (isAuthenticated) {
      addItemToCart(product, () => setRedirect(true));
      console.log("added to cart");
    } else {
      console.log("Login please");
    }
  };

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };

  const showAddToCart = (addToCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className='btn btn-block btn-outline-dark mt-2 mb-2'
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemfromCart(product.id);
            setReload(!reload);
          }}
          className='btn btn-block btn-outline-dark mt-2 mb-2'
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className='card border border-gray '>
      <div className='card-header lead text-center text-uppercase'>
        {cartTitle}
      </div>
      <div className='card-body'>
        {getRedirect(redirect)}
        <ImageHandler product={product} />
        <p className='lead font-weight-normal text-wrap'>{cartDescription}</p>
        <p className='lead font-weight-normal text-wrap'>$ {cartPrice}</p>
        <div className='row'>
          <div className='col-12'>
            {isAuthenticated() && showAddToCart(addToCart)}
          </div>
          <div className='col-12'>
            {isAuthenticated() &&
              path !== "Home" &&
              showRemoveFromCart(removeFromCart)}
          </div>
        </div>
      </div>
    </div>
  );
}
