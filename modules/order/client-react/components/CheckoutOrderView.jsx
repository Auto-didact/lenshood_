import React from 'react';
import Helmet from 'react-helmet';
import { PageLayout } from '@gqlapp/look-client-react';
// import { TranslateFunction } from "@gqlapp/i18n-client-react";
import settings from '../../../../settings';
import { Row, Col, message } from 'antd';
import CheckoutStepsComponent from './CheckoutStepsComponent';
import OrderCardComponent from './OrderCardComponent';
import OrderTrackCardComponent from './OrderTrackCardComponent';
import naruto2 from '../resources/naruto2.jpg';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - Order`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${'meta'}` }]}
  />
);

export default class CheckoutOrderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        name: 'Canon EOS 70D DSLR Camera Bundle with Canon EF-S 18-55mm f/3.5- 5.6 IS ',
        image: naruto2,
        days: 4,
        date: {
          start: "04 Jan'19",
          end: "07 Jan'19"
        },
        refund: 5000,
        totalRent: 1300,
        youPaid: {
          amount: 6300,
          method: 'Debit Card'
        }
      },
      status: {
        owner: 'Rajeev Khanna',
        date: {
          confirm: "29 Nov'18",
          pickup: "02 Dec'18",
          delivery: "03 Dec'18",
          start: "03 Dec'18",
          end: "10 Dec'18",
          check: "11 Dec'18",
          return: "12 Dec'18"
        }
      },
      completed: 3
    };
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
    message.info('We will notify you of new updates!');

    // Redirect
    if (history) {
      return history.push('/my-orders/');
    }
    if (navigation) {
      return navigation.goBack();
    }
  }

  render() {
    return (
      <PageLayout>
        {renderMetaData()}
        <div className="checkoutDiv">
          <Row>
            <Col lg={{ span: 22, offset: 2 }} xs={{ span: 24, offset: 0 }}>
              <CheckoutStepsComponent step={3} />
            </Col>
            <Col lg={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} xs={{ span: 24, offset: 0 }}>
              <Col lg={{ span: 14, offset: 0 }} xs={{ span: 24, offset: 0 }} className="margin20">
                <OrderTrackCardComponent status={this.state.status} completed={this.state.completed} />
              </Col>
              <Col lg={{ span: 8, offset: 2 }} xs={{ span: 24, offset: 0 }} className="marginT20">
                <OrderCardComponent
                  onSubmit={this.onSubmit}
                  product={this.state.product}
                  paid={true}
                  buttonText={'View All Orders'}
                />
              </Col>
            </Col>
          </Row>
        </div>
      </PageLayout>
    );
  }
}
