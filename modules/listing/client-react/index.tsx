import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';

import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import Listing from './containers/Listing';
import resources from './locales';

const NavLinkWithI18n = translate('listing')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/listing" className="nav-link" activeClassName="active">
    {t('listing:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [<Route exact path="/listing" component={Listing} />],
  navItem: [
    <MenuItem key="/listing">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'listing', resources }]
});
