import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import PrivacyRulesView from '../components/PrivacyRulesView';

interface PagesProps {
  t: TranslateFunction;
}

class PrivacyRules extends React.Component<PagesProps> {
  public render() {
    return <PrivacyRulesView {...this.props} />;
  }
}

export default translate('privacy-rules')(PrivacyRules);
