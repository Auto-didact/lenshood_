import React from 'react';
import Helmet from 'react-helmet';
import { PageLayout } from '@gqlapp/look-client-react';

import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '../../../../settings';
import HomeHead from './components/HomeHead';
import ListingCatalogue from '@gqlapp/listing-client-react/containers/ListingCatalogue';

interface HomeViewProps {
  t: TranslateFunction;
}

const renderMetaData = (t: TranslateFunction) => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const HomeView = ({ t }: HomeViewProps) => {
  const img1 =
    'https://images.unsplash.com/photo-1495374412936-30689e318a1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80';
  return (
    <PageLayout>
      {renderMetaData(t)}
      <HomeHead t={t} image={img1}/>
      <ListingCatalogue/>
    </PageLayout>
  );
};

export default HomeView;
