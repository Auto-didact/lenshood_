import React from "react";
import PropTypes from "prop-types";
import { Spin } from "antd";
import "./styles.css";

export default class Loader extends React.Component {
  render() {
    return (
      <div className="loader">
        <Spin size="large" />
        <br />
        {this.props.text}
      </div>
    );
  }
}

Loader.propTypes = {
  text: PropTypes.string
};
