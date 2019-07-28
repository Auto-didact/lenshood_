import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout, Loader, DataNotFound } from '@gqlapp/look-client-react';
import settings from '../../../../settings';
import { Button, Icon } from 'antd';
import { Link } from 'react-router-dom';

const ReferralVerifyView = props => {
  const { t, onSubmit, currentUser, user, loading } = props;
  console.log(props);
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('title')}`}
      meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
    />
  );

  return (
    <PageLayout>
      {renderMetaData()}
      <Link
        id="back-button"
        to="/referrals"
        style={{
          fontSize: '20px',
          margin: '10px',
          textDecoration: 'underline'
        }}
      >
        <Icon type="arrow-left" /> Back
      </Link>
      {loading && !user && <Loader text={'Loading...'} />}
      {user && user.profile && currentUser ? (
        user.profile.referredBy && currentUser.id === user.profile.referredBy.id ? (
          !user.profile.isVerified ? (
            <Button type="primary" onClick={() => onSubmit()}>
              Verify User
            </Button>
          ) : (
            <Button disabled type="primary">
              Verified
            </Button>
          )
        ) : (
          <DataNotFound
            description={
              <span>
                <h3>The user wasn't referred by You.</h3>
                <h4>Please go back!</h4>
              </span>
            }
          />
        )
      ) : (
        !loading && <DataNotFound description={<h3>User not found!</h3>} />
      )}
    </PageLayout>
  );
};

ReferralVerifyView.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  currentUser: PropTypes.object,
  onSubmit: PropTypes.func,
  t: PropTypes.func
};

export default translate('referral')(ReferralVerifyView);
