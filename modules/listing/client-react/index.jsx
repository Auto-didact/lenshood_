import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import { IfLoggedIn } from '@gqlapp/user-client-react/containers/Auth.web';
import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';

import Listings from './containers/Listings';
// import Listing from './containers/Listing';
// import ListingEdit from './containers/ListingEdit';
import ListingAdd from './containers/ListingAdd';
import resources from './locales';
// import resolvers from './resolvers';

const NavLinkAdminWithI18n = translate('listing')(({ t }) => (
  <NavLink to="/listings" className="nav-link" activeClassName="active">
    {t('listing:navLinkAdmin')}
  </NavLink>
));

export default new ClientModule({
  route: [
    <Route exact path="/listings" component={Listings} />,
    <Route exact path="/listing/new" component={ListingAdd} />
  ],
  navItemAdmin: [
    <IfLoggedIn>
      <MenuItem key="/listings">
        <NavLinkAdminWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  localization: [{ ns: 'listing', resources }]
});
