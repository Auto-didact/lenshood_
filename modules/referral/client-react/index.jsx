import React from "react";

import ClientModule from "@gqlapp/module-client-react";

import { translate } from "@gqlapp/i18n-client-react";
import {
  IfLoggedIn,
  AuthRoute
} from "@gqlapp/user-client-react/containers/Auth.web";
import { MenuItem } from "@gqlapp/look-client-react";
import { Route, NavLink } from "react-router-dom";
import { Icon } from "antd";
import Referral from "./containers/Referral";
import ReferredRedirect from "./containers/ReferredRedirect";
import resources from "./locales";

const NavLinkMyInvitesWithI18n = translate("referral")(({ t }) => (
  <NavLink to="/invites">
    <div>
      <Icon type="money-collect" />
      {t("referral:navLink")}
    </div>
  </NavLink>
));

export default new ClientModule({
  route: [
    <Route exact path="/invites" component={Referral} />,
    <AuthRoute
      exact
      path="/invites/:id"
      redirectOnLoggedIn
      redirect="/"
      component={ReferredRedirect}
      // invite={true}
    />
  ],
  navItemUser: [
    <IfLoggedIn key="/invites">
      <MenuItem>
        <NavLinkMyInvitesWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  localization: [{ ns: "referral", resources }]
});
