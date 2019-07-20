import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { RenderAddress, PageLayout } from '@gqlapp/look-client-react';
import { FieldArray, withFormik } from 'formik';
import { Row, Col } from 'antd';
import settings from '../../../../settings';
import CheckoutStepsComponent from './CheckoutStepsComponent';
import OrderCardComponent from './OrderCardComponent';
import naruto2 from '../resources/naruto2.jpg';

const renderMetaData = () => (
  <Helmet
    title={`${settings.app.name} - Bill`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${'meta'}` }]}
  />
);

class CheckoutBillView extends React.Component {
  state = {
    product: {
      name: 'Canon EOS 70D DSLR Camera Bundle with Canon EF-S 18-55mm f/3.5- 5.6 IS ',
      image: naruto2,
      days: 4,
      date: {
        start: "04 Jan'19",
        end: "07 Jan'19"
      },
      refund: 5000,
      totalRent: 1300
    },
    addresses: [
      {
        streetAddress1: 'Room A308, Manas Hostel, IITG',
        streetAddress2: 'North Guwahati',
        state: 'Assam',
        city: 'Guwahati',
        pinCode: '7810390',
        mobile: '+91-9085626859'
      },
      {
        streetAddress1: 'Room A308, Manas Hostel, IITG',
        streetAddress2: 'Guwahati, North Guwahati',
        state: 'Assam',
        city: 'Guwahati',
        pinCode: '7810390',
        mobile: '+91-9085626859'
      }
    ]
  };

  render() {
    const { t } = this.props;
    return (
      <PageLayout>
        {renderMetaData()}
        <div className="checkoutDiv">
          <Row>
            <Col lg={{ span: 22, offset: 2 }} xs={{ span: 24, offset: 0 }}>
              <CheckoutStepsComponent step={1} />
            </Col>
            <Col span={24}>
              <h3 className="billingAddress">Billing Address</h3>
              <br />
            </Col>
            <Col lg={{ span: 16, offset: 0 }} xs={{ span: 24, offset: 0 }}>
              <FieldArray
                name="addresses"
                render={arrayHelpers => (
                  <RenderAddress
                    name="addresses"
                    addresses={this.state.addresses}
                    // addresses={addresses}
                    arrayHelpers={arrayHelpers}
                    label="addresses"
                    t={t}
                    isSelectable={true}
                  />
                )}
              />
            </Col>
            <Col lg={{ span: 8, offset: 0 }} xs={{ span: 24, offset: 0 }}>
              <OrderCardComponent product={this.state.product} paid={false} buttonText={'Continue'} />
            </Col>
          </Row>
        </div>
        <div>
          {/* <input id="nric" type="radio" name="id-type" value="nric" checked />
          <label htmlFor="nric" className="config-select">
            <span className="emoji" role="img" aria-label="Singapore">
              🇸🇬
            </span>
            <span>NRIC</span>
          </label>
          <input id="ektp" type="radio" name="id-type" value="ektp" />
          <label htmlFor="ektp" className="config-select id-config-wrapper">
            <span className="emoji" role="img" aria-label="Indonesia">
              🇮🇩
            </span>
            <span>eKTP</span>
          </label> */}
          {/* <div className="nric-wrapper">
            <input id="nric" type="radio" name="id-type" value="nric" checked />
            <label htmlFor="nric" className="config-select">
              <span className="emoji" role="img" aria-label="Singapore">
                🇸🇬
              </span>
              <span>NRIC</span>
            </label>
            <div className="inline-radios nric-options">
              <input id="single" type="radio" name="front-only" value="true" checked />>
              <label htmlFor="single" className="inline-radio">
                Front-only
              </label>
              <input id="double" type="radio" name="front-only" value="false" />>
              <label htmlFor="double" className="inline-radio">
                Front & back
              </label>
            </div>
          </div>
          <input id="ektp" type="radio" name="id-type" value="ektp" />
          <label htmlFor="ektp" className="config-select id-config-wrapper">
            <span className="emoji" role="img" aria-label="Indonesia">
              🇮🇩
            </span>
            <span>eKTP</span>
          </label> */}
        </div>
      </PageLayout>
    );
  }
}

CheckoutBillView.propTypes = {
  touched: PropTypes.object,
  t: PropTypes.func
};
const CheckoutBillWithFormik = withFormik({
  mapPropsToValues: state => {
    // is always undefined here this part does not work
    const { addresses } = state || '';

    function getAddresses(address) {
      return {
        streetAddress1: address.streetAddress1,
        streetAddress2: address.streetAddress2,
        city: address.city,
        state: address.state,
        pinCode: address.pinCode
      };
    }

    return {
      addresses: addresses && addresses.length !== 0 ? addresses.map(getAddresses) : []
    };
  },
  async handleSubmit(
    values,
    {
      props: { onSubmit }
    }
  ) {
    console.log('values', values);
    //onSubmit();
  },
  displayName: 'CheckoutBill ' // helps with React DevTools
});
export default CheckoutBillWithFormik(CheckoutBillView);
