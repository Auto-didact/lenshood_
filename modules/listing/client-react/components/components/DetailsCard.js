import React, { Component } from 'react';
// import '../resources/listingCatalogue.css';
import { Icon, Button, Row, Col } from 'antd';

class DetailsCard extends Component {
  render() {
    return (
      <Row
        className="DetailsRow"
      >
        <Col span={10}>
          <div className="width100">
            <img
              className="DetailsWidth"
              alt=""
              src={this.props.item.image}
            />
          </div>
        </Col>
        <Col span={14} className="PadT10" >
          {this.props.item.nature === 'On Rent' ? (
            <h6
            className="OnRentTag"
            >
              On Rent
            </h6>
          ) : (
            <h6
              className="OnShelfTag"
            >
              On Shelf
            </h6>
          )}
          <h4>{this.props.item.name}</h4>
          <h5>
            <span
              className="StarRate"
            >
              {this.props.item.rating} <Icon type="star" theme="filled" />
            </span>
            <span className="mainColor"> ({this.props.item.reviews})</span>
          </h5>
          <h5 className="marginB25">
            <strong>&#8377; {this.props.item.rent} per day</strong>
          </h5>
          <Button
           className="ListingButtons"
          >
            <span>{this.props.buttonText} Listing</span>
          </Button>
          <Button
           className="ListingButtons"
          >
            Remove Listing
          </Button>
        </Col>
      </Row>
    );
  }
}

export default DetailsCard;
