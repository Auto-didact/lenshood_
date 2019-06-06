import React, { Component } from "react";

// import { graphql, compose } from "react-apollo";

import MyOrdersView from "../components/MyOrdersView";
// import MY_LISTINGS_QUERY from "../graphql/MyListingsQuery.graphql";
import PHOTO1 from "../resources/naruto2.jpg"
import PHOTO2 from "../resources/camera.jpg"
import { LENDED, BORROWED } from "../constants/OrderStates";

class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [
        {
          id: "BBIGRFDILFSDFBCGI342",
          name: "Canon EOS 70D DSLR Camera Bundle with Canon EF-S 18-55mm f/3.5- 5.6 IS ",
          image: PHOTO1,
          status: BORROWED,
          orderDate: "Sat, December 1st'18",
          details: "Ready to dispatch",
          orderTotal: 4000,
          seller: "Rajeev Khanna",
          stars: 4.0,
          userimg: PHOTO2,
          date: {
            start: "3rd Dec",
            end: "10th Dec"
          }
        },
        {
          id: "BBIGRFDILD9GGR4434",
          name: "Konica Revio Z3 Gold APS Camera w/ Remote Control",
          image: PHOTO2,
          status: BORROWED,
          orderDate: "Mon, December 3st'18",
          details: "Request approved",
          orderTotal: 7250,
          seller: "RPawan Kalyan",
          stars: 4.8,
          userimg: PHOTO1,
          date: {
            start: "21rd Dec",
            end: "30th Dec"
          }
        }
      ]
    };
  }
  render() {
    return <MyOrdersView listings={this.state.listings} />;
  }
}

export default // compose(
//   graphql(MY_LISTINGS_QUERY, {
//     props({ data: { loading, error, userListings } }) {
//       if (error) throw new Error(error);
//       return { loading, userListings };
//     }
//   })
// )(
MyOrders;
// );
