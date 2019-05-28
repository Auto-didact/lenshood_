import React, { Component } from "react";
// import '../resources/listingCatalogue.css';
import { Layout, Button, Row, Col } from "antd";
import DetailsCard from "./DetailsCard";

const ButtonGroup = Button.Group;
const { Content } = Layout;

class MyListingProducts extends Component {
  state = {
    value: "On Rent"
  };
  classNamesgroup(e) {
    if (this.state.value === e) {
      return "btnActive";
    } else {
      return "btn";
    }
  }
  FilterItems(e) {
    this.setState({ value: e });
  }
  returnItem(item) {
    return <DetailsCard buttonText="View" item={item} />;
  }
  renderItem(item) {
    if (item.nature === this.state.value) {
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
                onClick={() => this.FilterItems("all")}
                className={this.classNamesgroup("all")}
              >
                All
              </Button>
              <Button
                onClick={() => this.FilterItems("On Shelf")}
                className={this.classNamesgroup("On Shelf")}
              >
                On Shelf
              </Button>
              <Button
                onClick={() => this.FilterItems("On Rent")}
                className={this.classNamesgroup("On Rent")}
              >
                On Rent
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        {this.props.products
          ? this.props.products.map(item =>
              this.state.value === "all"
                ? this.returnItem(item)
                : this.renderItem(item)
            )
          : null}
      </Content>
    );
  }
}

export default MyListingProducts;
