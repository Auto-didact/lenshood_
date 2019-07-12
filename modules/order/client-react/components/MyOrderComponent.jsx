import React, { Component } from "react";
import { Layout, Button, Row, Col, Modal } from "antd";
import OrderDetailsComponent from "./OrderDetailsComponent";
import { LENDED, BORROWED } from "../constants/OrderStates";
import OrderTrackCardComponent from "./OrderTrackCardComponent";

const ButtonGroup = Button.Group;
const { Content } = Layout;

class MyOrderComponent extends Component {
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
      <OrderDetailsComponent
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
        <Row className="marginV15">
          <Col md={{ span: 16 }} sm={{ span: 10 }} xs={{ span: 24 }}>
            <h2 className="MyListHead">My Orders</h2>
            <br />
          </Col>
          <Col md={{ span: 8 }} sm={{ span: 14 }} xs={{ span: 24 }}>
            <ButtonGroup className="width100">
              <Button
                onClick={() => this.FilterItems(LENDED)}
                className={this.classNamesgroup(LENDED)}
              >
                Lended
              </Button>
              <Button
                onClick={() => this.FilterItems(BORROWED)}
                className={this.classNamesgroup(BORROWED)}
              >
                Borrowed
              </Button>
            </ButtonGroup>
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
            <OrderTrackCardComponent
              status={this.state.trackList.track}
              completed={this.state.trackList.track.completed}
            />
          ) : null}
        </Modal>
      </Content>
    );
  }
}

export default MyOrderComponent;
