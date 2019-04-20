import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { StripeSubscriptionProfile } from '@gqlapp/payments-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import { LayoutCenter, Card, CardGroup, CardTitle, CardText, AccountLayout } from '@gqlapp/look-client-react';

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
            <CardGroup>
              <CardTitle>{t('profile.card.group.name')}:</CardTitle>
              <CardText>{currentUser.username}</CardText>
            </CardGroup>
            <CardGroup>
              <CardTitle>{t('profile.card.group.email')}:</CardTitle>
              <CardText>{currentUser.email}</CardText>
            </CardGroup>
            <CardGroup>
              <CardTitle>{t('profile.card.group.role')}:</CardTitle>
              <CardText>{currentUser.role}</CardText>
            </CardGroup>
            {currentUser.profile && currentUser.profile.fullName && (
              <CardGroup>
                <CardTitle>{t('profile.card.group.full')}:</CardTitle>
                <CardText>{currentUser.profile.fullName}</CardText>
              </CardGroup>
            )}
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
