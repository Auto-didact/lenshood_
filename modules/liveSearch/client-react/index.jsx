import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import { IfLoggedIn, AuthRoute } from '@gqlapp/user-client-react/containers/Auth.web';

import { NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';
import { Icon } from 'antd';
import LiveSearch from './containers/LiveSearch';
import resources from './locales';
import resolvers from './resolvers/index';

const NavLinkLiveSearchWithI18n = translate('liveSearch')(({ t }) => (
  <NavLink to="/live-search" className="nav-link" activeClassName="active">
    <div>
      <Icon type="search" />
      {t('liveSearch:navLink')}
    </div>
  </NavLink>
));

const AccountLinkLiveSearchWithI18n = translate('liveSearch')(({ t }) => (
  <NavLink to="/live-search" className="AccDetItem" activeClassName="AccDetItemSelected">
    <Icon type="search" />
    {t('liveSearch:navLink')}
</NavLink>
));

export default new ClientModule({
  route: [<AuthRoute exact path="/live-search" redirect="/profile" role={['user', 'admin']} component={LiveSearch} />],
  navItemUser: [
    <IfLoggedIn key="/live-search">
      <MenuItem>
        <NavLinkLiveSearchWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  navItemAccount: [
    <IfLoggedIn key="/live-search">
      <MenuItem>
        <AccountLinkLiveSearchWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],

  resolver: [resolvers],
  localization: [{ ns: 'liveSearch', resources }]
});
