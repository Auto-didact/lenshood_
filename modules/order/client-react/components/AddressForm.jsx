import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';

import { Modal, Form } from 'antd';
import { RenderField } from '@gqlapp/look-client-react';

const AddressSchema = {
  name: [required],
  streetAddress1: [required],
  state: [required],
  city: [required],
  pinCode: [required]
};

// eslint-disable-next-line
class AddressForm extends React.Component {
  handleChange = value => {
    console.log('value', value);
    const data = { ...this.props.value };
    console.log('value.name', value.name);
    data[value.name] = value;
    // {
    //   () => this.props.onChange(data);
    // }
  };

  render() {
    const { onCancel, handleSubmit, value, visible } = this.props;
    // const { getFieldDecorator } = form;

    return (
      <Modal visible={visible} title="Address" okText="Save" onCancel={onCancel} onOk={() => handleSubmit(value)}>
        <Form name="addNewAddress" onSubmit={handleSubmit} layout="vertical">
          <Field
            name="name"
            component={RenderField}
            type="text"
            label="Name"
            value={value.name}
            onChange={this.handleChange}
          />
          <Field
            name="streetAddress"
            component={RenderField}
            type="textarea"
            label="Street Address-1"
            value={value.streetAddress1}
            onChange={this.handleChange}
          />
          <Field
            name="streetAddress"
            component={RenderField}
            type="textarea"
            label="Street Address-2"
            value={value.streetAddress2}
            onChange={this.handleChange}
          />
          <Field
            name="city"
            component={RenderField}
            type="text"
            label="City"
            value={value.city}
            onChange={this.handleChange}
          />
          <Field
            name="state"
            component={RenderField}
            type="text"
            label="State"
            value={value.state}
            onChange={this.handleChange}
          />
          <Field
            name="pinCode"
            component={RenderField}
            type="number"
            label="Pin Code"
            value={value.pinCode}
            onChange={this.handleChange}
          />
        </Form>
      </Modal>
    );
  }
}

AddressForm.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  onChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  value: PropTypes.any,
  visible: PropTypes.bool,
  form: PropTypes.any
};

const AddressFormWithFormik = withFormik({
  mapPropsToValues: props => ({
    name: (props.value && props.value.fullName) || '',
    streetAddress1: (props.value && props.value.streetAddress1) || '',
    streetAddress2: (props.value && props.value.setAddress2) || '',
    city: (props.value && props.value.city) || '',
    state: (props.value && props.value.state) || '',
    pinCode: (props.value && props.value.pinCode) || ''
  }),
  validate: value => validate(value, AddressSchema),
  handleSubmit(
    value,
    {
      props: { onSubmit }
    }
  ) {
    // console.log(value);
    onSubmit(value);
  },
  enableReinitialize: true,
  displayName: 'AddressForm' // helps with React DevTools.
});

export default AddressFormWithFormik(AddressForm);
