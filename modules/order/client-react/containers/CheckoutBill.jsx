import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import { message } from 'antd';
import CheckoutBillView from '../components/CheckoutBillView';

// interface PagesProps {
//   t: TranslateFunction;
// }

class CheckoutBill extends React.Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(values) {
    const { history, navigation } = this.props;

    // Get Values

    console.log('onSubmit Called!');
    // let userValues = pick(values, [
    //   'username',
    //   'email',
    //   'role',
    //   'isActive',
    //   'profile',
    //   'addresses',
    //   'portfolios',
    //   'password'
    // ]);

    // userValues = UserFormatter.trimExtraSpaces(userValues);

    // if (settings.auth.certificate.enabled) {
    //   userValues['auth'] = {
    //     certificate: pick(values.auth.certificate, 'serial')
    //   };
    // }

    // Call Mutation

    // try {
    //   await addUser(userValues);
    // } catch (e) {
    //   message.error(t('userAdd.errorMsg'));
    //   throw new FormError(t('userAdd.errorMsg'), e);
    // }

    // Add Message
    message.info('Success! Complete Payment.');

    // Redirect
    if (history) {
      return history.push('/checkout-pay/');
    }
    if (navigation) {
      return navigation.goBack();
    }
  }

  render() {
    return <CheckoutBillView onSubmit={this.onSubmit} {...this.props} />;
  }
}

export default translate('order')(CheckoutBill);
