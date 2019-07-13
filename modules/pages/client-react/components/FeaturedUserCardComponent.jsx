import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card, Rate, Icon, Carousel, Avatar, Divider } from 'antd';
import { ImgCamera } from '../images/download.png';

// import '../resources/listingCatalogue.css';

const { Meta } = Card;

class FeaturedUserCardComponent extends Component {
  constructor(props) {
    console.log('constructor called');
    super(props);
    // this.carousel = React.createRef();
  }
  render() {
    // To Do: check if it is not present then set as default value

    // let listing = this.props.relatedListing;
    let user = this.props.relatedUser;
    console.log('user', user);
    // const listing_id = listing.id;
    // const user_id = user.id;

    // const listing_img =
    //   listing.listingImages.length !== 0 && listing.listingImages
    //     ? listing.listingImages[0].imageUrl
    //     : ImgCamera[0].imageUrl;

    //this need changes-->>
    const user_img = user.avatar ? user.avatar : null;

    // const rent_per_day = listing.listingRental.perDay || 'Not Provided';
    // const title = listing.gearCategory || 'Not Provided';

    // //To Do parse sellerName
    // // const seller =
    // //   (listing.user &&
    // //     listing.user.profile &&
    // //     listing.user.profile.firstName.concat(' ', listing.user.profile.lastName)) ||
    // //   'Name Not Provided';
    // const sellerFirstName = (listing.user && listing.user.profile && listing.user.profile.firstName) || null;
    // const sellerLastName = (listing.user && listing.user.profile && listing.user.profile.lastName) || null;
    // const sellerName = (f, l) => {
    //   if (f && l) {
    //     return `${f} ${l}`;
    //   } else if (!f || !l) {
    //     if (f) {
    //       return f;
    //     } else {
    //       return l;
    //     }
    //   } else {
    //     return 'Name Not Provided';
    //   }
    // };

    // const seller = sellerName(sellerFirstName, sellerLastName);
    // // const seller = "Not Provided";
    // const sellerAvatar =
    //   (listing.user && listing.user.profile && listing.user.profile.avatar) ||
    //   'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
    // const rating = (listing.user && listing.user.profile && listing.user.profile.rating) || null;

    // const status = {
    //   dots: true,
    //   infinite: true,
    //   slidesToShow: 1,
    //   slidesToScroll: 1,

    //   autoplaySpeed: 800
    // };

    return (
      <Link
        className="listing-link"
        to="#"
        // to={`/listing-detail/${user_id}`}
      >
        <Card
          bodyStyle={{ margin: '0px' }}
          hoverable
          cover={
            <div
              style={{
                overflow: 'hidden',
                height: '230px',
                borderRadius: '8px 8px 0px 0px',
                background: '#c3c3c3'
              }}
              align="center"
            >
              <img
                src={ImgCamera}
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  margin: '20px'
                  // object-fit: 'cover',
                  // object-position: 'center right'
                }}
              />
            </div>
          }
        >
          <h1>bleh</h1>
          {/* <Meta title={title.substring(0, 25)} description={<h4>&#8377;{rent_per_day} per day</h4>} />

          <Meta
            className="RelCardMeta"
            avatar={<Avatar src={sellerAvatar} />}
            title={
              <h3 className="CatalogUserName">
                {seller}
                <br />
                {rating ? <Rate disabled defaultValue={Number(rating)} className="CardRate" /> : <a>Not Reviewed</a>}
                // <div className="RelIconGroup">
                //   <Icon type="car" theme="filled" className="marginR10" />
                //   <Icon type="safety-certificate" theme="filled" />
                // </div>
              </h3>
            }
          /> */}
        </Card>
      </Link>
    );
  }
}

FeaturedUserCardComponent.propTypes = {
  relatedListing: PropTypes.object.isRequired
};

export default FeaturedUserCardComponent;
