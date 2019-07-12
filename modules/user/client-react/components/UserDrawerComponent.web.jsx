import React, { Component } from 'react';
import PropTypes from 'prop-types';

// To Do Abstract Out
import { Drawer, Button, Col, Row, Avatar, Rate } from 'antd';
import { Link } from 'react-router-dom';

const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16
};

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
      color: 'rgba(0,0,0,0.65)'
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)'
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

export default class UserDrawerComponent extends Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const user = this.props.user;
    return (
      <div>
        <a onClick={this.showDrawer}>View User</a>
        <Drawer width={640} placement="right" closable={false} onClose={this.onClose} visible={this.state.visible}>
          <p style={{ ...pStyle, marginBottom: 24 }}>
            User Id: {user.id}
            <Link className="user-link" to={`/users/${user.id}`}>
              <Button color="primary" size="sm">
                Edit
              </Button>
            </Link>
          </p>
          <Avatar
            src={
              user.profile && user.profile.image
                ? user.profile.image
                : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
            }
            size="large"
          />
          <Rate disabled defaultValue={parseInt(user.profile && user.profile.rating ? user.profile.rating : 0)} />
          <p style={pStyle}>Is Active?: {user.isActive ? 'Yes' : 'No'}</p>
          <p style={pStyle}>
            Mobile:
            {user.profile && user.profile.mobile ? user.profile.mobile : 'Not Provided'}
          </p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Username" content={user.username} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="email" content={user.email} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="First Name"
                content={user.profile && user.profile.firstName ? user.profile.firstName : 'Not Provided'}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Last Name"
                content={user.profile && user.profile.lastName ? user.profile.lastName : 'Not Provided'}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Is Verfied?" content={user.profile && user.profile.isVerified ? 'Yes' : 'No'} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Is Available" content={user.profile && user.profile.isAvailable ? 'Yes' : 'No'} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Response Time"
                content={user.profile && user.profile.responseTime ? user.profile.responseTime : 'Not Provided'}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Acceptance Rate"
                content={user.profile && user.profile.acceptanceRate ? user.profile.acceptanceRate : 'Not Provided'}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Designation"
                content={user.profile && user.profile.designation ? user.profile.designation : 'Not Provided'}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Website"
                content={user.profile && user.profile.website ? user.profile.website : 'Not Provided'}
              />
            </Col>
          </Row>
          <Row>
            <Col span={20}>
              <DescriptionItem
                title="about"
                content={user.profile && user.profile.about ? user.profile.about : 'Not Provided'}
              />
            </Col>
            <Col span={4}>
              <DescriptionItem
                title="Flag"
                content={user.profile && user.profile.flag ? user.profile.flag : 'Not Provided'}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Referrer Mobile"
                content={user.referredBy ? user.referredBy.profile.mobile : 'Not yet!'}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Referrer Email" content={user.referredBy ? user.referredBy.email : 'Not yet!'} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Created At" content={user.createdAt} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Updated At" content={user.updatedAt} />
            </Col>
          </Row>
        </Drawer>
      </div>
    );
  }
}

UserDrawerComponent.propTypes = {
  user: PropTypes.object.isRequired
};

DescriptionItem.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};
