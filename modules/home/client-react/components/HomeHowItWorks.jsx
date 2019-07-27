import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Tabs } from 'antd';

const { TabPane } = Tabs;

const ForBorrowers = [
  {
    head: 'Search',
    text: 'Search for the Gear you are looking for'
  },
  {
    head: 'Book',
    text: 'Book the desired gear, for the dates you want and pay upfront.'
  },
  {
    head: 'ID Proof',
    text:
      'Our hustler will deliver the gear to your doorstep. keep any original gov id card ready as we will hold on to it for you, during rental period.'
  },
  {
    head: 'Use And Return',
    text: 'Happy clicking! Our hustler will meet you once the rental period is over to collect the gear.'
  }
];

const ForLenders = [
  {
    head: 'List',
    text: 'List your equipment for rental and we will call you to schedule your verification.'
  },
  {
    head: 'Verification',
    text: 'Get your listing verified by our hustler.'
  },
  {
    head: 'Notification',
    text: 'Get nofied in case of an order and wait for our hustler to pick it up.'
  },
  {
    head: 'Earn',
    text: 'Sit back and relax as we earn your money for you.'
  },
  {
    head: 'Return',
    text: 'As soon as the order is done, our hustlers will return your gear back to you'
  }
];

const HomeHowItWorks = ({ t }) => {
  return (
    <div className="home-how-it-works-container layout-counter-margin layout-padding">
      <Row gutter={10} align="middle" type="flex" style={{ height: '100%' }}>
        <Col xs={24} md={12}>
          <img src={require(`../images/home/how-it-works.svg`)} className="home-how-it-works" />{' '}
        </Col>
        <Col xs={24} md={12}>
          <h1 align="center" className="home-heading">
            How Lenshood Works
          </h1>
          <div align="center">
            <div
              className="home-heading-underline"
              style={{
                width: '242px'
              }}
            />
          </div>
          <div
            style={{
              width: '100%',
              alignItems: 'center',

              display: 'flex',
              flexDirection: 'column',
              border: 'none'
            }}
          >
            <div
              className="TermsContainer"
              style={{
                left: '50%',
                width: '100%',

                maxWidth: '442px',
                display: 'flex',
                flexDirection: 'column',
                border: 'none'
              }}
            >
              <Tabs
                defaultActiveKey="1"
                size="large"
                tabBarStyle={{
                  maxWidth: '442px',
                  display: 'flex',
                  justifyContent: 'center',
                  color: '#111'
                }}
              >
                <TabPane tab="For Borrowers" key="1">
                  <ol className="home-how-it-works-list">
                    {ForBorrowers.map((item, key) => (
                      <>
                        <li>{item.head}</li>
                        <div className="home-how-it-works-list-item">{item.text}</div>
                      </>
                    ))}
                  </ol>
                </TabPane>

                <TabPane tab="For Lenders" key="2">
                  <ol className="home-how-it-works-list">
                    {ForLenders.map((item, key) => (
                      <>
                        <li>{item.head}</li>
                        <div className="home-how-it-works-list-item">{item.text}</div>
                      </>
                    ))}
                  </ol>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
HomeHowItWorks.propTypes = {
  t: PropTypes.func
};

export default HomeHowItWorks;
