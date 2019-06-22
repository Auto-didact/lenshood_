import React, { useRef, useState } from "react";
import { Row, Col, Button, Card, Form, Icon, Input, message } from "antd";
// import ReferModal from "./ReferModal"

const InviteDetailsCard = ({ username }) => {
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    message.info("Copied to Clipboard!");
  }
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
            <Input
              size="large"
              ref={textAreaRef}
              value={`https://lenshood.in/invite/${username}`}
            />
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
      </Card>
    </div>
  );
};

export default InviteDetailsCard;
