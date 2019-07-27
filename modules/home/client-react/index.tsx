import React from "react";

import ClientModule from "@gqlapp/module-client-react";
// import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';

import { Route /*NavLink*/ } from "react-router-dom";
// import { MenuItem } from '@gqlapp/look-client-react';
import Home from "./containers/Home";
import resources from "./locales";

// const NavLinkWithI18n = translate('home')(({ t }: { t: TranslateFunction }) => (
//   <NavLink to="/home" className="nav-link" activeClassName="active">
//     {t('home:navLink')}
//   </NavLink>
// ));

export default new ClientModule({
  route: [<Route exact path="/home" component={Home} />],
  localization: [{ ns: "home", resources }]
});
