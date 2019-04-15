import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import CheckoutOrderView from '../components/CheckoutOrderView';

// interface PagesProps {
//   t: TranslateFunction;
// }

class CheckoutOrder extends React.Component {
  render() {
    return <CheckoutOrderView {...this.props} />;
  }
}

export default translate('order')(CheckoutOrder);
