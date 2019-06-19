import React, { Component } from "react";
import { AccountLayout } from "@gqlapp/look-client-react";
import MyList from "./components/MyList";

class MyListingsView extends Component {
  state = {
    listings: this.props.listings
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
      <AccountLayout select="/my-listings">
        <MyList listings={this.state.listings} />
      </AccountLayout>
    );
  }
}

export default MyListingsView;
