import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import CheckoutBillView from '../components/CheckoutBillView';

// interface PagesProps {
//   t: TranslateFunction;
// }

class CheckoutBill extends React.Component {
  render() {
    return <CheckoutBillView {...this.props} />;
  }
}

export default translate('order')(CheckoutBill);
