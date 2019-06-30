import React from 'react';

import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import Container from './Container';
import Row from './Row';
import Col from './Col';
import './styles.css';

export default class Footer extends React.Component {
  state = {
    width: 0,
    height: 0,
    show1: false,
    show2: false,
    show3: false,
    show4: false
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  showSettings(event) {
    event.preventDefault();
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  toggle = function(det) {
    if (det == 1)
      this.setState(state => {
        return { show1: !state.show1 };
      });
    if (det == 2)
      this.setState(state => {
        return { show2: !state.show2 };
      });
    if (det == 3)
      this.setState(state => {
        return { show3: !state.show3 };
      });
    if (det == 4)
      this.setState(state => {
        return { show4: !state.show4 };
      });
  };

  render() {
    return this.state.width > 800 ? (
      <Container className="no-print" align="center">
        <Row className="footer" gutter={16}>
          <Col lg={12} sm={24}>
            <Row>
              <Col sm={{ span: 12 }}>
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
              <Col sm={{ span: 12 }}>
                <ul>
                  <h3>How It Works</h3>
                  <li>
                    <Link to="/renting">Borrowing</Link>
                  </li>
                  <li>
                    <Link to="/lending">Lending</Link>
                  </li>
                  <li>
                    <Link to="/TrustAndSafety">Trust And Safety</Link>
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
              <Col sm={{ span: 12 }}>
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
              <Col sm={{ span: 12 }}>
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
          <Col className="FooterLogo" span={24} style={{ borderTopStyle: 'solid', padding: '10px 0px 0px 0px' }}>
            <Row>
              <Link to="/">
                <img
                  src={require('../../logo/OrgLogo.png')}
                  height="50"
                  width="50"
                  align="centre"
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}
                />
              </Link>
            </Row>
          </Col>
        </Row>
      </Container>
    ) : (
      <Container className="no-print" align="center">
        <Row className="footer" gutter={16}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              <h3 onClick={() => this.toggle(1)}>
                About Lenshood {this.state.show1 ? <Icon type="caret-up" /> : <Icon type="caret-down" theme="filled" />}
              </h3>
              <div
                style={
                  this.state.show1
                    ? { display: 'block' }
                    : { display: 'none', position: 'absolute', marginLeft: '20px' }
                }
              >
                <ul style={{ listStyle: 'none', padding: '0 0 0 0' }}>
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
              </div>
            </div>

            <div>
              <h3 onClick={() => this.toggle(2)}>
                How It Works{' '}
                {this.state.show2 ? <Icon type="caret-up" theme="filled" /> : <Icon type="caret-down" theme="filled" />}
              </h3>
              <div style={this.state.show2 ? { display: 'block' } : { display: 'none' }}>
                <ul style={{ listStyle: 'none', padding: '0 0 0 0' }}>
                  <li>
                    <Link to="/renting">Borrowing</Link>
                  </li>
                  <li>
                    <Link to="/lending">Lending</Link>
                  </li>
                  <li>
                    <Link to="/TrustAndSafety">Trust And Safety</Link>
                  </li>
                  <li>
                    <Link to="/faq">FAQ</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h3 onClick={() => this.toggle(3)}>
                Keep In Touch{' '}
                {this.state.show3 ? <Icon type="caret-up" theme="filled" /> : <Icon type="caret-down" theme="filled" />}
              </h3>
              <div style={this.state.show3 ? { display: 'block' } : { display: 'none' }}>
                <ul style={{ listStyle: 'none', padding: '0 0 0 0' }}>
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
              </div>
            </div>

            <div>
              <h3 onClick={() => this.toggle(4)}>
                Follow Us{' '}
                {this.state.show4 ? <Icon type="caret-up" theme="filled" /> : <Icon type="caret-down" theme="filled" />}
              </h3>
              <div style={this.state.show4 ? { display: 'block' } : { display: 'none' }}>
                <ul style={{ listStyle: 'none', padding: '0 0 0 0' }}>
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
              </div>
            </div>
          </div>

          <Col className="FooterLogo" span={24} style={{ borderTopStyle: 'solid', padding: '10px 0px 0px 0px' }}>
            <Row>
              <Link to="/">
                <img
                  src={require('../../logo/OrgLogo.png')}
                  height="50"
                  width="50"
                  align="centre"
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}
                />
              </Link>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
