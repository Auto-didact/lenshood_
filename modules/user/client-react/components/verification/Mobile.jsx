import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Avatar } from "antd";

const Mobile = ({ mobile }) => {
  if (!mobile) {
    return <h4>Unavailable</h4>;
  } else {
    return (
      <Card title="Your Mobile Number">
        <h4>{mobile.mobile}</h4>
        <h4>Verfication Status: {mobile.isVerified}</h4>
      </Card>
    );
  }
};

export default Mobile;
