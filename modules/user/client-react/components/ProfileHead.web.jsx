import React from 'react';
import { CardGroup } from '@gqlapp/look-client-react';
import { Avatar, Icon, Row, Col, Divider } from 'antd';
import { ImgUser } from '../constants/DefaultImages';

const ProfileHead = ({ profile, description }) => {
  return (
    <div align="center" style={{ marginBottom: '10px' }}>
      <Avatar size={100} src={profile && profile.avatar ? profile.avatar : ImgUser} />
      <br />

      <CardGroup>
        <h2 style={{ textAlign: 'center' }}>
          {profile && profile.firstName && profile.lastName
            ? profile.firstName + ' ' + profile.lastName
            : 'Not Provided'}
        </h2>
      </CardGroup>

      <h4 style={{ textAlign: 'center' }}>({profile && profile.designation ? profile.designation : 'Not Provided'})</h4>
      <Divider />
      <Row>
        <Col
          span={8}
          style={{
            align: 'center'
          }}
        >
          <h2>{profile && profile.acceptanceRate ? profile.acceptanceRate : 'Not Available'}</h2>

          <h4>{description.acceptanceRate}</h4>
        </Col>

        <Col
          span={8}
          style={{
            align: 'center'
          }}
        >
          <div>
            <h2>
              <span className="StarRate">
                {profile && profile.rating ? profile.rating : 'Not Rated'}
                <Icon type="star" theme="filled" />
              </span>
            </h2>

            <h4>{description.rating}</h4>
          </div>
        </Col>

        <Col
          span={8}
          style={{
            align: 'center'
          }}
        >
          <h2>{profile && profile.rating ? profile.rating : 'Not Available '}</h2>
          <h4>{description.responseTime}</h4>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileHead;
