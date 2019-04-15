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
      {/* Gear Category */}
      <Field
        name="gearCategory"
        component={RenderField}
        type="text"
        label={t('listing.field.gearCategory')}
        value={values.gearCategory}
      />

      {/* Gear Sub-Category */}
      <Field
        name="gearSubcategory"
        component={RenderField}
        type="text"
        label={t('listing.field.gearSubcategory')}
        value={values.gearSubcategory}
      />

      {/* Gear description */}
      <Field
        name="description"
        component={RenderField}
        type="text"
        label={t('listing.field.description')}
        value={values.description}
      />

      {/* Listing Status */}
      <Field
        name="status"
        component={RenderSelect}
        type="select"
        label={t('listing.field.status')}
        value={values.status}
      >
        {/* To Do - Find a way to handle these options in a better way (Database or Constants) */}
        <Option value="idle">Idle</Option>
        <Option value="on_rent">On Rent</Option>
        <Option value="on_shelf">On Shelf</Option>
        <Option value="disabled">Disabled</Option>
      </Field>

      {/* Listing Is Active (for not showind anywhere) */}
      <Field
        name="isActive"
        component={RenderCheckBox}
        type="text"
        label={t('listing.field.isActive')}
        checked={values.isActive}
      />

      {/* To Do - Convert Field Array to Field Adaptor */}
      {/* Listing Images */}
      <FieldArray
        name="listingImages"
        label={t('listing.field.listingImages')}
        render={arrayHelpers => (
          <RenderUpload arrayHelpers={arrayHelpers} values={values.listingImages} dictKey="imageUrl" />
        )}
      />

      {/* Listing Detail with Damages*/}
      <Field
        name="listingDetail.condition"
        component={RenderField}
        type="text"
        label={t('listing.field.listingDetail.condition')}
        value={values.listingDetail.condition}
      />
      <Field
        name="listingDetail.repairHistory"
        component={RenderField}
        type="text"
        label={t('listing.field.listingDetail.repairHistory')}
        value={values.listingDetail.repairHistory}
      />
      <Field
        name="listingDetail.age"
        component={RenderField}
        type="text"
        label={t('listing.field.listingDetail.age')}
        value={values.listingDetail.age}
      />
      <FieldArray
        name="listingDetail.damages"
        render={arrayHelpers => (
          <RenderDynamicField
            keys={['imageUrl', 'damageDetail']}
            arrayHelpers={arrayHelpers}
            values={values.listingDetail.damages}
            name="listingDetail.damages"
            label={t('listing.field.listingDamages')}
          />
        )}
      />
      {/* Listing Rental */}
      <Field
        name="listingRental.perDay"
        component={RenderField}
        type="number"
        label={t('listing.field.listingRental.perDay')}
        value={values.listingRental.perDay}
      />
      <Field
        name="listingRental.perWeek"
        component={RenderField}
        type="number"
        label={t('listing.field.listingRental.perWeek')}
        value={values.listingRental.perWeek}
      />
      <Field
        name="listingRental.perMonth"
        component={RenderField}
        type="number"
        label={t('listing.field.listingRental.perMonth')}
        value={values.listingRental.perMonth}
      />
      <Field
        name="listingRental.replacementValue"
        component={RenderField}
        type="number"
        label={t('listing.field.listingRental.replacementValue')}
        value={values.listingRental.replacementValue}
      />

      {/* Listing Content */}
      <FieldArray
        name="listingContent"
        render={arrayHelpers => (
          <RenderDynamicField
            keys={['gear', 'brand', 'model', 'serial']}
            arrayHelpers={arrayHelpers}
            values={values.listingContent}
            name="listingContent"
            label={t('listing.field.listingContent')}
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
