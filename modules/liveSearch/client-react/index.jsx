import React from "react";

import ClientModule from "@gqlapp/module-client-react";
import { translate } from "@gqlapp/i18n-client-react";
import {
  IfLoggedIn,
  AuthRoute
} from "@gqlapp/user-client-react/containers/Auth.web";

import { NavLink } from "react-router-dom";
import { MenuItem } from "@gqlapp/look-client-react";
import { Icon } from "antd";
import LiveSearch from "./containers/LiveSearch";
import resources from "./locales";

const NavLinkLiveSearchWithI18n = translate("liveSearch")(({ t }) => (
  <NavLink to="/live-search" className="nav-link" activeClassName="active">
    <div>
      <Icon type="search" />
      {t("liveSearch:navLink")}
    </div>
  </NavLink>
));

export default new ClientModule({
  route: [
    <AuthRoute
      exact
      path="/live-search"
      redirect="/profile"
      role={["user", "admin"]}
      component={LiveSearch}
    />
  ],
  navItemUser: [
    <IfLoggedIn key="/live-search">
      <MenuItem>
        <NavLinkLiveSearchWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  localization: [{ ns: "liveSearch", resources }]
});
