import React, { useState } from "react";
import PropTypes from "prop-types";
import { withFormik } from "formik";
import { translate } from "@gqlapp/i18n-client-react";
import { FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { required, validate } from "@gqlapp/validation-common-react";
import {
  Form,
  Button,
  RenderUpload,
  Alert,
  Loader
} from "@gqlapp/look-client-react";

const PhotoIdFormSchema = {
  photoId: [required]
};

const PhotoIdForm = ({
  values,
  handleSubmit,
  submitting,
  t,
  photoId,
  loading
}) => {
  const [load, setload] = useState(false);
  // console.log("values", values);
  // console.log("photoId", photoId);
  return (
    <>
      <div>
        {photoId && photoId.error ? (
          <div>
            <Alert message={photoId.error} type="error" className="marginB15" />
            <br />
          </div>
        ) : photoId && photoId.image ? (
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
        {(!photoId && values.photoId) ||
        !values.photoId ||
        (photoId && photoId.image != values.photoId) ? (
          <strong>
            Upload a recent Selfie or Photo of yours with a Govt. ID for
            verification:
            <br />
          </strong>
        ) : null}

        {loading ? <Loader text="Loading..." /> : ""}
        <Form name="photoId" onSubmit={handleSubmit}>
          <Field
            name="photoId"
            component={RenderUpload}
            type="text"
            setload={setload}
            label={null}
            value={values.photoId}
          />
          {(!photoId && values.photoId) ||
          !values.photoId ||
          (photoId && photoId.image != values.photoId) ? (
            <Button
              color="primary"
              block
              type="submit"
              disabled={submitting || !values.photoId || load || loading}
            >
              {photoId && photoId.isVerified ? "Change" : "Submit"}
            </Button>
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
  mapPropsToValues: ({ photoId }) => ({
    photoId: photoId && photoId.image
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
