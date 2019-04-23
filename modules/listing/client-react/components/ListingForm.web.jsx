import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { translate } from '@gqlapp/i18n-client-react';
import { required, validate } from '@gqlapp/validation-common-react';

import { Form, Button } from '@gqlapp/look-client-react';

import ProductDetails from './components/ListingForm/ProductDetails';
import RentalDetails from './components/ListingForm/RentalDetails';

const listingFormSchema = {
  gearCategory: [required],
  gearSubcategory: [required],
  description: [required]
};

const ListingForm = ({ values, handleSubmit, submitting, t }) => {
  return (
    <Form name="listing" onSubmit={handleSubmit}>
      <ProductDetails values={values} t={t} />
      <RentalDetails values={values} t={t} />

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
    description: props.listing && props.listing.description,
    status: (props.listing && props.listing.status) || 'idle',
    isActive: (props.listing && props.listing.isActive) || false,
    listingImages: props.listing && props.listing.listingImages,
    listingDetail: (props.listing && props.listing.listingDetail) || {},
    listingRental: (props.listing && props.listing.listingRental) || {},
    listingContent: (props.listing && props.listing.listingContent) || []
  }),
  validate: values => validate(values, listingFormSchema),
  handleSubmit(
    values,
    {
      props: { onSubmit }
    }
  ) {
    // console.log(values);
    onSubmit(values);
  },
  enableReinitialize: true,
  displayName: 'ListingForm' // helps with React DevTools
});

export default translate('listing')(ListingFormWithFormik(ListingForm));
