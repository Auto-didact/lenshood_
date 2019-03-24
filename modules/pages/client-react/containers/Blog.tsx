import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import BlogView from '../components/BlogView';

interface PagesProps {
  t: TranslateFunction;
}

class Blog extends React.Component<PagesProps> {
  public render() {
    return <BlogView {...this.props} />;
  }
}

export default translate('blog')(Blog);
