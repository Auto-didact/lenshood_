import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import TermsOfServiceView from '../components/TermsOfServiceView';

interface PagesProps {
  t: TranslateFunction;
}

class TermsOfService extends React.Component<PagesProps> {
  public render() {
    return <TermsOfServiceView {...this.props} />;
  }
}

export default translate('pages')(TermsOfService);
