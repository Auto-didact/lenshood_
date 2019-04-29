import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { FieldArray } from 'formik';
import { RenderField, RenderRadioGroup, RenderDynamicField } from '@gqlapp/look-client-react';

// Abstract Radio Button out To Do
import { Radio } from 'antd';

const RadioButton = Radio.Button;

export default class RentalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listingCondition: ['New', 'Good', 'Fair'],
      listingAge: ['< 1 year', '1 - 2 years', '> 3 years']
    };
  }
  render() {
    const values = this.props.values;
    const t = this.props.t;
    return (
      <>
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

        {/* Need to remove this everywhere To Do */}
        {/* <Field
          name="listingDetail.repairHistory"
          component={RenderField}
          type="text"
          label={t('listing.field.listingDetail.repairHistory')}
          value={values.listingDetail.repairHistory}
        /> */}
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
      </>
    );
  }
}

RentalDetails.propTypes = {
  values: PropTypes.object,
  t: PropTypes.func
};
