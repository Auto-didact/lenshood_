import React, { Component } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { PageLayout } from '@gqlapp/look-client-react';
import './resources/listingCatalogue.css';
import ListYGSteps from './components/ListYGSteps';

const { TextArea } = Input;

class ListYourGearOwner extends Component {
  render() {
    return (
      <PageLayout>
        <div style={{ padding: '20px' }}>
          <Row>
            <Col
              md={{ span: 14, offset: 5 }}
              sm={{ span: 20, offset: 2 }}
              style={{
                padding: '24px auto',
                background: '#fff'
              }}
            >
              <ListYGSteps step={0} />
              <Form layout="vertical">
                <Form.Item label={<strong>Email ID</strong>}>
                  <Input placeholder="Email Address" type="email" />
                </Form.Item>
                <Form.Item label={<strong>Name</strong>}>
                  <Input placeholder="Name" type="text" />
                </Form.Item>
                <Form.Item label={<strong>Mobile number</strong>}>
                  <Input addonBefore="+91" placeholder="Enter your mobile number" />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label={<strong>Pin Code</strong>}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={<strong>City</strong>}>
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label={<strong>Address</strong>}>
                  <TextArea rows="6" />
                </Form.Item>
                <Form.Item label={<strong style={{ lineHeight: '13px' }}>Add locations you serve</strong>}>
                  <p style={{ lineHeight: '13px', fontSize: '13px' }}>
                    Start entering the locality, landmark, zip code (Separated by comma)
                  </p>
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button className="listSubmitButton">SUBMIT</Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </PageLayout>
    );
  }
}

export default ListYourGearOwner;
