import React from 'react';
import Helmet from 'react-helmet';
import { PageLayout } from '@gqlapp/look-client-react';
// import { TranslateFunction } from "@gqlapp/i18n-client-react";
import settings from '../../../../settings';
import { Layout, Menu, Row, Col, Card, Form, Input, Button } from 'antd';
import CheckoutSteps from './CheckoutSteps';
import OrderCard from './OrderCard';
import naruto2 from '../resources/naruto2.jpg';

const { Item } = Menu;
const { Sider } = Layout;

const renderMetaData = () => (
  <Helmet
    title={`${settings.app.name} - Payment`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${'meta'}` }]}
  />
);

export default class CheckoutPay extends React.Component {
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
    }
  };

  render() {
    return (
      <PageLayout>
        {renderMetaData()}
        <div className="checkoutDiv">
          <Row gutter={16}>
            <CheckoutSteps step={2} />
            <Col lg={6} sm={10} className="ColMenu">
              <div>
                <Sider width={550} className="checkSlider">
                  <h4>
                    <strong>Choose payment option</strong>
                  </h4>
                  <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} className="AccountDetails">
                    <Item className="AccDetItem" key="1">
                      Debit Card
                    </Item>
                    <Item className="AccDetItem" key="2">
                      Credit Card
                    </Item>
                    <Item className="AccDetItem" key="3">
                      Net Banking
                    </Item>
                    <Item className="AccDetItem" key="4">
                      UPI
                    </Item>
                  </Menu>
                </Sider>
              </div>
            </Col>
            <Col lg={9} sm={14} className="marginB30">
              <Card>
                <h4 className="cardFormChead">
                  <strong>Enter Card Details</strong>
                </h4>
                <Form layout="vertical">
                  <Form.Item>
                    <Input placeholder="Name on card" type="text" className="cardFormitem" />
                  </Form.Item>
                  <Form.Item>
                    <Input placeholder="Card Number" type="text" className="cardFormitem" />
                  </Form.Item>
                  <Row gutter={32}>
                    <Col span={12}>
                      <Form.Item>
                        <Input placeholder="Expiry date" type="text" className="cardFormitem" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        <Input placeholder="CVV" type="text" className="cardFormitem" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
                    <Button className="addCard">
                      <h4>Add Card</h4>
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            <Col lg={{ span: 8, offset: 0 }} sm={{ span: 18, offset: 3 }} xs={{ span: 22, offset: 1 }}>
              <OrderCard product={this.state.product} paid={false} buttonText={'Place order'} />
            </Col>
          </Row>
        </div>
      </PageLayout>
    );
  }
}
