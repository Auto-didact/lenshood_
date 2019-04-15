import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import CheckoutPayView from '../components/CheckoutPayView';

// interface PagesProps {
//   t: TranslateFunction;
// }

class CheckoutPay extends React.Component {
  render() {
    return <CheckoutPayView {...this.props} />;
  }
}

export default translate('order')(CheckoutPay);
