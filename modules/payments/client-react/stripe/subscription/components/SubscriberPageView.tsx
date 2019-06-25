import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { Spin } from 'antd';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import { LayoutCenter } from '@gqlapp/look-client-react';

import settings from '../../../../../../settings';

interface SubscribersOnlyViewProps {
  loading: boolean;
  subscriberNumber: {
    number: number;
  };
  t: TranslateFunction;
}

export default ({ loading, subscriberNumber, t }: SubscribersOnlyViewProps) => {
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
    <Fragment>
      <Helmet title={`${settings.app.name} - ${t('subscriberPage.title')}`} />
      <LayoutCenter>
        <h1 className="text-center">{t('subscriberPage.title')}</h1>
      </LayoutCenter>
      <p>
        {t('subscriberPage.msg')} {subscriberNumber.number}.
      </p>
    </Fragment>
  );
};
