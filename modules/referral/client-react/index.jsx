import React from 'react';

import ClientModule from '@gqlapp/module-client-react';

import { translate } from '@gqlapp/i18n-client-react';
import { IfLoggedIn, AuthRoute } from '@gqlapp/user-client-react/containers/Auth.web';
import { MenuItem } from '@gqlapp/look-client-react';
import { Route, NavLink } from 'react-router-dom';
import { Icon } from 'antd';
import Referral from './containers/Referral';
import ReferredRedirect from './containers/ReferredRedirect';
import ReferralVerify from './containers/ReferralVerify';
import resources from './locales';

const NavLinkMyInvitesWithI18n = translate('referral')(({ t }) => (
  <NavLink to="/referrals">
    <div>
      <Icon type="money-collect" />
      {t('referral:navLink')}
    </div>
  </NavLink>
));

const AccountLinkMyInvitesWithI18n = translate('referral')(({ t }) => (
  <NavLink to="/referrals" className="AccDetItem" activeClassName="AccDetItemSelected">
    <div>
      <Icon type="money-collect" />
      {t('referral:accountLink')}
    </div>
  </NavLink>
));

export default new ClientModule({
  route: [
    <AuthRoute exact path="/referrals/:id" redirectOnLoggedIn redirect="/profile" component={ReferredRedirect} />,
    <AuthRoute exact path="/referrals" redirect="/profile" role={['user', 'admin']} component={Referral} />,
    <AuthRoute
      exact
      path="/referrals/verify/:id"
      redirect="/profile"
      role={['user', 'admin']}
      component={ReferralVerify}
    />
  ],
  navItemUser: [
    <IfLoggedIn key="/referrals">
      <MenuItem>
        <NavLinkMyInvitesWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  navItemAccount: [
    <IfLoggedIn key="/referrals">
      <MenuItem>
        <AccountLinkMyInvitesWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  localization: [{ ns: 'referral', resources }]
});
