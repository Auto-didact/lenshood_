import React, { Component } from "react";

// import './resources/listingCatalogue.css';

import MyListingsView from "../components/MyListingsView";

import { ALL, ONSHELF, ONRENT } from "../constants/ListingStates";

class MyListings extends Component {
  state = {
    listings: [
      {
        description: "Blah blah bleh",
        listingRental: {
          perDay: 1200
        },
        image: `https://images.pexels.com/photos/122400/pexels-photo-122400.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`,
        rating: 4,
        reviews: 7,
        status: ALL
      },
      {
        description: "Blah lah bleh",
        listingRental: {
          perDay: 120
        },
        image: `https://images.pexels.com/photos/122400/pexels-photo-122400.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`,
        rating: 3.7,
        reviews: 12,
        status: ONSHELF
      },
      {
        description: "fdgbdfcgmbkmg;ngvjnpcghn",
        listingRental: {
          perDay: 200
        },
        image: `https://images.pexels.com/photos/122400/pexels-photo-122400.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`,
        rating: 3,
        reviews: 8,
        status: "On Rent"
      },
      {
        description: "Blah lah bleh",
        listingRental: {
          perDay: 120
        },
        image: `https://images.pexels.com/photos/122400/pexels-photo-122400.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`,
        rating: 3.9,
        reviews: 25,
        status: ONRENT
      }
    ]
  };
  render() {
    return (
      // <div className="padA20">
      //   <Breadcrumb separator=">">
      //     <Breadcrumb.Item>Account</Breadcrumb.Item>
      //     <Breadcrumb.Item href=""> My listing</Breadcrumb.Item>
      //   </Breadcrumb>
      //   <Layout className="layoutList">
      //     <Row className="layoutRow">
      //       <Col lg={7} md={24}>
      //         <AccDetailsMenu select={3} />
      //       </Col>
      //       <Col lg={15} md={24}>
      //         <MyList products={this.state.products} />
      //       </Col>
      //     </Row>
      //   </Layout>
      // </div>
      <MyListingsView listings={this.state.listings} />
    );
  }
}

export default MyListings;
