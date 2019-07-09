import React from "react";
import { Route, NavLink } from "react-router-dom";

import { translate } from "@gqlapp/i18n-client-react";
import Counter from "./containers/Counter";
import counters from "./counters";
import ClientModule from "@gqlapp/module-client-react";
import resources from "./locales";
import { MenuItem } from "@gqlapp/look-client-react";

import CartCounter from "./CartCounter/containers/CartCounter";

import { IfLoggedIn } from "@gqlapp/user-client-react/containers/Auth.web";

const NavLinkWithI18n = translate("counter")(({ t }) => (
  <NavLink to="/counter" className="nav-link" activeClassName="active">
    {t("navLink")}
  </NavLink>
));

export default new ClientModule(counters, {
  route: [<Route exact path="/counter" component={Counter} />],
  navItemTest: [
    <MenuItem key="/counter">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  // navItemRight: [
  //   <IfLoggedIn key="/my-orders">
  //     <MenuItem>
  //       <NavLink to="/my-orders" className="nav-link" activeClassName="active">
  //         <CartCounter />
  //       </NavLink>
  //     </MenuItem>
  //   </IfLoggedIn>
  // ],
  localization: [{ ns: "counter", resources }]
});
