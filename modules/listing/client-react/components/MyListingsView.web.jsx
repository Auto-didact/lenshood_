import React, { Component } from "react";
import { Layout, Row, Col, Breadcrumb } from "antd";
import { AccountLayout } from "@gqlapp/look-client-react";
// import './resources/listingCatalogue.css';
import MyList from "./components/MyList";
import AccDetailsMenu from "./components/AccDetailsMenu";
import settings from '../../../../settings';
import Helmet from 'react-helmet';


class MyListingsView extends Component {
  render() {
    return (
      
      <AccountLayout select="/my-listings">
        {/* Render metadata */}
      <Helmet
        title={`${settings.app.name} - My Listings`}
        meta={[
          {
            name: 'description',
            content: `${settings.app.name} - My Listings)}`
          }
        ]}
      />
      {this.props.loading && !this.props.userListings && <div>Loading...</div>}
      {this.props.userListings && <MyList {...this.props}/>}
      </AccountLayout>
    );
  }
}

export default MyListingsView;
