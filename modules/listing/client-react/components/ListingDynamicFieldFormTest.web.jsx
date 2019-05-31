import React from 'react';
import { Formik, Form, FormikProps, ErrorMessage, FieldArray } from 'formik';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { Icon } from 'antd';
import { RenderField, Button } from '@gqlapp/look-client-react';

export default class DynamicFieldForm extends React.Component {
  handleSubmit = values => {
    return;
  };

  render() {
    let vehicles = [
      { id: 1, vehicle: 'car', brand: 'hyundai' },
      { id: 2, vehicle: 'motorcycle', brand: 'harley' },
      { id: 3, vehicle: 'airplane', brand: 'boeing' },
      { id: 4, vehicle: 'rocket', brand: 'spacex' }
    ];

    return (
      <Formik
        initialValues={{
          vehicles: vehicles
        }}
        validate={values => {
          let errors = [];

          if (!values.vehicles.length) errors.vehicles = 'At least one vehicle is required';
          return errors;
        }}
        onSubmit={this.handleSubmit}
        render={formProps => {
          return (
            <Form>
              <FieldArray
                name="vehicles"
                render={arrayHelpers => (
                  <div>
                    {formProps.values.vehicles.map((obj, index) => (
                      <div key={index}>
                        {/* Edit the value here */}
                        <Field
                          name={`vehicles[${index}].vehicle`}
                          component={RenderField}
                          type="text"
                          // label={t('listing.field.gearCategory')}
                          value={obj.vehicle}
                        />
                        <Field
                          name={`vehicles[${index}].brand`}
                          component={RenderField}
                          type="text"
                          // label={t('listing.field.gearCategory')}
                          value={obj.brand}
                        />
                        {/* <Field name={`vehicles[${index}].vehicle`} />
                        <Field name={`vehicles[${index}].brand`} /> */}

                        {/* Remove this vehicle */}
                        <Button onClick={() => arrayHelpers.remove(index)} style={{ width: '60%' }}>
                          <Icon className="dynamic-delete-button" type="minus-circle-o" />
                        </Button>
                      </div>
                    ))}

                    {/* Add a new empty vehicle at the end of the list */}
                    <button type="button" onClick={() => arrayHelpers.push({ vehicle: '', brand: '' })}>
                      Add Vehicle
                    </button>
                  </div>
                )}
              />
              <button type="submit">Submit</button>
            </Form>
          );
        }}
      />
    );
  }
}
