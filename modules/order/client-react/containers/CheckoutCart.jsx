import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import CheckoutCartView from '../components/CheckoutCartView';

// interface PagesProps {
//   t: TranslateFunction;
// }

class CheckoutCart extends React.Component {
  render() {
    return <CheckoutCartView {...this.props} />;
  }
}

export default translate('order')(CheckoutCart);
