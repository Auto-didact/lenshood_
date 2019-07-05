import React from "react";
import PropTypes from "prop-types";
import { withFormik, FieldArray } from "formik";
import { isEmpty } from "lodash";
import { isFormError, FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { translate } from "@gqlapp/i18n-client-react";
import {
  email,
  minLength,
  required,
  match,
  validate
} from "@gqlapp/validation-common-react";
import {
  Form,
  RenderField,
  RenderSelect,
  RenderUpload,
  RenderCheckBox,
  RenderDynamicField,
  Option,
  Button,
  Alert
} from "@gqlapp/look-client-react";

import RenderAddress from "./RenderAddress";

import settings from "../../../../settings";
import "./styling.css";

const userFormSchema = {
  username: [required, minLength(3)],
  email: [required, email]
};

const createUserFormSchema = {
  ...userFormSchema,
  password: [required, minLength(settings.auth.password.minLength)],
  passwordConfirmation: [
    required,
    match("password"),
    minLength(settings.auth.password.minLength)
  ]
};

const isAdminFunction = role => {
  if (role === "admin") {
    return true;
  } else {
    return false;
  }
};

const updateUserFormSchema = {
  ...userFormSchema,
  password: minLength(settings.auth.password.minLength),
  passwordConfirmation: [
    match("password"),
    minLength(settings.auth.password.minLength)
  ]
};

const UserForm = ({
  values,
  handleSubmit,
  errors,
  setFieldValue,
  t,
  // shouldDisplayRole,
  // shouldDisplayActive,
  LYGflag,
  valueCheck
}) => {
  const {
    userRole,
    username,
    email,
    role,
    isActive,
    profile,
    auth,
    password,
    passwordConfirmation,
    addresses,
    portfolios
  } = values;
  const isAdmin = isAdminFunction(userRole);
  return (
    <Form name="user" onSubmit={handleSubmit}>
      {/*-----------Avatar-------------------*/}
      {LYGflag == false || !valueCheck.avatar ? (
        <>
          <Field
            name="profile.avatar"
            component={RenderUpload}
            type="text"
            label={t("userEdit.form.field.avatar")}
            value={profile.avatar}
          />
        </>
      ) : null}

      {/*----------Personal Information-----------*/}
      <h1 className="heading vgap">Personal</h1>

      <div className="row">
        {LYGflag == false || !valueCheck.firstName ? (
          <>
            <Field
              name="profile.firstName"
              component={RenderField}
              type="text"
              label={t("userEdit.form.field.firstName")}
              value={profile.firstName}
            />
          </>
        ) : null}
        {LYGflag == false || !valueCheck.lastName ? (
          <>
            <Field
              name="profile.lastName"
              component={RenderField}
              type="text"
              label={t("userEdit.form.field.lastName")}
              value={profile.lastName}
            />
          </>
        ) : null}
      </div>

      {LYGflag == false || !valueCheck.about ? (
        <div className="about">
          <Field
            name="profile.about"
            component={RenderField}
            type="textarea"
            label={t("userEdit.form.field.about")}
            value={profile.about}
          />
        </div>
      ) : null}

      {LYGflag == false ? (
        <div className="g4 about">
          <FieldArray
            name="portfolios"
            render={arrayHelpers => (
              <RenderDynamicField
                keys={[
                  { key: "platform", type: "text" },
                  { key: "portfolioUrl", type: "text" }
                ]}
                buttonText="Add Portfolio"
                style={{ width: "40% !important" }}
                arrayHelpers={arrayHelpers}
                values={portfolios}
                name="portfolios"
                label={t("userEdit.form.field.portfolios")}
              />
            )}
          />
        </div>
      ) : null}

      {LYGflag == false ? (
        <div className="row">
          {isAdmin && (
            <Field
              name="role"
              component={RenderSelect}
              label={t("userEdit.form.field.role.label")}
              value={role}
            >
              <Option value="user">{t("userEdit.form.field.role.user")}</Option>
              <Option value="admin">
                {t("userEdit.form.field.role.admin")}
              </Option>
            </Field>
          )}
          {isAdmin && (
            <Field
              name="profile.flag"
              component={RenderField}
              type="text"
              label={t("userEdit.form.field.flag")}
              value={profile.flag}
            />
          )}
        </div>
      ) : null}

      <div className="row">
        {LYGflag == false ? (
          <>
            <Field
              name="profile.designation"
              component={RenderField}
              type="text"
              label={t("userEdit.form.field.designation")}
              value={profile.designation}
            />
          </>
        ) : null}
        {LYGflag == false ? (
          <>
            {isAdmin && (
              <Field
                name="profile.rating"
                component={RenderField}
                type="text"
                label={t("userEdit.form.field.rating")}
                value={profile.rating}
              />
            )}
          </>
        ) : null}
      </div>
      {/*---------------Personal Information Ends Here---------------*/}

      {/*---------------Account Information Begin Here---------------*/}

      <h1 className="heading vgap">Account</h1>

      {LYGflag == false ? (
        <div className="about">
          <Field
            name="username"
            component={RenderField}
            type="text"
            label={t("userEdit.form.field.name")}
            value={username}
          />
          <Field
            name="email"
            component={RenderField}
            type="email"
            label={t("userEdit.form.field.email")}
            value={email}
          />
        </div>
      ) : null}

      {/*------------Account Info End here-------------------------*/}
      {/*-----------------For Admin---------------------*/}
      {isAdmin && <h1 className="heading vgap">**For Admin</h1>}

      {LYGflag == false ? (
        <div className="about">
          {isAdmin && (
            <div>
              <Field
                name="password"
                component={RenderField}
                type="password"
                label={t("userEdit.form.field.pass")}
                value={password}
              />
              <Field
                name="passwordConfirmation"
                component={RenderField}
                type="password"
                label={t("userEdit.form.field.passConf")}
                value={passwordConfirmation}
              />
              <div className="mobile">
                <Field
                  name="profile.mobile"
                  component={RenderField}
                  type="text"
                  label={t("userEdit.form.field.mobile")}
                  value={profile.mobile}
                />
              </div>
            </div>
          )}
        </div>
      ) : null}
      {/*-------------For Admin Ends Here---------------------*/}
      {/*---------------Contact Starts------------------------*/}
      <h1 className="heading vgap">Contact</h1>

      <div className="g3 about">
        <FieldArray
          name="addresses"
          render={arrayHelpers => (
            <RenderDynamicField
              keys={[
                { key: "streetAddress1", type: "text" },
                { key: "streetAddress2", type: "text" },
                { key: "city", type: "text" },
                { key: "state", type: "text" },
                { key: "pinCode", type: "text" }
              ]}
              buttonText="Add Address"
              style={{ width: "40%" }}
              arrayHelpers={arrayHelpers}
              values={addresses}
              name="addresses"
              label={t("userEdit.form.field.addresses")}
            />
          )}
        />
      </div>

      {LYGflag == false ? (
        <>
          <div className="row3">
            <Field
              name="profile.website"
              component={RenderField}
              type="text"
              label={t("userEdit.form.field.website")}
              value={profile.website}
            />

            <Field
              name="profile.isAvailable"
              component={RenderCheckBox}
              type="checkbox"
              label={t("userEdit.form.field.available")}
              checked={profile.isAvailable}
            />
          </div>
          <div className="row2">
            {isAdmin && (
              <Field
                name="isActive"
                component={RenderCheckBox}
                type="checkbox"
                label={t("userEdit.form.field.active")}
                checked={isActive}
              />
            )}

            {isAdmin && (
              <Field
                name="profile.isVerified"
                component={RenderCheckBox}
                type="checkbox"
                label={t("userEdit.form.field.isverified")}
                checked={profile.isVerified}
              />
            )}
          </div>
        </>
      ) : null}

      <div className="g4 save">
        {LYGflag == false ? (
          <>
            {settings.auth.certificate.enabled && (
              <Field
                name="serial"
                component={RenderField}
                type="text"
                label={t("userEdit.form.field.serial")}
                value={auth && auth.certificate && auth.certificate.serial}
                onChange={value =>
                  setFieldValue("auth", {
                    ...auth,
                    certificate: { ...auth.certificate, serial: value }
                  })
                }
              />
            )}
          </>
        ) : null}
        {errors && errors.errorMsg && (
          <Alert color="error">{errors.errorMsg}</Alert>
        )}
        <Button color="primary" type="submit">
          {t("userEdit.form.btnSubmit")}
        </Button>
      </div>
    </Form>
  );
};
UserForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  onSubmit: PropTypes.func,
  setTouched: PropTypes.func,
  isValid: PropTypes.bool,
  LYGflag: PropTypes.bool,
  shouldDisplayRole: PropTypes.bool,
  shouldDisplayActive: PropTypes.bool,
  values: PropTypes.object,
  errors: PropTypes.object,
  initialValues: PropTypes.object.isRequired,
  touched: PropTypes.object,
  valueCheck: PropTypes.object,
  t: PropTypes.func
};
const UserFormWithFormik = withFormik({
  mapPropsToValues: values => {
    const {
      username,
      email,
      role,
      isActive,
      profile,
      addresses,
      portfolios
    } = values.initialValues;

    const userRole = values.userRole;
    function getAddresses(address) {
      return {
        streetAddress1: address.streetAddress1,
        streetAddress2: address.streetAddress2,
        city: address.city,
        state: address.state,
        pinCode: address.pinCode
      };
    }
    function getPortfolios(portfolio) {
      return {
        platform: portfolio.platform,
        portfolioUrl: portfolio.portfolioUrl
      };
    }
    return {
      userRole: userRole,
      username: username,
      email: email,
      role: role || "user",
      isActive: isActive,
      password: "",
      passwordConfirmation: "",
      profile: {
        firstName: profile && profile.firstName,
        lastName: profile && profile.lastName,
        about: profile && profile.about,
        designation: profile && profile.designation,
        mobile: profile && profile.mobile,
        avatar: profile && profile.avatar,
        flag: profile && profile.flag,
        isAvailable: profile && profile.isAvailable,
        isVerified: profile && profile.isVerified,
        rating: profile && profile.rating,
        website: profile && profile.website
      },
      addresses:
        addresses && addresses.length !== 0 ? addresses.map(getAddresses) : [],
      portfolios:
        portfolios && portfolios.length !== 0
          ? portfolios.map(getPortfolios)
          : [],
      auth: {
        ...values.initialValues.auth
      }
    };
  },
  async handleSubmit(
    values,
    {
      setErrors,
      props: { onSubmit }
    }
  ) {
    await onSubmit(values).catch(e => {
      if (isFormError(e)) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  displayName: "SignUpForm ", // helps with React DevTools
  validate: (values, props) =>
    validate(
      values,
      isEmpty(props.initialValues) ? createUserFormSchema : updateUserFormSchema
    )
});

export default translate("user")(UserFormWithFormik(UserForm));
