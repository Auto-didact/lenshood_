import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import AboutUsView from '../components/AboutUsView';

interface PagesProps {
  t: TranslateFunction;
}

class AboutUs extends React.Component<PagesProps> {
  public render() {
    return <AboutUsView {...this.props} />;
  }
}

export default translate('pages')(AboutUs);
