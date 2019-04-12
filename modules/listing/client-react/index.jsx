import React from 'react';

import ClientModule from '@gqlapp/module-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import { IfLoggedIn } from '@gqlapp/user-client-react/containers/Auth.web';
import { Route, NavLink } from 'react-router-dom';
import { MenuItem } from '@gqlapp/look-client-react';

import Listings from './containers/Listings';
import ListingCatalogue from './containers/ListingCatalogue';
import MyListingDetail from './containers/MyListingDetail';
import ListingEdit from './containers/ListingEdit';
import ListingAdd from './containers/ListingAdd';

import ListingDetail from './components/ListingDetail';
import MyListings from './components/MyListings';
import ListYourGearOwner from './components/ListYourGearOwner';
import ListYourGearProduct from './components/ListYourGearProduct';
import ListYourGearRental from './components/ListYourGearRental';

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
    <Route exact path="/listing/new" component={ListingAdd} />,
    <Route path="/listing/:id" component={ListingEdit} />,
    <Route exact path="/listing_catalogue" component={ListingCatalogue} />,
    <Route exact path="/mylisting/:id" component={MyListingDetail} />,

    // Components
    <Route exact path="/listing-detail" component={ListingDetail} />,
    <Route exact path="/my-listings" component={MyListings} />,
    <Route exact path="/list-your-gear" component={ListYourGearOwner} />,
    <Route exact path="/list-your-gear2" component={ListYourGearProduct} />,
    <Route exact path="/list-your-gear3" component={ListYourGearRental} />
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
