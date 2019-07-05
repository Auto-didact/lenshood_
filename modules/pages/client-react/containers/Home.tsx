import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import HomeView from '../components/HomeView';

interface PagesProps {
  t: TranslateFunction;
}

class Home extends React.Component<PagesProps> {
  public render() {
    return <HomeView {...this.props} />;
  }
}

export default translate('pages')(Home);
