import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { translate } from '@gqlapp/i18n-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import { Form, RenderField, RenderDatePicker, Button } from '@gqlapp/look-client-react';

var moment = require('moment');

const DLFormSchema = {
  dlId: [required],
  dob: [required]
};

const DLForm = ({ values, handleSubmit, submitting, t }) => {
  return (
    <Form name="DL" onSubmit={handleSubmit}>
      <Field name="dlId" component={RenderField} type="text" label={t('DL.field.dlId')} value={values.dlId} />
      <Field
        name="dob"
        component={RenderDatePicker}
        type="text"
        label={t('DL.field.dob')}
        value={values.dob ? moment(values.dob, 'DD/MM/YYYY') : null}
      />
      <Button color="primary" type="submit" disabled={submitting}>
        {t('DL.btn.submit')}
      </Button>
    </Form>
  );
};

DLForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  values: PropTypes.object,
  DL: PropTypes.object,
  t: PropTypes.func
};

const DLFormWithFormik = withFormik({
  mapPropsToValues: props => ({
    dlId: props.DL && props.DL.dlId,
    dob: props.DL && props.DL.dob
  }),
  validate: values => validate(values, DLFormSchema),
  handleSubmit(
    values,
    {
      props: { onSubmit }
    }
  ) {
    onSubmit(values);
  },
  enableReinitialize: true,
  displayName: 'DLForm' // helps with React DevTools
});

export default translate('user')(DLFormWithFormik(DLForm));
