import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import RentingView from '../components/RentingView';

interface PagesProps {
  t: TranslateFunction;
}

class Renting extends React.Component<PagesProps> {
  public render() {
    return <RentingView {...this.props} />;
  }
}

export default translate('pages')(Renting);
