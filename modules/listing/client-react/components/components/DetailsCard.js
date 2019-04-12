import React, { Component } from 'react';
import '../resources/listingCatalogue.css';
import { Icon, Button, Row, Col } from 'antd';

class DetailsCard extends Component {
  render() {
    return (
      <Row
        style={{
          marginBottom: '30px',
          border: '1px solid #ddd',
          minWidth: '100%'
        }}
      >
        <Col span={10}>
          <div style={{ width: '100%' }}>
            <img
              style={{
                height: '160px',
                width: '100%',
                paddingRight: '20px'
              }}
              alt=""
              src={this.props.item.image}
            />
          </div>
        </Col>
        <Col span={14} style={{ paddingTop: '10px' }}>
          {this.props.item.nature === 'On Rent' ? (
            <h6
              style={{
                color: 'white',
                padding: '1px 5px',
                float: 'right',
                marginRight: '12px',
                background: '#e3c41c'
              }}
            >
              On Rent
            </h6>
          ) : (
            <h6
              style={{
                color: 'white',
                padding: '1px 5px',
                float: 'right',
                marginRight: '12px',
                background: '#e3951c'
              }}
            >
              On Shelf
            </h6>
          )}
          <h4>{this.props.item.name}</h4>
          <h5>
            <span
              style={{
                background: '#23b195',
                color: 'white',
                padding: '0px 6px 1px 7px'
              }}
            >
              {this.props.item.rating} <Icon type="star" theme="filled" />
            </span>
            <span style={{ color: '#23b195' }}> ({this.props.item.reviews})</span>
          </h5>
          <h5 style={{ marginBottom: '25px' }}>
            <strong>&#8377; {this.props.item.rent} per day</strong>
          </h5>
          <Button
            style={{
              background: '#23b195',
              color: 'white',
              width: '40%',
              margin: '0 2.5%'
            }}
          >
            <span>{this.props.buttonText} Listing</span>
          </Button>
          <Button
            style={{
              background: '#23b195',
              color: 'white',
              width: '40%',
              margin: '0 2.5%'
            }}
          >
            Remove Listing
          </Button>
        </Col>
      </Row>
    );
  }
}

export default DetailsCard;
