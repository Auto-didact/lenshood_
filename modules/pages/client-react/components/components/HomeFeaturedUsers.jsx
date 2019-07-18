import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Tabs } from 'antd';
import FeaturedUser from '../../containers/Featured/FeaturedUser';

const { TabPane } = Tabs;

const HomeFeaturedUsers = ({ t }) => {
  return (
    <div className="home-featured-users-container layout-counter-margin layout-padding">
      <FeaturedUser />
    </div>
  );
};
HomeFeaturedUsers.propTypes = {
  t: PropTypes.func
};

export default HomeFeaturedUsers;
