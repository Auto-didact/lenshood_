import React, { Component } from "react";
// import '../resources/listingCatalogue.css';
import { Icon, Button, Row, Col } from "antd";

class DetailsCard extends Component {
  render() {
    return (
      <div style={{ boxShadow: "3px 3px 5px  #94ead9" }}>
        <Row
          className="DetailsRow"
          type="flex"
          justify="space-around"
          align="middle"
        >
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <div className="width100">
              <img
                style={{ width: "100%" }}
                alt=""
                src={this.props.item.image}
              />
            </div>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} className="PadT10">
            <div style={{ padding: "10px 0px 10px 15px" }}>
              {this.props.item.status === "On Rent" ? (
                <h6 className="OnRentTag">On Rent</h6>
              ) : (
                <h6 className="OnShelfTag">On Shelf</h6>
              )}
              <h4>{this.props.item.description}</h4>
              {/*<h5>
                <span className="StarRate">
                  {this.props.item.rating} <Icon type="star" theme="filled" />
                </span>
                <span className="mainColor"> ({this.props.item.reviews})</span>
              </h5>*/}
              <h5 className="marginB25">
                <strong>
                  &#8377; {this.props.item.listingRental.perDay} per day
                </strong>
              </h5>

              <Button className="ListingButtons">
                <span>{this.props.buttonText} Listing</span>
              </Button>
              <Button className="ListingButtons">
                <Icon type="delete" />
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DetailsCard;
