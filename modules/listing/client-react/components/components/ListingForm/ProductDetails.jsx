import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { FieldArray } from 'formik';
import {
  RenderField,
  RenderSelect,
  // Option,
  RenderUploadMultiple,
  RenderDynamicField,
  RenderCheckBox,
  RenderRadioGroup
} from '@gqlapp/look-client-react';

// Abstract Radio Button out To Do
import { Radio, Select } from 'antd';

const RadioButton = Radio.Button;

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* To Do - Find a way to handle these options in a better way (Database or Constants) */
      listingCategories: [
        {
          gearCategory: 'Cameras',
          gearSubcategories: [
            'DSLR',
            'SLR',
            'Mirrorless Camera',
            'Point & Shoot Camera',
            'Video Camera',
            'Cinema Camera',
            'Go Pro & Headcam',
            'Other'
          ],
          components: ['Body', 'Lens', 'Memory Card', 'Battery', 'Battery Charger']
        },
        {
          gearCategory: 'Lenses',
          gearSubcategories: [
            'DSLR Lens',
            'Prime Lens',
            'Mirrorless Lense',
            'Cinema Lens',
            'Lens Accessories',
            'Other Lenses'
          ],
          components: ['Lens']
        }
      ],
      status: ['Idle', 'On Rent', 'On Shelf', 'Disabled'],
      activeGearSubcategories: null,
      activeComponents: null,

      listingCondition: ['New', 'Good', 'Fair'],
      listingAge: ['< 1 year', '1 - 2 years', '> 3 years'],

      isAdmin: false
    };
    this.handleGearCategoryChange = this.handleGearCategoryChange.bind(this);
  }

  handleGearCategoryChange = value => {
    const activeCategory = this.state.listingCategories.filter(category => {
      return category.gearCategory == value;
    });
    const gearSubcategories = activeCategory[0].gearSubcategories;
    console.log(gearSubcategories);
    this.setState({ activeGearSubcategories: gearSubcategories });
  };

  // To Do Create a function to render options
  // renderOptions = values => {
  //   const options = values.map((value, idx) => (
  //     <Option key={idx} value={value}>
  //       {value}
  //     </Option>
  //   ));

  //   return <>{options}</>;
  // };

  render() {
    const values = this.props.values;
    const t = this.props.t;
    return (
      <>
        {/* Gear Category */}
        <Field
          name="gearCategory"
          component={RenderSelect}
          type="text"
          label={t('listing.field.gearCategory')}
          value={values.gearCategory}
          onChange={this.handleGearCategoryChange}
        >
          {this.state.listingCategories.map((category, idx) => (
            <Select.Option key={idx} value={category.gearCategory}>
              {category.gearCategory}
            </Select.Option>
          ))}
        </Field>

        {/* Gear Sub-Category */}
        {this.state.activeGearSubcategories ? (
          <Field
            name="gearSubcategory"
            component={RenderSelect}
            type="text"
            label={t('listing.field.gearSubcategory')}
            value={values.gearSubcategory}
          >
            {this.state.activeGearSubcategories.map((category, idx) => (
              <Select.Option key={idx} value={category}>
                {category}
              </Select.Option>
            ))}
          </Field>
        ) : null}

        {/* Listing Status */}
        {this.state.isAdmin ? (
          <Field
            name="status"
            component={RenderSelect}
            type="select"
            label={t('listing.field.status')}
            value={values.status}
          >
            {this.state.status.map((status, idx) => (
              <Select.Option key={idx} value={status}>
                {status}
              </Select.Option>
            ))}
          </Field>
        ) : null}

        {/* Listing Is Active (for not showind anywhere) */}
        {this.state.isAdmin ? (
          <Field
            name="isActive"
            component={RenderCheckBox}
            label={t('listing.field.isActive')}
            checked={values.isActive}
          />
        ) : null}

        {/* Listing Content */}
        <FieldArray
          name="listingContent"
          render={arrayHelpers => (
            <RenderDynamicField
              keys={[
                { key: 'gear', type: 'text' },
                { key: 'brand', type: 'text' },
                { key: 'model', type: 'text' },
                { key: 'serial', type: 'text' }
              ]}
              arrayHelpers={arrayHelpers}
              values={values.listingContent}
              name="listingContent"
              label={t('listing.field.listingContent')}
            />
          )}
        />

        {/* To Do - Convert Field Array to Field Adaptor */}
        {/* Listing Images */}
        <FieldArray
          name="listingImages"
          label={t('listing.field.listingImages')}
          render={arrayHelpers => (
            <RenderUploadMultiple arrayHelpers={arrayHelpers} values={values.listingImages} dictKey="imageUrl" />
          )}
        />

        {/* Gear description */}
        <Field
          name="description"
          component={RenderField}
          type="textarea"
          label={t('listing.field.description')}
          value={values.description}
        />

        <Field
          name="listingDetail.condition"
          component={RenderRadioGroup}
          type="text"
          label={t('listing.field.listingDetail.condition')}
          value={values.listingDetail.condition}
        >
          {this.state.listingCondition.map((condition, idx) => (
            <RadioButton key={idx} value={condition}>
              {condition}
            </RadioButton>
          ))}
        </Field>

        <Field
          name="listingDetail.age"
          component={RenderRadioGroup}
          type="text"
          label={t('listing.field.listingDetail.age')}
          value={values.listingDetail.age}
        >
          {this.state.listingAge.map((value, idx) => (
            <RadioButton key={idx} value={value}>
              {value}
            </RadioButton>
          ))}
        </Field>
        <FieldArray
          name="listingDetail.damages"
          render={arrayHelpers => (
            <RenderDynamicField
              keys={[
                { key: 'imageUrl', type: 'image', label: 'Image' },
                { key: 'damageDetail', type: 'text', label: 'Details' }
              ]}
              arrayHelpers={arrayHelpers}
              values={values.listingDetail.damages}
              name="listingDetail.damages"
              label={t('listing.field.listingDamages')}
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
