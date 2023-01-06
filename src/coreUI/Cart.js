import React, { useEffect, useState } from "react";
import Template from "../coreUI/Template";
import Card from "./Card";
import Payment from "./Payment";
import { loadCart } from "./ultil/cart";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div className='row'>
        {products.map((product, index) => {
          return (
            <div key={index} className='col-3 mb-4'>
              <Card
                key={index}
                product={product}
                removeFromCart={true}
                addtoCart={false}
                reload={reload}
                setReload={setReload}
                path='Cart'
              />
            </div>
          );
        })}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h1>Checkout</h1>
      </div>
    );
  };
  return (
    <Template title='Cart page' description='Welcome to cart page'>
      {(products && products.length) > 0 ? (
        loadAllProducts(products)
      ) : (
        <div className='text-center'>No products</div>
      )}
      <div>
        {(products && products.length) > 0 ? (
          <div className='row text-center d-flex justify-content-center'>
            <Payment products={products} setReload={setReload}></Payment>
          </div>
        ) : (
          <div className='text-center'>
            Please login or add something in cart
          </div>
        )}
      </div>
    </Template>
  );
}
