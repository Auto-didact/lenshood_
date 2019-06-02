import React from "react";
import PropTypes from "prop-types";
import { withFormik } from "formik";
import { NavLink, Link } from "react-router-dom";
import { isFormError, FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { translate } from "@gqlapp/i18n-client-react";
import { required, minLength, validate } from "@gqlapp/validation-common-react";
import { Form, RenderField, Alert, Button } from "@gqlapp/look-client-react";
import {
  // LinkedInButton,
  GoogleButton,
  // GitHubButton,
  FacebookButton
} from "@gqlapp/authentication-client-react";
import { Divider, Row, Col, Card, Modal } from "antd";
import camera from "../resources/camera.jpg";

import settings from "../../../../settings";

const loginFormSchema = {
  usernameOrEmail: [required, minLength(3)],
  password: [required, minLength(8)]
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

const LoginForm = ({ handleSubmit, submitting, errors, values, t }) => {
  // const buttonsLength = [facebook.enabled, google.enabled].filter(
  //   button => button
  // ).length;
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
          <img src={camera} alt="" className="signInimg" />
        </Col>
        <Col sm={0} xs={24}>
          <img src={camera} alt="" className="signImg" />
        </Col>
        <Col sm={16} xs={24}>
          <Card className="modalcard">
            <h1 className="signinstate">Let's Go...</h1>
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
            {/* <p className="signInForm">Let me help you sign in</p> */}
            <Form
              className="paddingMarginBottom"
              name="login"
              onSubmit={handleSubmit}
            >
              <div>
                <Field
                  name="usernameOrEmail"
                  component={RenderField}
                  type="text"
                  placeholder={t("login.form.field.usernameOrEmail")}
                  value={values.usernameOrEmail}
                />
              </div>
              {/* <div className="paddingMarginBottom"> */}
              <Field
                name="password"
                component={RenderField}
                type="password"
                placeholder={t("login.form.field.pass")}
                // label={t("login.form.field.pass")}
                value={values.password}
              />
              <Link className="forgotpass" to="/forgot-password">
                {t("login.btn.forgotPass")}
              </Link>
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
                {t("login.form.btnSubmit")}
              </Button>
              <p className="belowFormtext marginT20">
                New to LensHood?{" "}
                <NavLink to="/register">{t("login.btn.sign")}</NavLink>
              </p>
            </Form>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  errors: PropTypes.object,
  values: PropTypes.object,
  t: PropTypes.func
};

const LoginFormWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({ usernameOrEmail: "", password: "" }),

  handleSubmit(
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
  validate: values => validate(values, loginFormSchema),
  displayName: "LoginForm" // helps with React DevTools
});

export default translate("user")(LoginFormWithFormik(LoginForm));
