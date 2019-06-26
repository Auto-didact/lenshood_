import React, { Fragment } from 'react';
import { Spin } from 'antd';
import CreditCardInfo from '../containers/CreditCardInfo';
import CancelSubscription from '../containers/CancelSubscription';
import { CardGroup, CardText, CardTitle } from '@gqlapp/look-client-react';
import { TranslateFunction } from '@gqlapp/i18n-client-react';

interface SubscriptionProfileViewProps {
  loading: boolean;
  stripeSubscription: {
    active: boolean;
  };
  t: TranslateFunction;
}

export default ({ t, loading, stripeSubscription }: SubscriptionProfileViewProps) => {
  if (loading) {
    return (
      <div className="loader">
        <Spin size="large" />
        <br />
        {t('loading')}
      </div>
    );
  }

  return (
    <div style={{ border: '1px solid black' }}>
      <CardGroup>
        <CardTitle>{t('subscriptionProfile.title')}</CardTitle>
      </CardGroup>
      {stripeSubscription && !stripeSubscription.active ? (
        <CardGroup>
          <CardText>{t('subscriptionProfile.noSubscription')}</CardText>
        </CardGroup>
      ) : (
        <Fragment>
          <CreditCardInfo />
          <CancelSubscription />
        </Fragment>
      )}
    </div>
  );
};
