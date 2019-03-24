import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import LendingView from '../components/LendingView';

interface PagesProps {
  t: TranslateFunction;
}

class Lending extends React.Component<PagesProps> {
  public render() {
    return <LendingView {...this.props} />;
  }
}

export default translate('lending')(Lending);
