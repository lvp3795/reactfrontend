import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { cartEmpty } from "./ultil/cart";
import { getPaymentToken, processPayment } from "./ultil/payment";
import { createOrder } from "./ultil/order";
import { isAuthenticated, signout } from "../auth/index";
import DropIn from "braintree-web-drop-in-react";

export default function Payment({
  products,
  reload = undefined,
  setReload = (f) => f,
}) {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user.id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getPaymentToken(userId, token).then((info) => {
      if (info.error) {
        setInfo({
          ...info,
          error: info.error,
        });
        signout(() => {
          return <Redirect to='/' />;
        });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getAmount = () => {
    let amount = 0;
    products.map((product) => {
      amount = amount + parseInt(product.price);
    });
    return amount;
  };

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount(),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
            if (response.error) {
              if (response.code == "1") {
                console.log("PAYMENT FAILED");
                signout(() => {
                  return <Redirect to='/' />;
                });
              }
            } else {
              setInfo({ ...info, success: response.success, loading: false });
              console.log("PAYMENT SUCCESS");
              let product_names = "";
              products.forEach(function (item) {
                product_names += item.name + ", ";
              });
              const orderData = {
                products: product_names,
                transaction_id: response.transaction.id,
                amount: response.transaction.amount,
              };
              createOrder(userId, token, orderData)
                .then((response) => {
                  if (response.error) {
                    if (response.code == "1") {
                      console.log("ORDER FAILED");
                    }
                    signout(() => {
                      return <Redirect to='/' />;
                    });
                  } else {
                    if (response.success == true) {
                      console.log("ORDER PLACED");
                    }
                  }
                })
                .catch((err) => {
                  setInfo({ loading: false, success: false });
                  console.log("ORDER FAILED", err);
                });
              cartEmpty(() => {
                console.log("EMPTY ALL CART ITEM");
              });
              setReload(!reload);
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log("NONCE", err));
  };

  const showBtnDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            ></DropIn>
            <button className='btn btn-block btn-dark' onClick={onPurchase}>
              Buy Now
            </button>
          </div>
        ) : (
          <div>Please login first or add something in cart</div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h5>Your bill is {getAmount()}$</h5>
      {showBtnDropIn()}
    </div>
  );
}
