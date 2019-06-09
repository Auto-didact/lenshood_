import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import TrustAndSafetyView from '../components/TrustAndSafetyView';

interface PagesProps {
  t: TranslateFunction;
}

class TrustAndSafety extends React.Component<PagesProps> {
  public render() {
    return <TrustAndSafetyView {...this.props} />;
  }
}

export default translate('pages')(TrustAndSafety);
