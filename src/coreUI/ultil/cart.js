export const addItemToCart = (item, next) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...item,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const loadCart = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const removeItemfromCart = (productId) => {
  console.log(productId);
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === productId) {
        cart.splice(i, 1);
        return localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  }
  return cart;
};

export const cartEmpty = (next) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      localStorage.removeItem("cart");
      let cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      next();
    }
  }
};
