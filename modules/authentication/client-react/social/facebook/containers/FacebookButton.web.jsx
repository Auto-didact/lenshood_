import React from "react";
import PropTypes from "prop-types";
import { withApollo } from "react-apollo";
import faFacebookSquare from "@fortawesome/fontawesome-free-brands/faFacebookSquare";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { Button, Icon } from "antd";

import "./FacebookButton.css";

const facebookLogin = () => {
  window.location = "/auth/facebook";
};

const FacebookButton = withApollo(({ text }) => {
  return (
    <Button onClick={facebookLogin} className="facebookBtn" block>
      <Icon type="facebook" theme="filled" />
      <div className="separator" />
      <span>Continue with Facebook</span>
    </Button>
  );
});

const FacebookLink = withApollo(({ text }) => {
  return (
    <Button color="link" onClick={facebookLogin} style={{ marginTop: 10 }}>
      {text}
    </Button>
  );
});

const FacebookIcon = () => (
  <FontAwesomeIcon
    icon={faFacebookSquare}
    style={{ marginTop: 10, color: "#17427e", fontSize: 40 }}
    onClick={facebookLogin}
  />
);

const FacebookComponent = ({ text, type }) => {
  switch (type) {
    case "button":
      return <FacebookButton text={text} />;
    case "link":
      return <FacebookLink text={text} />;
    case "icon":
      return <FacebookIcon />;
    default:
      return <FacebookButton text={text} />;
  }
};

FacebookComponent.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string.isRequired
};

export default FacebookComponent;
