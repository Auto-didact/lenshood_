import React from 'react';

import { TranslateFunction } from '@gqlapp/i18n-client-react';
import StaticView from '../components/StaticView';

interface PagesProps {
  t: TranslateFunction;
  match: any;
}

class Static extends React.Component<PagesProps> {
  public render() {
    return <StaticView {...this.props} />;
  }
}

export default Static;
