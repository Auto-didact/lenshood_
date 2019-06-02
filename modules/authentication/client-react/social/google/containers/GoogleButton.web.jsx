import React from "react";
import PropTypes from "prop-types";
import { withApollo } from "react-apollo";
import faGooglePlusSquare from "@fortawesome/fontawesome-free-brands/faGooglePlusSquare";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
// import { Button } from "@gqlapp/look-client-react";
import "./GoogleButton.css";
import { Icon, Button } from "antd";

const googleLogin = () => {
  window.location = "/auth/google";
};

const GoogleButton = withApollo(({ text }) => {
  return (
    <Button onClick={googleLogin} className="googleBtn" block>
      <Icon type="google" />
      <div className="separator" />
      <span>Continue with Google</span>
    </Button>
  );
});

const GoogleLink = withApollo(({ text }) => {
  return (
    <Button color="link" onClick={googleLogin} style={{ marginTop: 10 }}>
      {text}
    </Button>
  );
});

const GoogleIcon = () => (
  <FontAwesomeIcon
    icon={faGooglePlusSquare}
    style={{ marginTop: 10, color: "#c43832", fontSize: 40 }}
    onClick={googleLogin}
  />
);

const GoogleComponent = ({ type, text }) => {
  switch (type) {
    case "button":
      return <GoogleButton text={text} />;
    case "link":
      return <GoogleLink text={text} />;
    case "icon":
      return <GoogleIcon />;
    default:
      return <GoogleButton text={text} />;
  }
};

GoogleComponent.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string.isRequired
};

export default GoogleComponent;
