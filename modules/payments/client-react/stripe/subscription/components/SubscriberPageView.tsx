import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import { LayoutCenter, Loader } from '@gqlapp/look-client-react';

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
    return <Loader text={t('loading')} />;
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
