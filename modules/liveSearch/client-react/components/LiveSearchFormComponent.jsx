import React from "react";
import PropTypes from "prop-types";
import { withFormik } from "formik";
import { isFormError, FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { translate } from "@gqlapp/i18n-client-react";
import { required, validate } from "@gqlapp/validation-common-react";
import {
  Form,
  RenderField,
  RenderSelect,
  Option,
  Button,
  Alert
} from "@gqlapp/look-client-react";

const LiveSearchFormComponentSchema = {
  gearCategory: [required],
  queryItem: [required]
};

const activeGearCategory = [
  "Cameras",
  "Lenses",
  "Tripods and Support",
  "Lighting",
  "Studio Space"
];

const LiveSearchFormComponent = ({ values, handleSubmit, errors, t }) => {
  return (
    <Form name="searchItem" onSubmit={handleSubmit}>
      <Field
        name="queryItem"
        component={RenderField}
        type="text"
        label="Name of th item"
        value={values.queryItem}
      />
      <Field
        name="gearCategory"
        component={RenderSelect}
        label="Gear Category"
        value={values.gearCategory}
      >
        {activeGearCategory.map((item, key) => (
          <Option key={key} value={item}>
            {item}
          </Option>
        ))}
      </Field>
      {errors && errors.errorMsg && (
        <Alert color="error">{errors.errorMsg}</Alert>
      )}
      <div className="width100">
        <Button color="primary" className="rightfloat" type="submit" size="sm">
          Submit
        </Button>
      </div>
    </Form>
  );
};
LiveSearchFormComponent.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  values: PropTypes.object,
  errors: PropTypes.object,
  t: PropTypes.func
};
const LiveSearchFormWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({ gearCategory: "", queryItem: "" }),
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
  validate: values => validate(values, LiveSearchFormComponentSchema),
  displayName: "LiveSearchForm " // helps with React DevTools
});

export default translate("liveSearch")(
  LiveSearchFormWithFormik(LiveSearchFormComponent)
);
