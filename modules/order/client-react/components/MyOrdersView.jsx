import React, { Component } from "react";
import { AccountLayout } from "@gqlapp/look-client-react";
// import './resources/listingCatalogue.css';
import MyOrder from "./MyOrder";

class MyListingsView extends Component {
  state = {
    listings: this.props.listings
  };
  render() {
    return (
      <AccountLayout select="/my-orders">
        <MyOrder listings={this.state.listings} />
      </AccountLayout>
    );
  }
}

export default MyListingsView;
