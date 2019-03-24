import React from 'react';
import Helmet from 'react-helmet';
import { PageLayout } from '@gqlapp/look-client-react';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '../../../../settings';

interface AboutUsViewProps {
  t: TranslateFunction;
}

const renderMetaData = (t: TranslateFunction) => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const AboutUsView = ({ t }: AboutUsViewProps) => {
  return (
    <PageLayout>
      {renderMetaData(t)}
      <div className="text-center">
        <h1>About Us Page.</h1>
      </div>
    </PageLayout>
  );
};

export default AboutUsView;
