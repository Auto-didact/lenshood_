import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { translate } from '@gqlapp/i18n-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import { Form, RenderField, Button } from '@gqlapp/look-client-react';

const listingFormSchema = {
  gearCategory: [required],
  gearSubcategory: [required],
  description: [required]
};

const ListingForm = ({ values, handleSubmit, submitting, t }) => {
  return (
    <Form name="listing" onSubmit={handleSubmit}>
      <Field
        name="gearCategory"
        component={RenderField}
        type="text"
        label={t('listing.field.gearCategory')}
        value={values.gearCategory}
      />
      <Field
        name="gearSubcategory"
        component={RenderField}
        type="text"
        label={t('listing.field.gearSubcategory')}
        value={values.gearSubcategory}
      />
      <Field
        name="description"
        component={RenderField}
        type="text"
        label={t('listing.field.description')}
        value={values.description}
      />
      <Button color="primary" type="submit" disabled={submitting}>
        {t('listing.btn.submit')}
      </Button>
    </Form>
  );
};

ListingForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  values: PropTypes.object,
  listing: PropTypes.object,
  t: PropTypes.func
};

const ListingFormWithFormik = withFormik({
  mapPropsToValues: props => ({
    gearCategory: props.listing && props.listing.gearCategory,
    gearSubcategory: props.listing && props.listing.gearSubcategory,
    description: props.listing && props.listing.description
  }),
  validate: values => validate(values, listingFormSchema),
  handleSubmit(
    values,
    {
      props: { onSubmit }
    }
  ) {
    onSubmit(values);
  },
  enableReinitialize: true,
  displayName: 'ListingForm' // helps with React DevTools
});

export default translate('listing')(ListingFormWithFormik(ListingForm));
