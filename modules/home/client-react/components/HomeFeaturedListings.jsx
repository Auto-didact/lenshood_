import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Tabs } from "antd";
import FeaturedListings from "@gqlapp/listing-client-react/containers/FeaturedListings";

const { TabPane } = Tabs;

const HomeFeaturedListings = ({ t }) => {
  return (
    <div className="home-featured-listings-container layout-counter-margin">
      <div className="home-featured-listing-banner">
        <img src={require("../images/home/wave.svg")} style={{width:"100vw"}} />
      </div>

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
