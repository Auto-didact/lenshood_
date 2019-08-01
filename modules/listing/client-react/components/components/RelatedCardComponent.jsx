import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Card, Rate, Icon, Carousel, Avatar, Divider } from "antd";
import { ImgCamera } from "../../constants/DefaultImages";

// import '../resources/listingCatalogue.css';

const { Meta } = Card;

class RelatedCardComponent extends Component {
  constructor(props) {
    super(props);
    this.carousel = React.createRef();
  }
  render() {
    // To Do: check if it is not present then set as default value

    let listing = this.props.relatedListing;

    const listing_id = listing.id;
    const listing_img =
      listing.listingImages.length !== 0 && listing.listingImages
        ? listing.listingImages[0].imageUrl
        : ImgCamera[0].imageUrl;

    const rent_per_day = listing.listingRental.perDay || "Not Provided";
    const title = listing.gearCategory || "Not Provided";

    //To Do parse sellerName
    // const seller =
    //   (listing.user &&
    //     listing.user.profile &&
    //     listing.user.profile.firstName.concat(' ', listing.user.profile.lastName)) ||
    //   'Name Not Provided';
    const sellerFirstName =
      (listing.user &&
        listing.user.profile &&
        listing.user.profile.firstName) ||
      null;
    const sellerLastName =
      (listing.user && listing.user.profile && listing.user.profile.lastName) ||
      null;
    const sellerName = (f, l) => {
      if (f && l) {
        return `${f} ${l}`;
      } else if (!f || !l) {
        if (f) {
          return f;
        } else {
          return l;
        }
      } else {
        return "Name Not Provided";
      }
    };

    const seller = sellerName(sellerFirstName, sellerLastName);
    // const seller = "Not Provided";
    const sellerAvatar =
      (listing.user && listing.user.profile && listing.user.profile.avatar) ||
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    const rating =
      (listing.user && listing.user.profile && listing.user.profile.rating) ||
      null;

    const status = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,

      autoplaySpeed: 800
    };

    return (
      <Link className="listing-link" to={`/listing-detail/${listing_id}`}>
        <Card
          bodyStyle={{ margin: "0px" }}
          hoverable
          cover={
            <div
              style={{
                overflow: "hidden",

                height: "230px",

                borderRadius: "8px 8px 0px 0px"
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
            title={title.substring(0, 25)}
            description={
              <>
                <h4>&#8377;{rent_per_day} per day</h4>
                <Divider style={{ margin: "5px 0px" }} />
              </>
            }
          />

          <Meta
            className="RelCardMeta"
            avatar={<Avatar src={sellerAvatar} />}
            title={
              <h3 className="CatalogUserName">
                {seller}
                <br />
                {rating ? (
                  <Rate
                    disabled
                    defaultValue={Number(rating)}
                    className="CardRate"
                  />
                ) : (
                  <a>Not Reviewed</a>
                )}
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

RelatedCardComponent.propTypes = {
  relatedListing: PropTypes.object.isRequired
};

export default RelatedCardComponent;