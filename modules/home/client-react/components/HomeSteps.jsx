import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { OverPack } from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';

const stepsData = [
  {
    id: 1,
    text: 'SignUp',
    subText: 'Some Text About SignUp'
  },
  {
    id: 2,
    text: 'Lenshood KYC',
    subText: 'Some Text About Lenshood KYC'
  },
  {
    id: 3,
    text: 'Add Listing',
    subText: 'Some Text About Add Listing'
  }
];

const HomeSteps = ({ t }) => {
  return (
    <div className="home-steps-container layout-counter-margin layout-padding" align="center">
      <h1 className="home-heading">Three Simple Steps To Get Started</h1>
      <div align="center">
        <div className="home-heading-underline" style={{ width: '392px' }} />
      </div>
      <br />
      {stepsData.map((item, key) => (
        <Row align="middle" type="flex" gutter={10} style={{ height: '50vh' }}>
          <Col xs={{ span: 24 }} md={{ span: 12 }} span={12} order={(key + 1) % 2 === 0 ? 2 : 1}>
            <OverPack style={{ width: '100%', height: '30vh' }}>
              <QueueAnim key="queue" leaveReverse>
                {' '}
                <div key="a">
                  <h1 className="home-steps-sub-head">
                    <b>{item.text}</b>
                  </h1>
                  <h1>{item.subText}</h1>
                </div>{' '}
              </QueueAnim>
            </OverPack>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} span={12} order={(key + 1) % 2 === 0 ? 1 : 2}>
            <OverPack style={{ width: '100%', height: '50vh' }}>
              <QueueAnim key="queue" leaveReverse>
                {' '}
                <div key="a">
                  <img src={require(`../images/home/steps-${item.id}.svg`)} height="400px" />
                </div>{' '}
              </QueueAnim>
            </OverPack>
          </Col>
        </Row>
      ))}
    </div>
  );
};
HomeSteps.propTypes = {
  t: PropTypes.func
};

export default HomeSteps;
