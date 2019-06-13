import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';

import { Modal, Form } from 'antd';
import { RenderField } from '@gqlapp/look-client-react';

const AddressSchema = {
  fullName: [required],
  streetAddress1: [required],
  streetAddress2: [required],
  city: [required],
  state: [required],
  pinCode: [required]
};

// eslint-disable-next-line
class AddressForm extends React.Component {
  static get propTypes() {
    return {
      onCancel: PropTypes.func,
      onSave: PropTypes.func,
      onChange: PropTypes.func,
      address: PropTypes.any,
      values: PropTypes.any,
      visible: PropTypes.any,
      form: PropTypes.any
    };
  }

  render() {
    const { address, onCancel, onSave, values, visible } = this.props;
    if (address.id) {
      values.id = address.id;
    }

    return (
      <Modal visible={visible} title="Address" okText="Save" onCancel={onCancel} onOk={() => onSave(values)}>
        <Form layout="vertical" onSubmit={onSave}>
          <Field name="name" component={RenderField} type="text" label="Name" value={values.name} />
          <Field
            name="streetAddress1"
            component={RenderField}
            type="text"
            label="Street Address 1"
            value={values.streetAddress1}
          />
          <Field
            name="streetAddress2"
            component={RenderField}
            type="text"
            label="Street Address 2"
            value={values.streetAddress2}
          />
          <Field name="city" component={RenderField} type="text" label="City" value={values.city} />
          <Field name="state" component={RenderField} type="text" label="State" value={values.state} />
          <Field name="pinCode" component={RenderField} type="text" label="Pin Code" value={values.pinCode} />
        </Form>
      </Modal>
    );
  }
}

const AddressFormWithFormik = withFormik({
  mapPropsToValues: props => ({
    name: (props.address && props.address.name) || '',
    streetAddress1: (props.address && props.address.streetAddress1) || '',
    streetAddress2: (props.address && props.address.streetAddress2) || '',
    city: (props.address && props.address.city) || '',
    state: (props.address && props.address.state) || '',
    pinCode: (props.address && props.address.pinCode) || ''
  }),
  validate: values => validate(values, AddressSchema),
  handleSubmit(
    values,
    {
      props: { onSubmit }
    }
  ) {
    console.log('formik submit called', values);
    onSubmit && onSubmit(values);
  },
  enableReinitialize: true,
  displayName: 'AddressForm' // helps with React DevTools
});

export default AddressFormWithFormik(AddressForm);
