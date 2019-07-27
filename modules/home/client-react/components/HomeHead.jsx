import React from 'react';

import PropTypes from 'prop-types';

import settings from '../../../../settings';
import { Button, Divider, Card, Row, Col } from 'antd';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';

const animationFront = [
  {
    delay: 1000
  },
  {
    rotateY: 90,
    duration: 1000
  },
  {
    visibility: 'hidden',
    duration: 2000
  },
  {
    rotateY: 90,
    duration: 1000
  },
  {
    delay: 1000,
    visibility: 'visible',
    rotateY: 0,
    duration: 1000
  }
];

const animationBack = [
  {
    visibility: 'hidden',
    duration: 1000
  },
  {
    rotateY: 90,
    duration: 1000
  },
  {
    delay: 1000,
    visibility: 'visible',
    rotateY: 0,
    duration: 1000
  },
  {
    delay: 1000
  },
  {
    rotateY: 90,
    duration: 1000
  },
  {
    visibility: 'hidden',
    duration: 1000
  }
];

const HomeHead = ({ t, image }) => {
  return (
    <div className="home-head-container  layout-counter-margin layout-padding">
      <Row align="middle" type="flex" style={{ height: '100%' }}>
        <Col span={9}>
          <div style={{ height: '100%' }}>
            <div
              style={{
                borderLeft: ' 4px solid #12AE90',
                padding: '0 0 30px 30px',
                width: '340px'
              }}
            >
              <QueueAnim delay={300} className="queue-simple">
                <Row gutter={0} key="a" className="home-image-contentText">
                  <Col
                  span={12}
                  
                    style={{
                      width:"153px",
                      height:"90px",
                      color: '#3D675A',
                      position: 'relative'

                    }}
                  >
                    <TweenOne repeat={-1} animation={animationFront} style={{ position: 'absolute', top: '0', left: 0 }}>
                      Earn
                    </TweenOne>
                    <TweenOne repeat={-1} animation={animationBack} style={{ position: 'absolute', top: '0', left: 0 }}>
                      Save
                    </TweenOne>
                  </Col>

                  <Col span={12} style={{}} align="left">{"Money"}</Col>
                </Row>
                <Row key="b" className="home-image-contentText">
                  <Col span={12} style={{ float:'left', width:"90px" }}>{`By`}</Col>
                  <Col span={12}
                    style={{
                      
                      
                      color: '#3D675A',
                      position: 'relative'
                    }}
                  >
                    <TweenOne repeat={-1} animation={animationFront}>
                      Lending
                    </TweenOne>
                    <TweenOne repeat={-1} animation={animationBack} style={{ position: 'absolute', top: '0', left: 0 }}>
                      Borrowing
                    </TweenOne>
                  </Col>
                </Row>

                <div key="c" style={{ fontSize: '15px', color: '#3D675A' }}>
                  The safest way to lend and rent your cameras within a trusted community of like minded people.
                </div>
              </QueueAnim>
            </div>

            <Button
              style={{ margin: '10px 0  0px 34px', borderRadius: '20px' }}
              type="primary"
              className="home-image-content-button "
              size="large"
              block
            >
              SignUp
            </Button>
          </div>
        </Col>
        <Col
          span={15}
          style={{
            overflow: 'hidden',
            padding: '20px 0px 0px 0px'
          }}
          align="right"
        >
          <img src={require('../images/home/banner.svg')} width="90%" />
        </Col>
      </Row>
    </div>
  );
};
HomeHead.propTypes = {
  t: PropTypes.func,
  image: PropTypes.string
};

export default HomeHead;
