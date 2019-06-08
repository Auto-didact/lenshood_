import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import '../resources/listingCatalogue.css';
import { Form, Input, Divider, Row, Col, Card, Button } from 'antd';
import naruto2 from '../resources/naruto2.jpg';

class SignIn extends Component {
  render() {
    return (
      <div>
        <p className="signInForm">Let me help you sign in</p>
        <Form className="paddingMarginBottom">
          <Form.Item>
            <Input type="email" placeholder="Email Address" />
          </Form.Item>
          <Form.Item className="paddingMarginBottom">
            <Input type="password" placeholder="Password" />
            <Link
              style={{
                color: '#23b195',
                fontSize: '11px',
                letterSpacing: '0.8px',
                float: 'right'
              }}
              to="/"
            >
              Forgot password?
            </Link>
            <Button
              style={{
                marginTop: '10px'
              }}
              type="primary"
              block
            >
              Sign In
            </Button>
            <p className="belowFormtext">
              New to LensHood?{' '}
              <span onClick={e => this.props.setModal1Visible('signup')} className="colorCursor">
                Sign Up
              </span>
            </p>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
class SignUp extends Component {
  render() {
    return (
      <div>
        <p className="signInForm">Let me help you sign up</p>
        <Form className="paddingMarginBottom">
          <Form.Item>
            <Input type="text" placeholder="Your Name" />
          </Form.Item>
          <Form.Item>
            <Input type="email" placeholder="Email Address" />
          </Form.Item>
          <Form.Item>
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item className="paddingMarginBottom">
            <Button type="primary" block>
              Sign Up
            </Button>
            <p className="belowFormtext">
              Already have an account?{' '}
              <span onClick={e => this.props.setModal1Visible('signin')} className="colorCursor">
                Sign In
              </span>
            </p>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default class SignInAndSignUpCard extends Component {
  state = {
    SignInState: 'signin'
  };

  setModal1Visible(val) {
    this.setState({ SignInState: val });
  }

  render() {
    return (
      <div>
        <Row padding="0">
          <Col span={8}>
            <img
              src={naruto2}
              alt=""
              width={'100%'}
              style={this.state.SignInState === 'signin' ? { height: '463px' } : { height: '504px' }}
            />
          </Col>
          <Col span={16}>
            <Card style={{ padding: '0 10px 0 25px' }}>
              <h2
                style={{
                  paddingBottom: '4px',
                  fonWweight: 900,
                  letterSpacing: '0.4px',
                  textShadow: '1px 0 0'
                }}
              >
                {this.state.SignInState === 'signin' ? 'Sign in to Lenshood' : 'Create Account'}
              </h2>
              <Row gutter={16}>
                <Col span={12}>
                  <Button
                    style={{
                      background: '#3c60a2',
                      color: 'white'
                    }}
                    block
                  >
                    Facebook
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    style={{
                      background: '#c55643',
                      color: 'white'
                    }}
                    block
                  >
                    Google
                  </Button>
                </Col>
              </Row>
              <Divider
                style={{
                  color: '#999',
                  fontSize: '10px',
                  padding: '15px 50px 5px 50px'
                }}
              >
                or via E-mail
              </Divider>
              {this.state.SignInState === 'signin' ? (
                <SignIn setModal1Visible={this.setModal1Visible.bind(this)} />
              ) : (
                <SignUp setModal1Visible={this.setModal1Visible.bind(this)} />
              )}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
