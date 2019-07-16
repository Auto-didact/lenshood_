import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import { IfLoggedIn, AuthRoute } from '@gqlapp/user-client-react/containers/Auth.web';
import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';

// To Do
import { Icon } from 'antd';

import Listings from './containers/Listings';
import ListingCatalogue from './containers/ListingCatalogue';
import MyListingDetail from './containers/MyListingDetail';
import ListingEdit from './containers/ListingEdit';
import ListingAdd from './containers/ListingAdd';

import ListingDetail from './containers/ListingDetail';
import MyListings from './containers/MyListings';
import ListYourGearOwner from './components/ListYourGearOwner';
import ListYourGearProduct from './components/ListYourGearProduct';
import ListYourGearRental from './components/ListYourGearRental';
import ListingDynamicFieldFormTest from './components/ListingDynamicFieldFormTest';

import resources from './locales';
import resolvers from './resolvers';

const MyListingsNavItemAccount = () => {
  return (
    <div>
      <Icon type="solution" />
      {'My Listings'}
    </div>
  );
};

const NavLinkAdminWithI18n = translate('listing')(({ t }) => (
  <NavLink to="/listings" className="nav-link" activeClassName="active">
    {t('listing:navLinkAdmin')}
  </NavLink>
));
const NavLinkMyListingsWithI18n = translate('listing')(({ t }) => (
  <NavLink to="/my-listings" className=" AccDetItem" activeClassName="AccDetItemSelected">
    <Icon type="solution" />
    {t('listing:navLinkMyListings')}
  </NavLink>
));
const NavLinkListYourGearWithI18n = translate('listing')(({ t }) => (
  <NavLink to="/listing/new" className="nav-link" activeClassName="active">
    {t('listing:navLinkListYourGear')}
  </NavLink>
));

export default new ClientModule({
  route: [
    // Home
    <Route exact path="/" component={ListingCatalogue} />,
    <AuthRoute exact path="/listings" redirect="/profile" role="admin" component={Listings} />,
    <AuthRoute exact path="/listing/new" redirect="/profile" role={['user', 'admin']} component={ListingAdd} />,
    <AuthRoute redirect="/profile" role={['user', 'admin']} path="/listing/:id" component={ListingEdit} />,
    <Route exact path="/listing_catalogue" component={ListingCatalogue} />,
    <Route exact path="/my-listings/:id" component={MyListingDetail} />,

    // Components
    <Route exact path="/listing-detail/:id" component={ListingDetail} />,
    <AuthRoute redirect="/profile" role={['user', 'admin']} exact path="/my-listings" component={MyListings} />,
    <Route exact path="/list-your-gear" component={ListYourGearOwner} />,
    <Route exact path="/list-your-gear2" component={ListYourGearProduct} />,
    <Route exact path="/list-your-gear3" component={ListYourGearRental} />,
    <Route exact path="/listing-dynamic-field" component={ListingDynamicFieldFormTest} />
  ],
  navItemAdmin: [
    <IfLoggedIn>
      <MenuItem key="/listings">
        <NavLinkAdminWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  navItemUser: [
    <IfLoggedIn key="/my-listings">
      <MenuItem>
        <NavLink to="/my-listings">
          <MyListingsNavItemAccount />
        </NavLink>
      </MenuItem>
    </IfLoggedIn>
  ],
  navItemAccount: [
    <IfLoggedIn key="/my-listings">
      <MenuItem>
        <NavLinkMyListingsWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  navItemRight: [
    <IfLoggedIn key="/listing/new">
      <MenuItem>
        <NavLinkListYourGearWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  resolver: [resolvers],
  localization: [{ ns: 'listing', resources }]
});

export { default as SuggestedCardListComponent } from './components/components/SuggestedCardListComponent';
export { ImgCamera } from './constants/DefaultImages';
