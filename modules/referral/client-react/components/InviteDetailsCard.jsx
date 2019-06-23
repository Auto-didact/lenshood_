import React, { useRef, useState } from "react";
import { Row, Col, Button, Card, Form, Icon, Input, message } from "antd";
// import ReferModal from "./ReferModal"
// import { Link } from "react-router-dom";

const InviteDetailsCard = ({ username }) => {
  const textAreaRef = useRef(null);
  let state = {
    shareOpen: "closeShare",
    toggleButtonText: "Share this"
  };

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    message.info("Copied to Clipboard!");
  }

  function shareOpenToggle() {
    if (state.shareOpen === "closeShare") {
      (state.shareOpen = "openShare"),
        (state.toggleButtonText = "Hide sharing options");
    } else {
      (state.shareOpen = "closeShare"), (state.toggleButtonText = "Share this");
    }
  }

  const inviteUrl = `https://lenshood.in/invite/${username}`;
  const whatsappMessage = `Earn cash when you sign-up using the following link: ${inviteUrl} Use the referral code - ${username} while signing up to earn cash.`;
  const twitterMessage = {
    text: `Use the referral code - ${username} while signing up to earn cash.`,
    hashtag: "#lenshood #earncash #renting #lending",
    link: inviteUrl
  };
  return (
    <div>
      <Card className="boxShadowTheme borderRadius9 marginB20">
        <h1 className="justifyAlign">
          <strong>Get up to £40 cash for every friend you invite</strong>
        </h1>
        <p className="justifyAlign marginB20">
          Help us grow the herd and we’ll help you get dinner somewhere nice.
          Share your link to give friends £20 and you’ll get £10 cash when they
          buy, sell, borrow or lend for the first time.
        </p>
        <h2>
          <strong>Share your link:</strong>
        </h2>
        <Col sm={20} xs={17}>
          <Form layout="inline">
            <Input size="large" ref={textAreaRef} value={inviteUrl} />
          </Form>
        </Col>
        <Col sm={4} xs={7}>
          <div>
            {document.queryCommandSupported("copy") && (
              <div>
                <Button
                  onClick={copyToClipboard}
                  type="primary"
                  block
                  size="large"
                >
                  Copy
                </Button>
              </div>
            )}
          </div>
        </Col>
        <br />
        <br />
        <br />
        <h2>
          <strong>Other sharing options:</strong>
        </h2>
        <a
          href={`http://www.facebook.com/share.php?u=${inviteUrl}`}
          target="_blank"
        >
          <img
            src={require("../resources/facebook.png")}
            height="35"
            width="35"
            align="centre"
            className="marginR10 borderRadius9"
          />
        </a>
        <a
          href={`https://twitter.com/share?url=${
            twitterMessage.link
          }&amp;text=${twitterMessage.text}&amp;hashtags=${
            twitterMessage.hashtag
          }`}
          target="_blank"
        >
          <img
            src={require("../resources/twitter.png")}
            height="35"
            width="35"
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
            height="35"
            width="35"
            align="centre"
            className="marginR10 borderRadius9"
          />
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${inviteUrl}`}
          target="_blank"
        >
          <img
            src={require("../resources/linkedin.png")}
            height="35"
            width="35"
            align="centre"
            className="marginR10 borderRadius9"
          />
        </a>
      </Card>
    </div>
  );
};

export default InviteDetailsCard;
