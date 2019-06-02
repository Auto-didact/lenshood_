import React from "react";
import PropTypes from "prop-types";
import { withFormik } from "formik";
import { isFormError, FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { NavLink, Link } from "react-router-dom";
import { translate } from "@gqlapp/i18n-client-react";

import {
  match,
  email,
  minLength,
  required,
  validate
} from "@gqlapp/validation-common-react";
import { Form, RenderField, Button, Alert } from "@gqlapp/look-client-react";
import {
  // LinkedInButton,
  GoogleButton,
  // GitHubButton,
  FacebookButton
} from "@gqlapp/authentication-client-react";

import { Divider, Row, Col, Card, Modal } from "antd";
import camera from "../resources/camera.jpg";

import settings from "../../../../settings";

const registerFormSchema = {
  username: [required, minLength(3)],
  email: [required, email],
  password: [required, minLength(settings.auth.password.minLength)],
  passwordConfirmation: [
    match("password"),
    required,
    minLength(settings.auth.password.minLength)
  ]
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

const RegisterForm = ({ values, handleSubmit, submitting, errors, t }) => {
  return (
    <Modal
      centered
      width={700}
      bodyStyle={{ padding: "0" }}
      visible={true}
      footer={null}
      closable={false}
      // onCancel={() => this.setModal1Visible(false)}
    >
      <Row>
        <Col sm={8} xs={0}>
          <img src={camera} alt="" className="signupImg" />
        </Col>
        <Col sm={0} xs={24}>
          <img src={camera} alt="" className="signImg" />
        </Col>
        <Col sm={16} xs={24}>
          <Card className="modalcard">
          <h1 className="signinstate">Sign up...</h1>
            <Row>
              <Col span={24}>
                {facebook.enabled && (
                  <div className="text-center">
                    <FacebookButton text={t("login.fbBtn")} type={"button"} />
                  </div>
                )}
              </Col>
              <Col span={24}>
                {google.enabled && (
                  <div className="text-center">
                    <GoogleButton text={t("login.googleBtn")} type={"button"} />
                  </div>
                )}
              </Col>
            </Row>
            <h2 className="youcanAlways">Or you can always...</h2>
            {/* <p className="signInForm">Let me help you sign up</p> */}
            <Form
              className="paddingMarginBottom"
              name="register"
              onSubmit={handleSubmit}
            >
              <Field
                name="username"
                component={RenderField}
                type="text"
                placeholder={t("reg.form.field.name")}
                value={values.username}
              />
              <Field
                name="email"
                component={RenderField}
                type="text"
                placeholder={t("reg.form.field.email")}
                value={values.email}
              />

              <Field
                name="password"
                component={RenderField}
                type="password"
                placeholder={t("reg.form.field.pass")}
                value={values.password}
              />
              <Field
                name="passwordConfirmation"
                component={RenderField}
                type="password"
                placeholder={t("reg.form.field.passConf")}
                value={values.passwordConfirmation}
              />
              <div className="text-center">
                {errors && errors.errorMsg && (
                  <Alert color="error">{errors.errorMsg}</Alert>
                )}
              </div>
              <Button
                className="themeColor"
                block
                type="submit"
                disabled={submitting}
              >
                {t("reg.form.btnSubmit")}
              </Button>
              <p className="belowFormtext marginT20">
                Already have an account?{" "}
                <NavLink to="/login">{t("login.form.btnSubmit")}</NavLink>
              </p>
              <hr></hr>
              <p className="belowFormtext">
                By signing up you agree to our{" "}
                <NavLink to="/terms-of-service">terms of service</NavLink>
              </p>
            </Form>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  errors: PropTypes.object,
  values: PropTypes.object,
  t: PropTypes.func
};

const RegisterFormWithFormik = withFormik({
  mapPropsToValues: () => ({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  }),
  validate: values => validate(values, registerFormSchema),
  async handleSubmit(
    values,
    {
      setErrors,
      props: { onSubmit }
    }
  ) {
    onSubmit(values).catch(e => {
      if (isFormError(e)) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  enableReinitialize: true,
  displayName: "SignUpForm" // helps with React DevTools
});

export default translate("user")(RegisterFormWithFormik(RegisterForm));
