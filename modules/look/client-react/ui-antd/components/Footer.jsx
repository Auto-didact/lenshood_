import React from 'react';

import { Icon } from 'antd';

import Container from './Container';
import Row from './Row';
import Col from './Col';

export default class Footer extends React.Component {
  render() {
    return (
      <Container className="no-print">
        <Row gutter={16}>
          <Col span={6}>
            <h3>About Lenshood</h3>

            <ul>
              <li>About us</li>
              <li>Terms of Service</li>
              <li>Privacy Rules</li>
              <li>Mission</li>
            </ul>
          </Col>
          <Col span={6}>
            <h3>How It Works</h3>

            <ul>
              <li>Renting</li>
              <li>Lending</li>
              <li>FAQ</li>
            </ul>
          </Col>
          <Col span={6}>
            <h3>Keep In Touch</h3>
            <ul>
              <li>
                Write to us:
                <br />
                reachus@lenshood.in
              </li>
              <li>
                For any inquiry:
                <br />
                +91-9085626859
              </li>
            </ul>
          </Col>
          <Col span={6}>
            <h3>Follow Us</h3>
            <ul>
              <li>Blog</li>
              <li>
                <Icon type="facebook" />
                <Icon type="linkedin" />
                <Icon type="instagram" />
                <Icon type="twitter" />
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    );
  }
}
