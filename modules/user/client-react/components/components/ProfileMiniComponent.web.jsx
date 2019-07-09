import React from 'react';
import { CardText } from '@gqlapp/look-client-react';
import { Avatar, Row, Col } from 'antd';

const ProfileMiniComponent = ({ item }) => {
  return (
    <Row>
      <Col span={4}>
        <Avatar size={30} src={item.avatar} />
      </Col>
      <Col span={18}>
        <CardText style={{ margin: '2px 0px' }}>
          {item.firstName} {item.lastName}
        </CardText>
      </Col>
    </Row>
  );
};

export default ProfileMiniComponent;
