import React from 'react';
import Helmet from 'react-helmet';
import { PageLayout } from '@gqlapp/look-client-react';
// import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '../../../../settings';
import { Row, Col, Icon, Button } from 'antd';
import CheckoutSteps from './CheckoutSteps';
import OrderCard from './OrderCard';
import naruto2 from '../resources/naruto2.jpg';

const renderMetaData = () => (
  <Helmet
    title={`${settings.app.name} - Bill`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${'meta'}` }]}
  />
);

export default class CheckoutBillView extends React.Component {
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
    address: {
      name: 'Ankit Jain',
      address1: 'Room A308, Manas Hostel, IITG',
      address2: 'Guwahati, North Guwahati',
      state: 'Assam',
      PIN: '7810390',
      mobile: '+91-9085626859'
    }
  };

  render() {
    return (
      <PageLayout>
        {renderMetaData()}
        <div className="checkoutDiv">
          <Row gutter={32}>
            <CheckoutSteps step={1} />
            <Col span={24}>
              <h3 className="billingAddress">Billing Address</h3>
              <br />
            </Col>
            <Col lg={14} sm={24}>
              <Row gutter={32}>
                <Col
                  xs={{ span: 18, offset: 3 }}
                  sm={{ span: 12, offset: 0 }}
                  md={{ span: 10, offset: 0 }}
                  className="homeCol"
                >
                  <div className="HomeAddress">
                    <div className="HomeAddressBlock">
                      Home Address <Icon type="home" className="homeicon" />
                    </div>
                    <br />
                    <div className="addressLines">
                      <h4>{this.state.address.name},</h4>
                      <h4>{this.state.address.address1},</h4>
                      <h4>{this.state.address.address2},</h4>
                      <h4>{this.state.address.state}.</h4>
                      <h4>{this.state.address.PIN}</h4>
                      <h4>Mobile: {this.state.address.mobile}</h4>
                    </div>
                    <Button className="addressIcons" ghost>
                      <Icon type="delete" />
                    </Button>
                    <Button className="addressIcons" ghost>
                      <Icon type="edit" />
                    </Button>
                  </div>
                </Col>
                <Col
                  xs={{ span: 14, offset: 5 }}
                  sm={{ span: 10, offset: 0 }}
                  md={{ span: 8, offset: 0 }}
                  className="homeCol"
                >
                  <div
                    className="AddNewAddressBlock"
                    //   onClick={}
                  >
                    <div className="AddNewAddress">
                      <Icon type="plus" />
                    </div>
                    <h5>Add a new address</h5>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={{ span: 8, offset: 0 }} sm={{ span: 18, offset: 3 }} xs={{ span: 22, offset: 1 }}>
              <OrderCard product={this.state.product} paid={false} buttonText={'Continue'} />
            </Col>
          </Row>
        </div>
      </PageLayout>
    );
  }
}
