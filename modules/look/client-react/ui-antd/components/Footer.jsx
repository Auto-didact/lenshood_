import React from 'react';

import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import Container from './Container';
import Row from './Row';
import Col from './Col';
import './styles.css';

export default class Footer extends React.Component {
  render() {
    return (
      <Container className="no-print">
        <Row className="footer" gutter={16}>
          <Col lg={12} sm={24}>
            <Row>
              <Col span={12}>
                <ul>
                  <h3>About Lenshood</h3>
                  <li>
                    <Link to="/about-us">About us</Link>
                  </li>
                  <li>
                    <Link to="/terms-of-service">Terms of Service</Link>
                  </li>
                  <li>
                    <Link to="/privacy-rules">Privacy Rules</Link>
                  </li>
                  <li>
                    <Link to="/mission">Mission</Link>
                  </li>
                </ul>
              </Col>
              <Col span={12}>
                <ul>
                  <h3>How It Works</h3>
                  <li>
                    <Link to="/renting">Renting</Link>
                  </li>
                  <li>
                    <Link to="/lending">Lending</Link>
                  </li>
                  <li>
                    <Link to="/faq">FAQ</Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
          <Col lg={12} sm={24}>
            <Row>
              <Col span={12}>
                <ul>
                  <h3>Keep In Touch</h3>
                  <li>
                    <a href="mailto:reachus@lenshood.in">
                      Write to us:
                      <br />
                      reachus@lenshood.in
                    </a>
                  </li>
                  <li>
                    <a href="">
                      For any inquiry:
                      <br />
                      +91-9085626859
                    </a>
                  </li>
                </ul>
              </Col>
              <Col span={12}>
                <ul>
                  <h3>Follow Us</h3>
                  <li>
                    <Link to="/blog">Blog</Link>
                  </li>
                  <li>
                    <a target="_blank" rel="noopener noreferrer" href="https://facebook.com/lenshoodcommunity">
                      {' '}
                      <Icon theme="filled" type="facebook" />
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/wearelenshood">
                      <Icon theme="filled" type="linkedin" />
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/we_are_lenshood/">
                      <Icon theme="filled" type="instagram" />
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href="/">
                      <Icon type="twitter" />
                    </a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
          <Col className="FooterLogo" span={24}>
            <Link to="/">
              <h1>
                <Icon className="Fill-4" type="smile" />
                <br /> LensHood
              </h1>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}
