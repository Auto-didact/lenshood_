import React, { Component } from "react";
import { Layout, Row, Col, Breadcrumb } from "antd";
import { AccountLayout } from "@gqlapp/look-client-react";
// import './resources/listingCatalogue.css';
import MyList from "./components/MyList";
import AccDetailsMenu from "./components/AccDetailsMenu";

class MyListingsView extends Component {
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
        <MyList {...this.props} />
      </AccountLayout>
    );
  }
}

export default MyListingsView;
