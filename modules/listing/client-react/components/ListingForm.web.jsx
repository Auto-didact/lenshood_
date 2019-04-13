import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { translate } from '@gqlapp/i18n-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import {
  Form,
  RenderField,
  RenderSelect,
  Option,
  Button,
  RenderUpload,
  RenderDynamicField
} from '@gqlapp/look-client-react';

const listingFormSchema = {
  gearCategory: [required],
  gearSubcategory: [required],
  description: [required]
};

const ListingForm = ({ values, handleSubmit, submitting, t }) => {
  let listingImagesList = [];
  if (values.listingImages) {
    listingImagesList = values.listingImages.map(img => ({
      uid: img.id,
      name: img.id,
      status: 'done',
      url: img.imageUrl,
      thumbUrl: img.imageUrl
    }));
  }
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
      <Field
        name="status"
        component={RenderSelect}
        type="select"
        label={t('listing.field.status')}
        value={values.status}
      >
        <Option value="idle">{t('listing.form.field.status.idle')}</Option>
        <Option value="on_rent">{t('listing.form.field.status.on_rent')}</Option>
        <Option value="on_shelf">{t('listing.form.field.status.on_shelf')}</Option>
      </Field>

      <Field
        name="imagesUpload"
        component={RenderUpload}
        type="text"
        label={t('listing.field.imagesUpload')}
        defaultFileList={listingImagesList}
      />
      <Field
        name="description"
        component={RenderDynamicField}
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
    description: props.listing && props.listing.description,
    status: (props.listing && props.listing.status) || 'idle',
    listingImages: props.listing && props.listing.listingImages,
    listingDetail: props.listing && props.listing.listingDetail,
    listingRental: props.listing && props.listing.listingRental,
    listingContent: props.listing && props.listing.listingContent
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
