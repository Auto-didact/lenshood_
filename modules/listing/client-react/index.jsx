import React from "react";

import ClientModule from "@gqlapp/module-client-react";
import { translate } from "@gqlapp/i18n-client-react";
import { IfLoggedIn } from "@gqlapp/user-client-react/containers/Auth.web";
import { Route, NavLink } from "react-router-dom";
import { MenuItem } from "@gqlapp/look-client-react";

// To Do
import { Icon } from "antd";

import Listings from "./containers/Listings";
import ListingCatalogue from "./containers/ListingCatalogue";
import MyListingDetail from "./containers/MyListingDetail";
import ListingEdit from "./containers/ListingEdit";
import ListingAdd from "./containers/ListingAdd";

import ListingDetail from "./containers/ListingDetail";
import MyListings from "./containers/MyListings";
import ListYourGearOwner from "./components/ListYourGearOwner";
import ListYourGearProduct from "./components/ListYourGearProduct";
import ListYourGearRental from "./components/ListYourGearRental";
import ListingDynamicFieldFormTest from "./components/ListingDynamicFieldFormTest";

import resources from "./locales";
// import resolvers from './resolvers';

const NavLinkAdminWithI18n = translate("listing")(({ t }) => (
  <NavLink to="/listings" className="nav-link" activeClassName="active">
    {t("listing:navLinkAdmin")}
  </NavLink>
));
const NavLinkMyListingsWithI18n = translate("listing")(({ t }) => (
  <NavLink
    to="/my-listings"
    className=" AccDetItem"
    activeClassName="AccDetItemSelected"
  >
    <Icon type="solution" />
    {t("listing:navLinkMyListings")}
  </NavLink>
));
const NavLinkListYourGearWithI18n = translate("listing")(({ t }) => (
  <NavLink to="/listing/new" className="nav-link" activeClassName="active">
    {t("listing:navLinkListYourGear")}
  </NavLink>
));

export default new ClientModule({
  route: [
    // Home
    <Route exact path="/" component={ListingCatalogue} />,

    <Route exact path="/listings" component={Listings} />,
    <Route exact path="/listing/new" component={ListingAdd} />,
    <Route path="/listing/:id" component={ListingEdit} />,
    <Route exact path="/listing_catalogue" component={ListingCatalogue} />,
    <Route exact path="/mylisting/" component={MyListingDetail} />,

    // Components
    <Route exact path="/listing-detail/:id" component={ListingDetail} />,
    <Route exact path="/my-listings" component={MyListings} />,
    <Route exact path="/list-your-gear" component={ListYourGearOwner} />,
    <Route exact path="/list-your-gear2" component={ListYourGearProduct} />,
    <Route exact path="/list-your-gear3" component={ListYourGearRental} />,
    <Route
      exact
      path="/listing-dynamic-field"
      component={ListingDynamicFieldFormTest}
    />
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
        <NavLinkMyListingsWithI18n />
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
  localization: [{ ns: "listing", resources }]
});
