import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Rate, Icon, Avatar } from 'antd';
// import '../resources/listingCatalogue.css';

const { Meta } = Card;

class RelatedCard extends Component {
  render() {
    // To Do: check if it is not present then set as default value
    let listing = this.props.relatedList;
    const listing_id = listing.id;
    const listing_img = listing.listingImages[0].imageUrl;
    const rent_per_day = listing.listingRental.perDay;
    const title = listing.gearCategory;
    const seller = 'Ravi Kishan(To Do)';
    const rating = 4;

    return (
      <Link className="listing-link" to={`/listing-detail/${listing_id}`}>
        <Card hoverable cover={<img alt="" src={listing_img} className="relatedCardImg" />} className="relatedCard">
          <Meta title={title.substring(0, 25)} description={<h4>&#8377;{rent_per_day} per day</h4>} />
          <Meta
            className="RelCardMeta"
            avatar={<Avatar />}
            title={
              <h3 className="RelCardh">
                {seller}
                <br />
                <Rate disabled defaultValue={rating} className="CardRate" />
                {/* <div className="RelIconGroup">
                  <Icon type="car" theme="filled" className="marginR10" />
                  <Icon type="safety-certificate" theme="filled" />
                </div> */}
              </h3>
            }
          />
        </Card>
      </Link>
    );
  }
}

RelatedCard.propTypes = {
  relatedList: PropTypes.object.isRequired
};

export default RelatedCard;
