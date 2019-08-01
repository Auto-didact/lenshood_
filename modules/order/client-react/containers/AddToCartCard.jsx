import React from 'react';
import { message } from 'antd';

import AddToCart from '../components/AddToCart';

class AddToCartCard extends React.Component {
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
    message.info('Success! Complete your Order.');

    // Redirect
    if (history) {
      return history.push('/checkout-cart/');
    }
    if (navigation) {
      return navigation.goBack();
    }
  }
  render() {
    return <AddToCart {...this.props} onSubmit={this.onSubmit} />;
  }
}

export default AddToCartCard;
