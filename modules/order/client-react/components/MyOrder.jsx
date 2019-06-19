import React, { Component } from "react";
import { Layout, Button, Row, Col, Modal } from "antd";
import OrderDetails from "./OrderDetails";
import { LENDED, BORROWED } from "../constants/OrderStates";
import OrderTrackCard from "./OrderTrackCard";

const { Content } = Layout;

class MyOrder extends Component {
  state = {
    trackList: null,
    status: BORROWED,
    listings: this.props.listings,
    modalVisible: false
  };
  setTrackList(id) {
    var i;
    for (i = 0; i < this.state.listings.length; i++) {
      if (id === this.state.listings[i].id) {
        this.state.trackList = this.state.listings[i];
        break;
      }
    }
    console.log(this.state.trackList);
    this.setModal1Visible(true);
  }
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
    return (
      <OrderDetails
        buttonText="View"
        item={item}
        setTrackList={this.setTrackList.bind(this)}
      />
    );
  }
  renderItem(item) {
    if (item.status === this.state.status) {
      return this.returnItem(item);
    }
  }
  setModal1Visible(val) {
    this.setState({ modalVisible: val });
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
        <Modal
          centered
          visible={this.state.modalVisible}
          footer={null}
          bodyStyle={{ padding: "0" }}
          onCancel={() => this.setModal1Visible(false)}
        >
          {console.log(this.state.trackList)}
          {this.state.trackList != null ? (
            <OrderTrackCard
              status={this.state.trackList.track}
              completed={this.state.trackList.track.completed}
            />
          ) : null}
        </Modal>
      </Content>
    );
  }
}

export default MyOrder;
