import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Tabs } from 'antd';
import FeaturedUsers from '@gqlapp/user-client-react/containers/FeaturedUsers';

const { TabPane } = Tabs;

const HomeFeaturedUsers = ({ t }) => {
  return (
    <div className="home-featured-users-container layout-counter-margin layout-padding">
      <FeaturedUsers />
    </div>
  );
};
HomeFeaturedUsers.propTypes = {
  t: PropTypes.func
};

export default HomeFeaturedUsers;
