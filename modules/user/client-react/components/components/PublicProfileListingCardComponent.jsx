import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Card, Rate, Icon, Carousel, Avatar, Divider } from "antd";
import { ImgCamera } from "../../constants/DefaultImages";

// import '../resources/listingCatalogue.css';

const { Meta } = Card;

class PublicProfileListingCardComponent extends Component {
  render() {
    // To Do: check if it is not present then set as default value

    let listing = this.props.listing;

    const listing_id = listing.id || null;
    const listing_img =
      listing.listingImages.length !== 0 && listing.listingImages
        ? listing.listingImages[0].imageUrl
        : ImgCamera[0].imageUrl;

    const rent_per_day = listing.listingRental.perDay || null;

    const title_set =
      listing && listing.listingContent && listing.listingContent.length !== 0
        ? listing.listingContent
        : null;

    // const status = {
    //   dots: true,
    //   infinite: true,
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    //
    //   autoplaySpeed: 800
    // };

    return (
      <Link className="listing-link" to={`/listing-detail/${listing_id}`}>
        <Card
          style={{ height: "361px", margin: "5px" }}
          bodyStyle={{ margin: "0px" }}
          hoverable
          cover={
            <div
              style={{
                overflow: "hidden",

                height: "230px",

                borderRadius: "8px 8px 0px 0px",
                background: "#c3c3c3"
              }}
              align="center"
            >
              <img
                src={listing_img}
                style={{
                  height: "100%"
                }}
              />
            </div>
          }
        >
          <Meta
            title={title_set.map(title => `${title.gear} ${title.brand} `)}
            description={<h4>&#8377;{rent_per_day} per day</h4>}
          />
        </Card>
      </Link>
    );
  }
}

PublicProfileListingCardComponent.propTypes = {
  relatedList: PropTypes.object.isRequired
};

export default PublicProfileListingCardComponent;
