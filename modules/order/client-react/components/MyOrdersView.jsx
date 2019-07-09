import React, { Component } from "react";
import { AccountLayout } from "@gqlapp/look-client-react";
// import './resources/listingCatalogue.css';
import MyOrderComponent from "./MyOrderComponent";

class MyListingsView extends Component {
  state = {
    listings: this.props.listings
  };
  render() {
    return (
      <AccountLayout select="/my-orders">
        <MyOrderComponent listings={this.state.listings} />
      </AccountLayout>
    );
  }
}

export default MyListingsView;
