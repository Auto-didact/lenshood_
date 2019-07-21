import React from "react";
import { Col, Button } from "antd";
import PropTypes from "prop-types";

const SocialSharingButtons = props => {
  const { twitterMessage, whatsappMessage, link } = props;
  return (
    <Col span={24} style={{ height: "50px" }}>
      <a href={`http://www.facebook.com/share.php?u=${link}`} target="_blank">
        <img
          src={require("../resources/facebook.png")}
          height="30"
          width="30"
          align="centre"
          className="marginR10 borderRadius9"
        />
      </a>
      <a
        href={`https://twitter.com/share?url=${twitterMessage.link}&amp;text=${
          twitterMessage.text
        }&amp;hashtags=${twitterMessage.hashtag}`}
        target="_blank"
      >
        <img
          src={require("../resources/twitter.png")}
          height="30"
          width="30"
          align="centre"
          className="marginR10 borderRadius9"
        />
      </a>
      <a
        href={`https://web.whatsapp.com/send?text=${whatsappMessage}`}
        target="_blank"
      >
        <img
          src={require("../resources/whatsapp.png")}
          height="30"
          width="30"
          align="centre"
          className="marginR10 borderRadius9"
        />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${link}`}
        target="_blank"
      >
        <img
          src={require("../resources/linkedin.png")}
          height="30"
          width="30"
          align="centre"
          className="marginR10 borderRadius9"
        />
      </a>
    </Col>
  );
};

SocialSharingButtons.propTypes = {
  twitterMessage: PropTypes.object,
  whatsappMessage: PropTypes.object,
  link: PropTypes.string
};

export default SocialSharingButtons;
