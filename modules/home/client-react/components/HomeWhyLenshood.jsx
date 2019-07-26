import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { OverPack } from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';

const WhyData = [
  {
    id: 1,
    content: 'Each Item is held inspected, cleaned and packed by our experts'
  },
  {
    id: 2,
    content: 'No security Deposit'
  },
  {
    id: 3,
    content: 'Secure Online Payment'
  },
  {
    id: 4,
    content: '100% invite based ensures trust'
  }
];

const HomeWhyLenshood = ({ t }) => {
  return (
    <div className="home-why-lenshood-container layout-counter-margin layout-padding" align="center">
      <div align="center">
        <h1 className="home-heading">Why Lenshood</h1>

        <div className="home-heading-underline" style={{ width: '142px' }} />
      </div>
      <br />
      {WhyData.map((item, key) => (
        <Row align="middle" type="flex" gutter={10}>
          <Col xs={{ span: 24 }} md={{ span: 12 }} span={12} order={(key + 1) % 2 === 0 ? 2 : 1}>
            <OverPack style={{ width: '100%', height: '30vh' }}>
              <QueueAnim key="queue" leaveReverse>
                {' '}
                <div key="a" align="center">
                  <div>
                    <h1 className="home-why-content-text">
                      <h1 className="home-why-lenshood-id home-overlay-text">
                        <b>{item.id}</b>
                      </h1>
                      {item.content}
                    </h1>
                  </div>
                </div>{' '}
              </QueueAnim>
            </OverPack>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} span={12} order={(key + 1) % 2 === 0 ? 1 : 2}>
            <OverPack style={{ width: '100%', height: '50vh' }}>
              <QueueAnim key="queue" leaveReverse>
                {' '}
                <div key="a">
                  <img src={require(`../images/home/why-lenshood-${item.id}.svg`)} height="400px" />
                </div>{' '}
              </QueueAnim>
            </OverPack>
          </Col>
        </Row>
      ))}
    </div>
  );
};
HomeWhyLenshood.propTypes = {
  t: PropTypes.func
};

export default HomeWhyLenshood;
