import React, { useState } from "react";
import PropTypes from "prop-types";
import { withFormik } from "formik";
import { translate } from "@gqlapp/i18n-client-react";
import { FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { required, validate } from "@gqlapp/validation-common-react";
import { Form, Button, RenderUpload, Alert } from "@gqlapp/look-client-react";

const PhotoIdFormSchema = {
  photoId: [required]
};

const PhotoIdForm = ({ values, handleSubmit, submitting, t, photoId }) => {
  const [load, setload] = useState(false);
  console.log("values", values);
  return (
    <>
      <div>
        {photoId.image ? (
          <div>
            {photoId.isVerified ? (
              <Alert
                message="Document verified."
                type="success"
                className="marginB15"
              />
            ) : (
              <Alert
                message="Verification of your document is under process..."
                type="success"
                className="marginB15"
              />
            )}
            <br />
          </div>
        ) : null}
      </div>
      <div className="userForm">
        {!photoId.image || !values.photoId ? (
          <strong>
            Upload a recent Selfie or Photo of yours with a Govt. ID for
            verification:
            <br />
          </strong>
        ) : null}
        <Form name="photoId" onSubmit={handleSubmit}>
          <Field
            name="photoId"
            component={RenderUpload}
            type="text"
            setload={setload}
            label={null}
            value={values.photoId}
          />
          {console.log("Images values", photoId.image, values.photoId)}
          {!photoId.image ||
          !values.photoId ||
          photoId.image != values.photoId ? (
            load ? (
              <Button color="primary" block type="submit" disabled>
                {photoId.isVerified ? "Change" : "Submit"}
              </Button>
            ) : (
              <Button
                color="primary"
                block
                type="submit"
                disabled={submitting || !values.photoId}
              >
                {photoId.isVerified ? "Change" : "Submit"}
              </Button>
            )
          ) : null}
        </Form>
      </div>
    </>
  );
};

PhotoIdForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  values: PropTypes.object,
  photoId: PropTypes.object,
  t: PropTypes.func
};

const PhotoIdFormWithFormik = withFormik({
  mapPropsToValues: props => ({
    photoId: props.photoId.image
  }),
  validate: values => validate(values, PhotoIdFormSchema),
  handleSubmit(
    values,
    {
      props: { onSubmit }
    }
  ) {
    onSubmit(values.photoId);
  },
  enableReinitialize: true,
  displayName: "photoIdForm" // helps with React DevTools
});

export default translate("user")(PhotoIdFormWithFormik(PhotoIdForm));
