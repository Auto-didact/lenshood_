import React from 'react';
import PropTypes from 'prop-types';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { Modal, Form, Input } from 'antd';
import { RenderField } from '@gqlapp/look-client-react';

const AddNewAddress = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    static get propTypes() {
      return {
        onCancel: PropTypes.func,
        onSave: PropTypes.func,
        onChange: PropTypes.func,
        value: PropTypes.any,
        visible: PropTypes.any,
        form: PropTypes.any
      };
    }

    constructor(props) {
      super(props);
      this.props = props;
    }

    handleChange = ({ currentTarget: input }) => {
      const data = { ...this.props.value };
      data[input.name] = input.value;
      {
        () => this.props.onChange(data);
      }
    };

    render() {
      const { onCancel, onSave, form, value, visible } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Modal visible={visible} title="Address" okText="Save" onCancel={onCancel} onOk={() => onSave(value)}>
          <Form onSubmit={onSave} layout="vertical">
            <Form.Item label="Name">
              {getFieldDecorator('name', {
                initialValue: value.name || null,
                rules: [{ required: true, message: 'Please input the Name!' }]
              })(<Input onChange={() => this.handleChange} />)}
            </Form.Item>

            <Form.Item label="Street Address 1">
              {getFieldDecorator('streetAddress1', {
                initialValue: value.streetAddress1 || null,
                rules: [{ required: true, message: 'Please input the Street Address 1!' }]
              })(<Input onChange={() => this.handleChange} />)}
            </Form.Item>

            <Form.Item label="Street Address 2">
              {getFieldDecorator('streetAddress2', { initialValue: value.streetAddress2 || null })(
                <Input type="textarea" onChange={() => this.handleChange} />
              )}
            </Form.Item>

            <Form.Item label="City">
              {getFieldDecorator('city', {
                initialValue: value.city || null,
                rules: [{ required: true, message: 'Please input the City!' }]
              })(<Input type="textarea" onChange={() => this.handleChange} />)}
            </Form.Item>

            <Form.Item label="State">
              {getFieldDecorator('state', {
                initialValue: value.state || null,
                rules: [{ required: true, message: 'Please input the State!' }]
              })(<Input type="textarea" onChange={() => this.handleChange} />)}
            </Form.Item>

            <Form.Item label="Pin Code">
              {getFieldDecorator('pinCode', {
                initialValue: value.pinCode || null,
                rules: [{ required: true, message: 'Please input the Pin Code!' }]
              })(<Input type="number" onChange={() => this.handleChange} />)}
            </Form.Item>
          </Form>

          {/* Initailly checking if a single field gets loaded corectly. */}
          <Field name="name" component={RenderField} type="text" label="Name" value={value.name} />
        </Modal>
      );
    }
  }
);

export default AddNewAddress;
