import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Alert } from 'antd';

const Email = ({ email, sentStatus }) => {
  // To Do - Align steps with variables.
  if (email && sentStatus) {
    return (
      <Card title="Your Email">
        <h4>{email.email}</h4>
        <h4>{`Verfication Status: ${email.isVerified}`}</h4>
      </Card>
    );
  } else {
    if (!sentStatus) {
      return (
        <Card>
          <Alert message={`An Email has been sent to ${email}`} type="info" />
        </Card>
      );
    } else {
      return <h4>Unavailable</h4>;
    }
  }
};

export default Email;
