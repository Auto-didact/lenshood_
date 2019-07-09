import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { translate } from '@gqlapp/i18n-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, email, validate } from '@gqlapp/validation-common-react';
import { Form, RenderField, Button } from '@gqlapp/look-client-react';

const EmailFormSchema = {
  email: [required, email]
};

const EmailForm = ({ values, handleSubmit, submitting, t }) => {
  return (
    <Form name="email" onSubmit={handleSubmit}>
      <Field name="email" component={RenderField} type="email" label={t('email.field.email')} value={values.email} />
      <Button color="primary" type="submit" disabled={submitting}>
        {t('email.btn.submit')}
      </Button>
    </Form>
  );
};

EmailForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  values: PropTypes.object,
  email: PropTypes.object,
  t: PropTypes.func
};

const EmailFormWithFormik = withFormik({
  mapPropsToValues: props => ({
    email: props.email && props.email
  }),
  validate: values => validate(values, EmailFormSchema),
  handleSubmit(
    values,
    {
      props: { onSubmit }
    }
  ) {
    onSubmit(values);
  },
  enableReinitialize: true,
  displayName: 'EmailForm' // helps with React DevTools
});

export default translate('user')(EmailFormWithFormik(EmailForm));
