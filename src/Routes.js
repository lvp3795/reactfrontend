import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoutes from "./auth/PrivateRoutes";
import UserDashboard from "./user/UserDashboard";

import Home from "./coreUI/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Cart from "./coreUI/Cart";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/signup' exact component={Signup}></Route>
        <Route path='/signin' exact component={Signin}></Route>
        <Route path='/cart' exact component={Cart}></Route>
        <PrivateRoutes path='/user/dashboard' exact component={UserDashboard} />
      </Switch>
    </BrowserRouter>
  );
}
