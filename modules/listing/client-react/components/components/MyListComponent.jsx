import React, { Component } from "react";
// import '../resources/listingCatalogue.css';
import { Layout, Button, Row, Col, Empty } from "antd";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import DetailsCardComponent from "./DetailsCardComponent";
import { ALL, ONSHELF, IDLE } from "../../constants/ListingStates";

const ButtonGroup = Button.Group;
const { Content } = Layout;

class MyListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ALL,
      noListingsStatus: props.userListings.length !== 0 ? false : true
    };
  }
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

  returnItem(item, key) {
    return (
      <DetailsCardComponent
        buttonText="View"
        item={item}
        key={key}
        toggle={this.props.toggle}
        DeleteListing={this.props.DeleteListing}
      />
    );
  }

  listingParser() {
    var parsedListings = [];
    this.props.userListings.map((item, key) => {
      this.state.status === ALL
        ? parsedListings.push(item)
        : item.status === this.state.status && parsedListings.push(item);
    });

    return parsedListings;
  }
  renderNoListings() {
    return (
      <Empty
        description={
          <span>
            {this.state.noListingsStatus
              ? "No Listings To Show"
              : `No listings on ${this.state.status}`}
          </span>
        }
      >
        {this.state.noListingsStatus ? (
          <Button type="primary" style={{ width: "200px" }}>
            <Link to="/listing/new">Create One Now</Link>
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={() => this.FilterItems(ALL)}
            style={{ width: "200px" }}
          >
            {`Move Some to ${this.state.status === ONSHELF ? "Shelf" : "Idle"}`}
          </Button>
        )}
      </Empty>
    );
  }

  render() {
    return (
      <Content className="myListContent">
        <Row className="marginV15">
          <Col md={{ span: 14 }} sm={{ span: 9 }} xs={{ span: 24 }}>
            <h2 className="MyListHead">My Listings</h2>
            <br />
          </Col>
          <Col md={{ span: 10 }} sm={{ span: 15 }} xs={{ span: 24 }}>
            <ButtonGroup className="width100">
              <Button
                onClick={() => this.FilterItems(ALL)}
                className={this.classNamesgroup(ALL)}
              >
                {`${ALL} (${
                  this.props.userListings ? this.props.userListings.length : 0
                })`}
              </Button>
              <Button
                onClick={() => this.FilterItems(ONSHELF)}
                className={this.classNamesgroup(ONSHELF)}
              >
                {`${ONSHELF} (${
                  this.props.userListings
                    ? this.props.userListings.filter(
                        item => item.status === ONSHELF
                      ).length
                    : 0
                })`}
              </Button>
              <Button
                onClick={() => this.FilterItems(IDLE)}
                className={this.classNamesgroup(IDLE)}
              >
                {`${IDLE} (${
                  this.props.userListings
                    ? this.props.userListings.filter(
                        item => item.status === IDLE
                      ).length
                    : 0
                })`}
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        {this.props.userListings && this.props.userListings.length !== 0
          ? this.listingParser().length !== 0
            ? this.listingParser().map((item, key) =>
                this.returnItem(item, key)
              )
            : this.renderNoListings()
          : this.renderNoListings()}
      </Content>
    );
  }
}
MyListComponent.propTypes = {
  userListings: PropTypes.array
};

export default MyListComponent;
