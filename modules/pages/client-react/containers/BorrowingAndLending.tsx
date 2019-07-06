import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import BorrowingAndLendingView from '../components/BorrowingAndLendingView';

interface PagesProps {
  t: TranslateFunction;
}

class BorrowingAndLending extends React.Component<PagesProps> {
  public render() {
    return <BorrowingAndLendingView {...this.props} />;
  }
}

export default translate('pages')(BorrowingAndLending);
