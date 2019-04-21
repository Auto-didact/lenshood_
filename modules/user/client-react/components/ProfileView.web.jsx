import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { StripeSubscriptionProfile } from '@gqlapp/payments-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import { LayoutCenter, Card, CardGroup, CardTitle, CardText, AccountLayout } from '@gqlapp/look-client-react';
// To Do Abstract Out
import { Avatar, Rate } from 'antd';

import settings from '../../../../settings';

const renderMetaData = t => {
  return (
    <Helmet
      title={`${settings.app.name} - ${t('profile.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('profile.meta')}`
        }
      ]}
    />
  );
};

const ProfileView = ({ currentUserLoading, currentUser, t }) => {
  if (currentUserLoading && !currentUser) {
    return (
      <AccountLayout select="/profile">
        {renderMetaData(t)}
        <div className="text-center">{t('profile.loadMsg')}</div>
      </AccountLayout>
    );
  } else if (currentUser) {
    return (
      <AccountLayout select="/profile">
        {renderMetaData(t)}
        <LayoutCenter>
          <h1 className="text-center">{t('profile.card.title')}</h1>
          <Card>
            <Avatar
              src={
                currentUser.profile && currentUser.profile.image
                  ? currentUser.profile.image
                  : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              }
              size="large"
            />
            <br />
            <Rate
              disabled
              defaultValue={parseInt(
                currentUser.profile && currentUser.profile.rating ? currentUser.profile.rating : 0
              )}
            />

            {currentUser.profile && currentUser.profile.firstName && currentUser.profile.lastName && (
              <CardGroup>
                <CardTitle>{t('profile.card.group.full')}:</CardTitle>
                <CardText>
                  {currentUser.profile.firstName} {currentUser.profile.lastName}
                </CardText>
              </CardGroup>
            )}
            {currentUser.profile && currentUser.profile.responseTime && (
              <CardGroup>
                <CardTitle>{t('profile.card.group.responseTime')}:</CardTitle>
                <CardText>{currentUser.profile.responseTime}</CardText>
              </CardGroup>
            )}
            {currentUser.profile && currentUser.profile.acceptanceRate && (
              <CardGroup>
                <CardTitle>{t('profile.card.group.acceptanceRate')}:</CardTitle>
                <CardText>{currentUser.profile.acceptanceRate}</CardText>
              </CardGroup>
            )}
            {currentUser.profile && currentUser.profile.designation && (
              <CardGroup>
                <CardTitle>{t('profile.card.group.designation')}:</CardTitle>
                <CardText>{currentUser.profile.designation}</CardText>
              </CardGroup>
            )}
            {currentUser.profile && currentUser.profile.about && (
              <CardGroup>
                <CardTitle>{t('profile.card.group.about')}:</CardTitle>
                <CardText>{currentUser.profile.about}</CardText>
              </CardGroup>
            )}
            {currentUser.profile && currentUser.profile.website && (
              <CardGroup>
                <CardTitle>{t('profile.card.group.website')}:</CardTitle>
                <CardText>{currentUser.profile.website}</CardText>
              </CardGroup>
            )}

            <CardGroup>
              <CardTitle>{t('profile.card.group.name')}:</CardTitle>
              <CardText>{currentUser.username}</CardText>
            </CardGroup>
            <CardGroup>
              <CardTitle>{t('profile.card.group.email')}:</CardTitle>
              <CardText>{currentUser.email}</CardText>
            </CardGroup>

            {currentUser.profile && currentUser.profile.mobile && (
              <CardGroup>
                <CardTitle>{t('profile.card.group.mobile')}:</CardTitle>
                <CardText>{currentUser.profile.mobile}</CardText>
              </CardGroup>
            )}

            <CardGroup>
              <CardTitle>{t('profile.card.group.role')}:</CardTitle>
              <CardText>{currentUser.role}</CardText>
            </CardGroup>

            {/* Addresses */}

            {/* Portfolios */}

            {/* Verification & Identification */}

            {/* Endorsements & Endorsed */}

            {/* Followers & Following */}

            {/* Credit card info (Stripe subscription module)*/}
            {settings.stripe.subscription.enabled &&
              settings.stripe.subscription.publicKey &&
              currentUser.role === 'user' && <StripeSubscriptionProfile />}
          </Card>
          <Link className="mt-2 btn user-link" to={`/users/${currentUser.id}`}>
            {t('profile.editProfileText')}
          </Link>
        </LayoutCenter>
      </AccountLayout>
    );
  } else {
    return (
      <AccountLayout>
        {renderMetaData(t)}
        <h2>{t('profile.errorMsg')}</h2>
      </AccountLayout>
    );
  }
};

ProfileView.propTypes = {
  currentUserLoading: PropTypes.bool,
  currentUser: PropTypes.object,
  t: PropTypes.func
};

export default translate('user')(ProfileView);
