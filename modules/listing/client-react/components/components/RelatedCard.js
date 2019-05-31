import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Card, Rate, Icon, Avatar } from "antd";
// import '../resources/listingCatalogue.css';

const { Meta } = Card;

class RelatedCard extends Component {
  render() {
    // To Do: check if it is not present then set as default value

    let listing = this.props.relatedList;

    const listing_id = listing.id;
    const listing_img =
      (listing.listingImages.length !== 0 &&
        listing.listingImages[0].imageUrl) ||
      "https://cdn.pixabay.com/photo/2013/11/28/10/02/photo-camera-219958_960_720.jpg";

    const rent_per_day = listing.listingRental.perDay || "Not Provided";
    const title = listing.gearCategory || "Not Provided";
    const seller =
      (listing.user.profile &&
        listing.user.profile.firstName.concat(
          " ",
          listing.user.profile.lastName
        )) ||
      "Name Not Provided";
    const sellerAvatar =
      (listing.user.profile && listing.user.profile.avatar) ||
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    const rating = listing.user.rating || null;
    const Rating = r => {
      if (r) {
        return <Rate disabled defaultValue={r} className="CardRate" />;
      } else {
        return "No Reviews";
      }
    };

    return (
      <Link className="listing-link" to={`/listing-detail/${listing_id}`}>
        <Card
          style={{ margin: "5px", boxShadow: "3px 3px 5px  #94ead9" }}
          hoverable
          cover={<img alt="" src={listing_img} className="relatedCardImg" />}
          className="relatedCard"
        >
          <Meta
            title={title.substring(0, 25)}
            description={<h4>&#8377;{rent_per_day} per day</h4>}
          />
          <Meta
            className="RelCardMeta"
            avatar={<Avatar src={sellerAvatar} />}
            title={
              <h3 className="RelCardh">
                {seller}
                <br />
                {Rating(rating)}
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
