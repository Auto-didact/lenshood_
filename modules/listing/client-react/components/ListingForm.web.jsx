import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, FieldArray } from 'formik';
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
  RenderDynamicField,
  RenderCheckBox
} from '@gqlapp/look-client-react';

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
        name="isActive"
        component={RenderCheckBox}
        type="text"
        label={t('listing.field.isActive')}
        value={values.isActive}
      />

      {/* <Field
        name="listingImages"
        component={RenderUpload}
        label={t('listing.field.imagesUpload')}
        defaultFileList={listingImagesList}
        value="values.listingImages"
      /> */}
      <FieldArray
        name="listingImages"
        label={t('listing.field.listingImages')}
        render={arrayHelpers => (
          <RenderUpload arrayHelpers={arrayHelpers} values={values.listingImages} dictKey="imageUrl" />
        )}
      />

      {/* <Field
        name="listingContent"
        component={RenderDynamicField}
        label={t('listing.field.listingContent')}
        values={values.listingContent}
        keys={['gear', 'brand', 'model', 'serial']}
      /> */}
      <FieldArray
        name="listingContent"
        label={t('listing.field.listingContent')}
        render={arrayHelpers => (
          <RenderDynamicField
            keys={['gear', 'brand', 'model', 'serial']}
            arrayHelpers={arrayHelpers}
            values={values.listingContent}
            name="listingContent"
          />
        )}
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
    isActive: (props.listing && props.listing.isActive) || false,
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
    // onSubmit(values);
    console.log(values);
  },
  enableReinitialize: true,
  displayName: 'ListingForm' // helps with React DevTools
});

export default translate('listing')(ListingFormWithFormik(ListingForm));
