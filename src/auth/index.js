import { API } from "../backend";
import { cartEmpty } from "../coreUI/ultil/cart";

export const signup = (user) => {
  return fetch(`${API}/user/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  const { email, password } = user;
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  for (var key of formData.keys()) {
    console.log("MyKey: ", key);
  }

  return fetch(`${API}/user/login/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log("SUCCESS", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("token")) {
    return JSON.parse(localStorage.getItem("token"));
  } else {
    return false;
  }
};

export const signout = (next) => {
  const userId = isAuthenticated() && isAuthenticated().user.id;
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    cartEmpty(() => {});

    return fetch(`${API}/user/logout/${userId}`, {
      method: "GET",
    })
      .then((response) => {
        next();
      })
      .catch((err) => console.log(err));
  }
};
