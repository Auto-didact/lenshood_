import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import Counter from './containers/Counter';
import counters from './counters';
import ClientModule from '@gqlapp/module-client-react';
import resources from './locales';
import { MenuItem } from '@gqlapp/look-client-react';

const NavLinkWithI18n = translate('counter')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/counter" className="nav-link" activeClassName="active">
    {t('navLink')}
  </NavLink>
));

export default new ClientModule(counters, {
  route: [<Route exact path="/counter" component={Counter} />],
  navItemTest: [
    <MenuItem key="/counter">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'counter', resources }]
});
