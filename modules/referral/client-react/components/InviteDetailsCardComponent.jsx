import React, { useRef, useState, useEffect } from 'react';
import { Row, Col, Card, Icon, Input, message, Radio } from 'antd';
import { Button, Form, RenderField, Alert } from '@gqlapp/look-client-react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { isFormError, FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { match, email, minLength, required, validate, number } from '@gqlapp/validation-common-react';
import settings from '../../../../settings';

const InviteDetailsCardComponentSchema = {
  inviteVal: [required]
};

const InviteDetailsCardComponent = ({ values, handleSubmit, submitting, errors, username }) => {
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    message.info('Copied to Clipboard!');
  }

  const [inviteUrl, setinviteUrl] = useState(`/${username}`);

  const [flag, setflag] = useState(false);

  const [inputForm, setInputForm] = useState('email');

  useEffect(() => {
    setflag(true);
    setinviteUrl(`${global.window.location}/${username}`);
  }, []);

  const whatsappMessage = `Earn cash when you sign-up using the following link: ${inviteUrl} Use the referral code - ${username} while signing up to earn cash.`;
  const twitterMessage = {
    text: `Use the referral code - ${username} while signing up to earn cash.`,
    hashtag: '#lenshood #earncash #renting #lending',
    link: inviteUrl
  };

  function handleChangeInput(e) {
    setInputForm(e.target.value);
  }

  return (
    <div>
      <Card className="boxShadowTheme borderRadius9 marginB20">
        <h1 className="justifyAlign">
          <strong>Get up to 40 cash for every friend you invite</strong>
        </h1>
        <p className="justifyAlign marginB20">
          Help us grow the herd and we’ll help you get dinner somewhere nice. Share your link to give friends 20 and
          you’ll get 10 cash when they buy, sell, borrow or lend for the first time.
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
            {flag && document.queryCommandSupported('copy') && (
              <div>
                <Button onClick={copyToClipboard} color="primary" block size="lg">
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

        <Form name="invite" onSubmit={handleSubmit}>
          <Radio.Group value={inputForm} onChange={handleChangeInput}>
            <Radio.Button value="email">Email</Radio.Button>
            <Radio.Button value="num">Number</Radio.Button>
          </Radio.Group>
          <Col sm={20} xs={17}>
            {inputForm === 'email' ? (
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
          </Col>

          <Col sm={4} xs={7}>
            <Button type="submit" disabled={submitting} color="primary" block ghost>
              Invite
            </Button>
            <div className="text-center">
              {errors && errors.errorMsg && <Alert color="error">{errors.errorMsg}</Alert>}
            </div>
          </Col>
        </Form>
        <br />

        <Col span={24}>
          <a href={`http://www.facebook.com/share.php?u=${inviteUrl}`} target="_blank">
            <img
              src={require('../resources/facebook.png')}
              height="35"
              width="35"
              align="centre"
              className="marginR10 borderRadius9"
            />
          </a>
          <a
            href={`https://twitter.com/share?url=${twitterMessage.link}&amp;text=${twitterMessage.text}&amp;hashtags=${
              twitterMessage.hashtag
            }`}
            target="_blank"
          >
            <img
              src={require('../resources/twitter.png')}
              height="35"
              width="35"
              align="centre"
              className="marginR10 borderRadius9"
            />
          </a>
          <a href={`https://web.whatsapp.com/send?text=${whatsappMessage}`} target="_blank">
            <img
              src={require('../resources/whatsapp.png')}
              height="35"
              width="35"
              align="centre"
              className="marginR10 borderRadius9"
            />
          </a>
          <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${inviteUrl}`} target="_blank">
            <img
              src={require('../resources/linkedin.png')}
              height="35"
              width="35"
              align="centre"
              className="marginR10 borderRadius9"
            />
          </a>
        </Col>
      </Card>
    </div>
  );
};

InviteDetailsCardComponent.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  errors: PropTypes.object,
  values: PropTypes.object,
  username: PropTypes.string
};

const InviteDetailsCardComponentWithFormik = withFormik({
  mapPropsToValues: () => ({
    inviteVal: []
  }),
  validate: values => validate(values, InviteDetailsCardComponentSchema),
  async handleSubmit(
    values,
    {
      props: { username, onSubmit }
    }
  ) {
    if (!values.inviteVal.number && !values.inviteVal.email) {
      message.warn('No One to invite!');
    }

    if (values.inviteVal.number) {
      let x = values.inviteVal.number.toString();
      x.length >= 10 ? message.warn('Function not defined yet!') : message.warn('Enter a valid Phone Number');
    }

    if (values.inviteVal.email) {
      // delete values["inviteVal"];
      onSubmit({ username: username, email: values.inviteVal.email });
    }
    console.log(values);
  },
  enableReinitialize: true,
  displayName: 'inviteForm' // helps with React DevTools
});

export default InviteDetailsCardComponentWithFormik(InviteDetailsCardComponent);
