import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { RenderField } from '@gqlapp/look-client-react';

export default class RentalDetails extends Component {
  render() {
    const values = this.props.values;
    const t = this.props.t;
    return (
      <>
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
