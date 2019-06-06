import React, { Component } from "react";
// import '../resources/listingCatalogue.css';
import { Layout, Button, Row, Col } from "antd";
import OrderDetails from "./OrderDetails";
import { LENDED, BORROWED } from "../constants/OrderStates";

const { Content } = Layout;

class MyOrder extends Component {
  state = {
    status: BORROWED,
    listings: this.props.listings
  };
  classNamesgroup(e) {
    if (this.state.status === e) {
      return "btnOrderActive";
    } else {
      return "btnOrder";
    }
  }
  FilterItems(e) {
    this.setState({ status: e });
  }
  returnItem(item) {
    return <OrderDetails buttonText="View" item={item} />;
  }
  renderItem(item) {
    if (item.status === this.state.status) {
      return this.returnItem(item);
    }
  }
  render() {
    return (
      <Content className="myListContent">
        <Row>
          <Col md={{ span: 16 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            <h2 className="MyListHead">My Orders</h2>
            <br />
          </Col>
          <Col md={{ span: 8 }} sm={{ span: 14 }} xs={{ span: 24 }}>
            <Col span={12}>
              <Button
                onClick={() => this.FilterItems(LENDED)}
                className={this.classNamesgroup(LENDED)}
                block
              >
                Lended
              </Button>
            </Col>
            <Col span={12}>
              <Button
                onClick={() => this.FilterItems(BORROWED)}
                className={this.classNamesgroup(BORROWED)}
                block
              >
                Borrowed
              </Button>
            </Col>
          </Col>
        </Row>
        {this.state.listings
          ? this.state.listings.map(item => this.renderItem(item))
          : null}
      </Content>
    );
  }
}

export default MyOrder;
