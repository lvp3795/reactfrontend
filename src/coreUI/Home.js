import React, { useState, useEffect } from "react";

import { getProducts } from "./ultil/product";
import Template from "./Template";
import Card from "./Card";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Template title='Home Page' description='Welcome to home page'>
      <div className='row d-flex justify-content-center align-content-center'>
        {products.map((product, index) => {
          return (
            <div key={index} className='col-3 mb-4'>
              <Card product={product} path='Home' />
            </div>
          );
        })}
      </div>
    </Template>
  );
}
