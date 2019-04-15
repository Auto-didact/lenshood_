import React from 'react';

import ClientModule from '@gqlapp/module-client-react';

import { Route } from 'react-router-dom';
import CheckoutCart from './containers/CheckoutCart';
import CheckoutBill from './containers/CheckoutBill';
import CheckoutPay from './containers/CheckoutPay';
import CheckoutOrder from './containers/CheckoutOrder';
import resources from './locales';

export default new ClientModule({
  route: [
    <Route path="/checkout-cart" exact component={CheckoutCart} />,
    <Route path="/checkout-bill" exact component={CheckoutBill} />,
    <Route path="/checkout-pay" exact component={CheckoutPay} />,
    <Route path="/checkout-order" exact component={CheckoutOrder} />
  ],
  localization: [{ ns: 'order', resources }]
});
