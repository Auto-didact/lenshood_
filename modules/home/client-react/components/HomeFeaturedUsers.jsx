import React from 'react';
import PropTypes from 'prop-types';
import FeaturedUsers from '@gqlapp/user-client-react/containers/FeaturedUsers';

const HomeFeaturedUsers = ({ t }) => {
  return (
    <div className="home-featured-users-container layout-counter-margin ">
      <div className="home-semi-circle layout-padding">
        <FeaturedUsers />
      </div>
    </div>
  );
};
HomeFeaturedUsers.propTypes = {
  t: PropTypes.func
};

export default HomeFeaturedUsers;