import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { isFormError, FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { NavLink, Link } from 'react-router-dom';
import { translate } from '@gqlapp/i18n-client-react';

import { match, email, minLength, required, validate } from '@gqlapp/validation-common-react';
import { Form, RenderField, Button, Alert } from '@gqlapp/look-client-react';
import {
  // LinkedInButton,
  GoogleButton,
  // GitHubButton,
  FacebookButton
} from '@gqlapp/authentication-client-react';
import { camera1, camera2 } from '../constants/DefaultImages';

import { Divider, Row, Col, Card, Modal, message } from "antd";

import settings from '../../../../settings';

const RegisterFormComponentSchema = {
  username: [required, minLength(3)],
  email: [required, email],
  password: [required, minLength(settings.auth.password.minLength)],
  passwordConfirmation: [match('password'), required, minLength(settings.auth.password.minLength)]
};

const { github, facebook, linkedin, google } = settings.auth.social;

// const renderSocialButtons = (buttonsLength, t) => {
//   return buttonsLength > 2 ? (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         minWidth: 200
//       }}
//     >
//       {facebook.enabled && (
//         <div className="text-center">
//           <FacebookButton text={t("login.fbBtn")} type={"icon"} />
//         </div>
//       )}
//       {google.enabled && (
//         <div className="text-center">
//           <GoogleButton text={t("login.googleBtn")} type={"icon"} />
//         </div>
//       )}
//       {github.enabled && (
//         <div className="text-center">
//           <GitHubButton text={t("login.githubBtn")} type={"icon"} />
//         </div>
//       )}
//       {linkedin.enabled && (
//         <div className="text-center">
//           <LinkedInButton text={t("login.linkedinBtn")} type={"icon"} />
//         </div>
//       )}
//     </div>
//   ) : (
//     <div>
//       {facebook.enabled && (
//         <div className="text-center">
//           <FacebookButton text={t("login.fbBtn")} type={"button"} />
//         </div>
//       )}
//       {google.enabled && (
//         <div className="text-center">
//           <GoogleButton text={t("login.googleBtn")} type={"button"} />
//         </div>
//       )}
//       {github.enabled && (
//         <div className="text-center">
//           <GitHubButton text={t("login.githubBtn")} type={"button"} />
//         </div>
//       )}
//       {linkedin.enabled && (
//         <div className="text-center">
//           <LinkedInButton text={t("login.linkedinBtn")} type={"button"} />
//         </div>
//       )}
//     </div>
//   );
// };

const RegisterFormComponent = ({ values, handleSubmit, submitting, errors, t }) => {
  return (
    <div className="signOutOuter">
      <Card className="modalcard" bodyStyle={{ borderRadius: '0px', padding: '0px', margin: '0px' }}>
        <Row>
          <Col sm={8} xs={0} style={{ overflow: 'hidden' }}>
            <img src={camera1} alt="" className="signUpImg" />
          </Col>
          <Col sm={0} xs={24}>
            <img src={camera2} alt="" className="signImg" />
          </Col>
          <Col sm={16} xs={24} className="sign-up-form">
            <h1 className="signinstate">Sign up...</h1>
            <Row>
              <Col xs={24} sm={12}>
                {facebook.enabled && (
                  <div style={{ margin: '2px' }}>
                    <FacebookButton text={t('login.fbBtn')} type={'button'} />
                  </div>
                )}
              </Col>
              <Col xs={24} sm={12}>
                {google.enabled && (
                  <div style={{ margin: '2px' }}>
                    <GoogleButton text={t('login.googleBtn')} type={'button'} />
                  </div>
                )}
              </Col>
            </Row>
            <Divider style={{ marginBottom: '10px' }} />
            <h2 className="form-element-heading">Or you can always...</h2>
            {/* <p className="signInForm">Let me help you sign up</p> */}
            <Form className="paddingMarginBottom" name="register" onSubmit={handleSubmit}>
              <Field
                name="username"
                component={RenderField}
                type="text"
                placeholder={t('reg.form.field.name')}
                value={values.username}
              />
              <Field
                name="email"
                component={RenderField}
                type="email"
                placeholder={t('reg.form.field.email')}
                value={values.email}
              />

              <Field
                name="password"
                component={RenderField}
                type="password"
                placeholder={t('reg.form.field.pass')}
                value={values.password}
              />
              <Field
                name="passwordConfirmation"
                component={RenderField}
                type="password"
                placeholder={t('reg.form.field.passConf')}
                value={values.passwordConfirmation}
              />
              <Divider style={{ margin: '5px 0px' }} />
              <Col span={12}>
                <Field
                  label={<strong>Referral (optional)</strong>}
                  name="referredBy"
                  component={RenderField}
                  type="text"
                  placeholder={t('reg.form.field.referral')}
                  value={values.referredBy}
                />
              </Col>
              {/* <div className="text-center"> */}
              {errors &&
                errors.errorMsg &&
                message.error(errors.referral || errors.errorMsg)}
              {/* </div> */}
              <Button color="primary" block type="submit" disabled={submitting}>
                {t('reg.form.btnSubmit')}
              </Button>

              <p className="belowFormtext marginT20">
                Already have an account? <Button href="/login">{t('login.form.btnSubmit')}</Button>
              </p>
              <Divider style={{ margin: '5px 0px' }} />
              <p className="belowFormtext">
                By signing up you agree to our <Link to="/terms-of-service">terms of service</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

RegisterFormComponent.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  errors: PropTypes.object,
  values: PropTypes.object,
  t: PropTypes.func
};

const RegisterFormComponentWithFormik = withFormik({
  mapPropsToValues: ({ referredUsername }) => ({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    referredBy: referredUsername || ''
  }),
  validate: values => validate(values, RegisterFormComponentSchema),
  async handleSubmit(
    values,
    {
      setErrors,
      props: { onSubmit }
    }
  ) {
    if (values.referredBy === false) values.referredBy = '';
    onSubmit(values).catch(e => {
      if (isFormError(e)) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  enableReinitialize: true,
  displayName: 'SignUpForm' // helps with React DevTools
});

export default translate('user')(RegisterFormComponentWithFormik(RegisterFormComponent));
