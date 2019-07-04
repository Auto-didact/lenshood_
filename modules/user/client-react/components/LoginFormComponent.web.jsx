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
import { camera1, camera2 } from "../constants/DefaultImages";

import settings from "../../../../settings";

const LoginFormComponentSchema = {
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

const LoginFormComponent = ({
  handleSubmit,
  submitting,
  errors,
  values,
  t
}) => {
  // const buttonsLength = [facebook.enabled, google.enabled].filter(
  //   button => button
  // ).length;
  return (
    <div className="signInoOuter">
      <Card
        className="modalcard"
        bodyStyle={{ borderRadius: "0px", padding: "0px", margin: "0px" }}
      >
        <Row className="SignInComp">
          <Col sm={0} xs={0} md={8} align="left" style={{ overflow: "hidden" }}>
            <img src={camera1} alt="" className="signInimg" />
          </Col>
          <Col sm={24} xs={24} md={0}>
            <img src={camera2} alt="" className="signImg" />
          </Col>
          <Col md={16} sm={15} xs={24} className="sign-in-Form">
            <h1 className="signinstate">Let's Go...</h1>
            <Row>
              <Col xs={24} sm={12}>
                {facebook.enabled && (
                  <div style={{ margin: "2px" }}>
                    <FacebookButton text={t("login.fbBtn")} type={"button"} />
                  </div>
                )}
              </Col>
              <Col xs={24} sm={12}>
                {google.enabled && (
                  <div style={{ margin: "2px" }}>
                    <GoogleButton text={t("login.googleBtn")} type={"button"} />
                  </div>
                )}
              </Col>
            </Row>
            <Divider style={{ marginBottom: "10px" }} />

            <h2 className="form-element-heading">Or you can always...</h2>
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
              <Divider style={{ margin: "5px 0px" }} />
              <div className="text-center">
                {errors && errors.errorMsg && (
                  <Alert color="error">{errors.errorMsg}</Alert>
                )}
              </div>
              <Button color="primary" block type="submit" disabled={submitting}>
                {t("login.form.btnSubmit")}
              </Button>

              <p className="belowFormtext  marginT20">
                New to LensHood?{" "}
                <Button href="/register">{t("login.btn.sign")}</Button>
              </p>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

LoginFormComponent.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  errors: PropTypes.object,
  values: PropTypes.object,
  t: PropTypes.func
};

const LoginFormComponentWithFormik = withFormik({
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
  validate: values => validate(values, LoginFormComponentSchema),
  displayName: "LoginFormComponent" // helps with React DevTools
});

export default translate("user")(
  LoginFormComponentWithFormik(LoginFormComponent)
);
