import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Rate, Icon, Avatar } from 'antd';
import '../resources/listingCatalogue.css';

const { Meta } = Card;

class RelatedCard extends Component {
  render() {
    // To Do: check if it is not present then set as default value
    let listing = this.props.relatedList;
    const listing_img = listing.listingImages[0].imageUrl;
    const rent_per_day = listing.listingRental.perDay;
    const title = listing.gearCategory;
    const seller = 'Ravi Kishan(To Do)';
    const rating = 4;

    return (
      <Card hoverable cover={<img alt="" src={listing_img} />}>
        <Meta title={title.substring(0, 25)} description={<h5>&#8377;{rent_per_day} per day</h5>} />
        <Meta
          style={{ marginTop: '20px', padding: '0' }}
          avatar={<Avatar />}
          title={
            <h4
              style={{
                fontSize: '10px',
                lineHeight: '15px',
                margin: '5px 0'
              }}
            >
              {seller}
              <br />
              <Rate disabled defaultValue={rating} style={{ color: '#23b195', fontSize: '6px' }} />
              <div
                style={{
                  position: 'absolute',
                  right: '5px',
                  bottom: '40px',
                  float: 'right',
                  color: '#23b195',
                  fontSize: '12px'
                }}
              >
                <Icon type="car" theme="filled" style={{ marginRight: '10px' }} />
                <Icon type="safety-certificate" theme="filled" />
              </div>
            </h4>
          }
        />
      </Card>
    );
  }
}

RelatedCard.propTypes = {
  relatedList: PropTypes.object.isRequired
};

export default RelatedCard;
