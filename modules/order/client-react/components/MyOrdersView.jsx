import React, { Component } from 'react';
import { AccountLayout } from '@gqlapp/look-client-react';
import Helmet from 'react-helmet';
// import './resources/listingCatalogue.css';
import MyOrderComponent from './MyOrderComponent';
import settings from '../../../../settings';

const renderMetaData = () => <Helmet title={`${settings.app.name} - My Orders`} />;

export default class MyOrdersView extends Component {
  state = {
    listings: this.props.listings
  };
  render() {
    return (
      <AccountLayout select="/my-orders">
        {renderMetaData()}
        <MyOrderComponent listings={this.state.listings} />
      </AccountLayout>
    );
  }
}
