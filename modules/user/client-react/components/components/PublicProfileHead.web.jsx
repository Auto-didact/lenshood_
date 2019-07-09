import React from 'react';
import PropTypes from 'prop-types';

import { Avatar, Icon } from 'antd';
import { ImgUser } from '../../constants/DefaultImages';

const PublicProfileHead = ({ profile, description, role, portfolios }) => {
  return (
    <div className="public-profilehead-container">
      <div className="public-profile-avatar">
        <Avatar size={150} src={profile && profile.avatar ? profile.avatar : ImgUser} />
      </div>

      <div className="public-profile-userInfo">
        <div>
          <h1 style={{ display: 'inline' }}>
            {profile && profile.firstName && profile.lastName
              ? profile.firstName + ' ' + profile.lastName
              : 'Not Provided'}
          </h1>

          <p style={{ display: 'inline' }}>({role ? role : 'Not Provided'})</p>
        </div>
        <div>
          <h3 style={{ display: 'inline' }}>
            <span className="StarRate">
              {profile && profile.rating ? profile.rating : 'Not Rated'}
              <Icon type="star" theme="filled" />
            </span>
          </h3>
        </div>
        <div>
          <h4>{profile && profile.about ? profile.about : 'Not Provided'}</h4>
        </div>
        <div>
          <h4 style={{ display: 'inline' }}>
            {description.acceptanceRate}:
            {profile && profile.acceptanceRate ? profile.acceptanceRate : 'Not Available   '},{'  '}
            {description.responseTime}:{profile.responseTime ? profile.responseTime : 'Not Available'}
          </h4>
        </div>
        <div>{profile && profile.website ? profile.website : ''}</div>
        <div>
          {portfolios && portfolios.length !== 0
            ? portfolios.map((portfolio, key) => (
                <div key={key}>
                  {portfolio.platform} : {portfolio.portfolioUrl}
                </div>
              ))
            : ''}
        </div>
      </div>
    </div>
  );
};
PublicProfileHead.propTypes = {
  profile: PropTypes.object,
  description: PropTypes.string,
  t: PropTypes.func,
  role: PropTypes.string,
  portfolios: PropTypes.object
};

export default PublicProfileHead;
