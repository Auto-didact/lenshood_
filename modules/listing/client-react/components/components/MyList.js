import React, { Component } from "react";
import { Layout, Button, Row, Col } from "antd";
import DetailsCard from "./DetailsCard";
import { ALL, ONSHELF, ONRENT } from "../../constants/ListingStates";

import { Link } from "react-router-dom";

const ButtonGroup = Button.Group;
const { Content } = Layout;

class MyListingProducts extends Component {
  state = {
    status: ALL,
    listings: this.props.listings
  };
  classNamesgroup(e) {
    if (this.state.status === e) {
      return "btnActive";
    } else {
      return "btn";
    }
  }
  FilterItems(e) {
    this.setState({ status: e });
  }
  returnItem(item) {
    return (
      <Link className="listing-link" to={`/my-listings/${item.id}`}>
        <DetailsCard buttonText="View" item={item} />
      </Link>
    );
  }
  renderItem(item) {
    if (item.status === this.state.status) {
      return this.returnItem(item);
    }
  }
  render() {
    return (
      <Content className="myListContent">
        <Row className="margin15">
          <Col md={{ span: 14 }} sm={{ span: 24 }} xs={{ span: 24 }}>
            <h2 className="MyListHead">My Listings</h2>
            <br />
          </Col>
          <Col md={{ span: 10 }} sm={{ span: 24 }} xs={{ span: 24 }}>
            <ButtonGroup className="width100">
              <Button
                onClick={() => this.FilterItems(ALL)}
                className={this.classNamesgroup(ALL)}
              >
                All
              </Button>
              <Button
                onClick={() => this.FilterItems(ONSHELF)}
                className={this.classNamesgroup(ONSHELF)}
              >
                On Shelf
              </Button>
              <Button
                onClick={() => this.FilterItems(ONRENT)}
                className={this.classNamesgroup(ONRENT)}
              >
                On Rent
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        {this.state.listings
          ? this.state.listings.map(item =>
              this.state.status === ALL
                ? this.returnItem(item)
                : this.renderItem(item)
            )
          : null}
      </Content>
    );
  }
}

export default MyListingProducts;
