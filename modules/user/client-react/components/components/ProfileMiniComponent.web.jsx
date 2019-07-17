import React from 'react';
import { CardText } from '@gqlapp/look-client-react';
import { Avatar, Row, Col } from 'antd';

const ProfileMiniComponent = ({ item }) => {
  return (
    <Row>
      <Col span={4}>{item ? <Avatar size={30} src={item.avatar} /> : <Avatar size={30} icon="user" />}</Col>
      <Col span={18}>
        <CardText style={{ margin: '2px 0px' }}>
          {item ? `${item.firstName} ${item.lastName}` : 'Name not available'}
        </CardText>
      </Col>
    </Row>
  );
};

export default ProfileMiniComponent;
