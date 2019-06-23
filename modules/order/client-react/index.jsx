import React from "react";

import ClientModule from "@gqlapp/module-client-react";

import { translate } from "@gqlapp/i18n-client-react";
import { IfLoggedIn } from "@gqlapp/user-client-react/containers/Auth.web";
import { MenuItem } from "@gqlapp/look-client-react";
import { Route, NavLink } from "react-router-dom";
import CheckoutCart from "./containers/CheckoutCart";
import CheckoutBill from "./containers/CheckoutBill";
import CheckoutPay from "./containers/CheckoutPay";
import CheckoutOrder from "./containers/CheckoutOrder";
import MyOrders from "./containers/MyOrders";
import { Icon } from "antd";
import resources from "./locales";

const MyOrdersNavItemAccount = () => {
  return (
    <div>
      <Icon type="shopping-cart" />
      My Orders
    </div>
  );
};

const NavLinkMyOrdersWithI18n = translate("order")(({ t }) => (
  <NavLink
    to="/my-orders"
    className=" AccDetItem"
    activeClassName="AccDetItemSelected"
  >
    <Icon type="shopping-cart" />
    My Orders
  </NavLink>
));

export default new ClientModule({
  route: [
    <Route exact path="/my-orders" component={MyOrders} />,
    <Route path="/checkout-cart" exact component={CheckoutCart} />,
    <Route path="/checkout-bill" exact component={CheckoutBill} />,
    <Route path="/checkout-pay" exact component={CheckoutPay} />,
    <Route path="/checkout-order" exact component={CheckoutOrder} />
  ],
  navItemAccount: [
    <IfLoggedIn key="/my-orders">
      <MenuItem>
        <NavLinkMyOrdersWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  navItemUser: [
    <IfLoggedIn key="/my-orders">
      <MenuItem>
        <NavLink to="/my-orders">
          <MyOrdersNavItemAccount />
        </NavLink>
      </MenuItem>
    </IfLoggedIn>
  ],
  localization: [{ ns: "order", resources }]
});
