import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Tabs } from 'antd';
import FeaturedListing from '../containers/Featured/FeaturedListing';

const { TabPane } = Tabs;

const HomeFeaturedListings = ({ t }) => {
  return (
    <div className="home-featured-listings-container layout-counter-margin layout-padding">
      <FeaturedListing />
    </div>
  );
};
HomeFeaturedListings.propTypes = {
  t: PropTypes.func
};

export default HomeFeaturedListings;
