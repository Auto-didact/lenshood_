import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Button, Carousel, Divider, Col, Row } from 'antd';
import { Link } from 'react-router-dom';

const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16
};

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
      color: 'rgba(0,0,0,0.65)'
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)'
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

export default class ListingDrawerComponent extends Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const listing = this.props.listing;
    return (
      <div>
        <a onClick={this.showDrawer}>View Listing</a>
        <Drawer width={640} placement="right" closable={false} onClose={this.onClose} visible={this.state.visible}>
          <p style={{ ...pStyle, marginBottom: 24 }}>
            Listing Id: {listing.id}
            <Link className="listing-link" to={`/listing/${listing.id}`}>
              <Button color="primary" size="sm">
                Edit
              </Button>
            </Link>
          </p>
          <p style={pStyle}>Status: {listing.status}</p>
          <p style={pStyle}>Visible: {listing.isActive}</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Category" content={listing.gearCategory} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Subcategory" content={listing.gearSubcategory} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Carousel>
                {listing.listingImages.map(image => (
                  <div key={image.id}>
                    <img src={image.imageUrl} alt={image.id} />
                  </div>
                ))}
              </Carousel>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <DescriptionItem title="Created At" content={listing.createdAt} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Updated At" content={listing.updatedAt} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Per Day"
                content={listing.listingRental ? listing.listingRental.perDay : 'Not Given'}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Per Day"
                content={listing.listingRental ? listing.listingRental.perWeek : 'Not Given'}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Per Month"
                content={listing.listingRental ? listing.listingRental.perMonth : 'Not Given'}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Replacement Value"
                content={listing.listingRental ? listing.listingRental.replacementValue : 'Not Given'}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem title="Description" content={listing.description} />
            </Col>
          </Row>
          <Divider />
          <p style={pStyle}>Contents</p>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Gear"
                content={listing.listingContent ? listing.listingContent.gear : 'Not Given'}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Brand"
                content={listing.listingContent ? listing.listingContent.brand : 'Not Given'}
              />
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Model"
                content={listing.listingContent ? listing.listingContent.model : 'Not Given'}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Serial"
                content={listing.listingContent ? listing.listingContent.serial : 'Not Given'}
              />
            </Col>
          </Row>
          {/* <Row>
            <Col span={12}>
              <DescriptionItem title="Department" content="AFX" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Skills"
                content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
              />
            </Col>
          </Row> */}
          <Divider />
          <p style={pStyle}>Details</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Age" content={listing.listingDetail ? listing.listingDetail.age : 'Not Given'} />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Condition"
                content={listing.listingDetail ? listing.listingDetail.condition : 'Not Given'}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Repair History"
                content={listing.listingDetail ? listing.listingDetail.repairHistory : 'Not Given'}
              />
              <Carousel>
                {listing.listingDetail
                  ? listing.listingDetail.damages.map(image => (
                      <div key={image.id}>
                        <img src={image.imageUrl} alt={image.id} />
                      </div>
                    ))
                  : ''}
              </Carousel>
            </Col>
          </Row>
        </Drawer>
      </div>
    );
  }
}

ListingDrawerComponent.propTypes = {
  listing: PropTypes.object.isRequired
};

DescriptionItem.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};
