import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Carousel, Card } from 'antd';
// import '../resources/listingCatalogue.css';

class ProductCard extends Component {
  render() {
    const listing = this.props.listing;
    const images = listing.listingImages;
    const replacementValue = listing.listingRental.replacementValue;
    const description = listing.description;
    const packageContents = listing.listingContent;
    return (
      <Card style={{ textAlign: 'justify' }}>
        <Carousel>
          {images.map(item => (
            <div>
              <img src={item.imageUrl} alt="" style={{ width: '100%' }} />
            </div>
          ))}
        </Carousel>
        <Row>
          <Col span={12}>
            <strong style={{ fontSize: '12px', display: 'block' }}>Replacement Value</strong>
            <span style={{ fontSize: '14px', display: 'block' }}> &#8377; {replacementValue} /- </span>
          </Col>
          <Col span={12}>
            <Link to="" style={{ float: 'right', color: '#23b195', fontSize: '14px' }}>
              COMPARE PRODUCT(To do)
            </Link>
          </Col>
        </Row>
        <br />
        {/* <h3 style={{ fontSize: '16px', fontWeight: 'bold', display: 'block' }}>Specifications</h3>
        <ul>
          {listing.Specification.map(item => (
            <li style={{ fontSize: '14px' }}>{item}</li>
          ))}
        </ul> */}
        <hr style={{ border: 'solid 0.5px #979797' }} />
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', display: 'block' }}>Description</h3>
        <p style={{ fontSize: '14px' }}>{description}</p>
        <br />
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', display: 'block' }}>In the package</h3>
        {packageContents.map(item => (
          <div style={{ width: '50%', display: 'inline-block', fontSize: '14px' }}>
            <span
              style={{
                backgroundColor: '#23b195',
                padding: '0 7px',
                margin: '0 4% 0 8%'
              }}
            />
            {item.gear}
          </div>
        ))}
        <br />
        <br />
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', display: 'block' }}>Cancellation Policy</h3>
        <p style={{ fontSize: '14px' }}>{listing.cancellationPolicy}</p>
        <br />
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', display: 'block' }}>Damage Policy</h3>
        <p style={{ fontSize: '14px' }}>{listing.damagePolicy}</p>
      </Card>
    );
  }
}

export default ProductCard;
