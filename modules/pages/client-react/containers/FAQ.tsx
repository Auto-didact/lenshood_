import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import FAQView from '../components/FAQView';

interface PagesProps {
  t: TranslateFunction;
}

class FAQ extends React.Component<PagesProps> {
  public render() {
    return <FAQView {...this.props} />;
  }
}

export default translate('pages')(FAQ);
