import React from 'react';
// import Helmet from 'react-helmet';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
// import settings from '../../../../settings';

interface LendingViewProps {
  t: TranslateFunction;
}

// const renderMetaData = (t: TranslateFunction) => (
//   <Helmet
//     title={`${settings.app.name} - ${t('title')}`}
//     meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
//   />
// );

const LendingView = ({ t }: LendingViewProps) => {
  return (
    <div className="text-center">
      <h1>Lending Page.</h1>
    </div>
  );
};

export default LendingView;
