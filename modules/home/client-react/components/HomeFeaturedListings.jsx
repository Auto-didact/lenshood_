import React from 'react';
import PropTypes from 'prop-types';
import FeaturedListings from '@gqlapp/listing-client-react/containers/FeaturedListings';

const HomeFeaturedListings = ({ t }) => {
  return (
    <div className="home-featured-listings-container layout-counter-margin">
      <img src={require('../images/home/wave.svg')} className="home-featured-listing-banner" />

      <div className="layout-padding">
        <FeaturedListings />
      </div>
    </div>
  );
};
HomeFeaturedListings.propTypes = {
  t: PropTypes.func
};

export default HomeFeaturedListings;
