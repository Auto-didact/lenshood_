import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { FieldArray } from 'formik';
import {
  RenderField,
  RenderSelect,
  Option,
  RenderUpload,
  RenderDynamicField,
  RenderCheckBox
} from '@gqlapp/look-client-react';

export default class ProductDetails extends Component {
  render() {
    const values = this.props.values;
    const t = this.props.t;
    return (
      <>
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
      </>
    );
  }
}

ProductDetails.propTypes = {
  values: PropTypes.object,
  t: PropTypes.func
};
