import React from 'react';
import { CardGroup } from '@gqlapp/look-client-react';
import { Avatar, Rate, Icon, Row, Col } from 'antd';

const ProfileHead = ({ profile, description }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <Avatar
        style={{
          marginLeft: '40%',
          marginRight: 'auto'
        }}
        size={100}
        src={
          profile && profile.image ? profile.image : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        }
      />
      <br />

      {profile && profile.firstName && profile.lastName && (
        <CardGroup>
          <h2 style={{ textAlign: 'center' }}>
            {profile.firstName} {profile.lastName}
          </h2>
        </CardGroup>
      )}
      <h4 style={{ textAlign: 'center' }}>({profile.designation})</h4>
      <Row>
        <Col span={8} style={{ borderRight: '2px solid #23b195' }}>
          <h2
            style={{
              textAlign: 'center',
              margin: '4% 0px 0px 0px'
            }}
          >
            {profile.acceptanceRate}
          </h2>

          <h4 style={{ textAlign: 'center' }}>{description.acceptanceRate}</h4>
        </Col>

        <Col span={8}>
          <Rate
            style={{ paddingLeft: '13%' }}
            character={<Icon type="star" fill="#23b195" />}
            disabled
            defaultValue={parseInt(profile && profile.rating ? profile.rating : 0)}
          />
          <br />
          <h4 style={{ textAlign: 'center', marginTop: '1%' }}>{description.rating}</h4>
        </Col>

        <Col span={8} style={{ borderLeft: '2px solid #23b195' }}>
          <h2 style={{ textAlign: 'center', margin: '4% 0px 0px 0px' }}>{profile.responseTime}</h2>
          <h4 style={{ textAlign: 'center' }}>{description.responseTime}</h4>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileHead;
