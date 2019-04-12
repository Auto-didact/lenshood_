import React, { Component } from 'react';
import { Row, Col, Form, Input, Button, Checkbox } from 'antd';
import { PageLayout } from '@gqlapp/look-client-react';
import './resources/listingCatalogue.css';
import ListYGSteps from './components/ListYGSteps';

class ListTourGearRental extends Component {
  state = {
    value: 'excellent'
  };
  classNamesgroup(e) {
    if (this.state.value === e) {
      return 'ActiveCond';
    } else {
      return 'NotActive';
    }
  }
  renderCondition(e) {
    this.setState({ value: e });
  }
  render() {
    return (
      <PageLayout>
        <div style={{ padding: '20px' }}>
          <Row>
            <Col
              md={{ span: 14, offset: 5 }}
              sm={{ span: 20, offset: 2 }}
              style={{
                padding: '24px auto'
              }}
            >
              <ListYGSteps step={2} />
              <Form layout="vertical">
                <Form.Item label={<strong>Expected Rent</strong>}>
                  <Row gutter={16}>
                    <Col md={6} xs={8}>
                      <Input type="rext" value="300" />
                    </Col>
                    <Col span={4}>
                      <span className="perDayWeek">per day</span>
                    </Col>
                    <Col md={6} xs={8}>
                      <Input type="rext" value="300" />
                    </Col>
                    <Col span={4}>
                      <span className="perDayWeek">per week</span>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item label={<strong>Replacement Value</strong>}>
                  <Row gutter={16}>
                    <Col md={6} xs={8}>
                      <Input type="rext" value="300" />
                    </Col>
                    <Col span={16}>
                      <span className="selectfit">
                        Note: Cost of Replacement in market value of the product, incase of total damage or theft
                        settlement will be upto this amount.
                      </span>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item label={<strong>Benefits you offer</strong>}>
                  <Checkbox.Group style={{ width: '100%' }}>
                    <Col span={24}>
                      <Checkbox value="Delivery">Delivery</Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="Insurance">Insurance</Checkbox>
                    </Col>
                  </Checkbox.Group>
                </Form.Item>

                <Form.Item label={<strong>Product condition</strong>}>
                  <p className="selectfit">Select the one your product best fits into.</p>
                  <Row gutter={24}>
                    <Col span={8}>
                      <div
                        onClick={e => this.renderCondition('excellent')}
                        className={this.classNamesgroup('excellent')}
                        style={{ fontSize: '12px', padding: '10%' }}
                      >
                        <h3> Excellent</h3>
                        <ul style={{ paddingLeft: '22px' }}>
                          {' '}
                          <li>No repair history</li>
                          <li>0-6 months old</li>
                          <li>Hardly used</li>
                          <li>No scratches</li>
                        </ul>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div
                        onClick={e => this.renderCondition('good')}
                        className={this.classNamesgroup('good')}
                        style={{ fontSize: '12px', padding: '10%' }}
                      >
                        <h3> Good</h3>
                        <ul style={{ paddingLeft: '22px' }}>
                          {' '}
                          <li>Minor repairs</li>
                          <li>6 months - 1 year old</li>
                          <li>Normal usage</li>
                          <li>No scratches/ minor scatches</li>
                        </ul>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div
                        onClick={e => this.renderCondition('fairly used')}
                        className={this.classNamesgroup('fairly used')}
                        style={{ fontSize: '12px', padding: '10%' }}
                      >
                        <h3> Fairly used</h3>
                        <ul style={{ paddingLeft: '22px' }}>
                          {' '}
                          <li>No repair history</li>
                          <li>1-2 years old</li>
                          <li>Fair usage</li>
                          <li>Few scratches</li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item>
                  <Button className="themeColor uploadButton">UPLOAD</Button>
                  <Button className="DraftButton">SAVE AS DRAFT</Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </PageLayout>
    );
  }
}

export default ListTourGearRental;
