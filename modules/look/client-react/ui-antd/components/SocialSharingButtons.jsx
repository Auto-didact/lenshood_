import React, { useRef, useState, useEffect } from "react";
import { Col, message, Radio, Modal, Card } from "antd";
import PropTypes from "prop-types";
import { Button, Form, RenderField, Alert } from "@gqlapp/look-client-react";
import { withFormik } from "formik";
import { isFormError, FieldAdapter as Field } from "@gqlapp/forms-client-react";
import {
  match,
  email,
  minLength,
  required,
  validate,
  number
} from "@gqlapp/validation-common-react";

const SocialSharingButtonsSchema = {
  inviteVal: [required]
};

const SocialSharingButtons = props => {
  const {
    values,
    handleSubmit,
    submitting,
    errors,
    twitterMessage,
    whatsappMessage,
    link
  } = props;

  const [inputForm, setInputForm] = useState("email");
  const [flag, setflag] = useState(false);

  function handleChangeInput(e) {
    setInputForm(e.target.value);
  }

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
      <Button
        shape="circle"
        onClick={() => setflag(true)}
        color="primary"
        ghost
        icon="mail"
      />
      <Modal
        title="Share Listing"
        centered
        footer={null}
        bodyStyle={{ padding: 0 }}
        visible={flag}
        onCancel={() => setflag(false)}
      >
        <Card>
          <Form name="invite" onSubmit={handleSubmit}>
            {/* <Radio.Group value={inputForm} onChange={handleChangeInput}>
              <Radio.Button value="email">Email</Radio.Button>
              <Radio.Button value="num">Number</Radio.Button>
            </Radio.Group> */}
            {inputForm === "email" ? (
              <Field
                name="inviteVal.email"
                component={RenderField}
                type="email"
                placeholder="Enter E-mail to invite"
                value={values.inviteVal.email}
              />
            ) : (
              <Field
                name="inviteVal.number"
                component={RenderField}
                type="number"
                placeholder="Enter Number to invite"
                value={values.inviteVal.number}
              />
            )}
            <Col span={24} className="marginB20">
              <h3>
                <strong>Text:</strong>
              </h3>
              <Card>{whatsappMessage}</Card>
            </Col>
            <Button type="submit" disabled={submitting} color="primary">
              Share
            </Button>
            <div className="text-center">
              {errors && errors.errorMsg && (
                <Alert color="error">{errors.errorMsg}</Alert>
              )}
            </div>
          </Form>
        </Card>
      </Modal>
    </Col>
  );
};

SocialSharingButtons.propTypes = {
  twitterMessage: PropTypes.object,
  whatsappMessage: PropTypes.string,
  emailMessage: PropTypes.string,
  link: PropTypes.string,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  errors: PropTypes.object,
  values: PropTypes.object
};

const SocialSharingButtonsWithFormik = withFormik({
  mapPropsToValues: () => ({
    inviteVal: []
  }),
  validate: values => validate(values, SocialSharingButtonsSchema),
  async handleSubmit(
    values,
    {
      props: { onSubmit, emailMessage }
    }
  ) {
    if (!values.inviteVal.number && !values.inviteVal.email) {
      message.warn("No One to Share with!");
    }

    if (values.inviteVal.number) {
      let x = values.inviteVal.number.toString();
      x.length >= 10
        ? message.warn("Function not defined yet!")
        : message.warn("Enter a valid Phone Number");
    }

    if (values.inviteVal.email) {
      // delete values["inviteVal"];
      onSubmit({ email: values.inviteVal.email, message: emailMessage });
      message.warn("Sending email!");
    }
    console.log(values);
  },
  enableReinitialize: true,
  displayName: "ShareForm" // helps with React DevTools
});

export default SocialSharingButtonsWithFormik(SocialSharingButtons);
