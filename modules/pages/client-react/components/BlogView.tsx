import React, { useEffect } from 'react';
// import Helmet from 'react-helmet';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
// import settings from '../../../../settings';

interface BlogViewProps {
  t: TranslateFunction;
}

// const renderMetaData = (t: TranslateFunction) => (
//   <Helmet
//     title={`${settings.app.name} - ${t('title')}`}
//     meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
//   />
// );

const BlogView = ({ t }: BlogViewProps) => {
  useEffect(() => {
    global.window.scrollTo(0, 0);
  });
  return (
    <div className="text-center">
      <h1>Blog Page.</h1>
    </div>
  );
};

export default BlogView;
