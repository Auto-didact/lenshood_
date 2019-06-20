import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';

import { Modal, Form } from 'antd';
import { RenderField } from '@gqlapp/look-client-react';
// import RenderAddressField from './RenderAddressField';

const AddressSchema = {
  name: [required],
  streetAddress1: [required],
  streetAddress2: [required],
  city: [required],
  state: [required],
  pinCode: [required]
};

// const AddressForm = ({ handleSubmit, values, address, onCancel, visible, key }) => {
//   // const {
//   //   address,
//   //   onCancel,
//   //   // values,
//   //   visible
//   //   // key,
//   //   // index,
//   //   // onSave
//   //   // handleSubmit
//   // } = this.props;
//   // if (address.id) {
//   //   values.id = address.id;
//   // }
//   // return (
//   return (
//     <Modal
//       visible={visible}
//       title="Address"
//       okText="Save"
//       onCancel={onCancel}
//       onOk={() => handleSubmit(values)}
//       // onOk={() => onSave(values)}
//     >
//       <Form layout="vertical" onSubmit={handleSubmit}>
//         {/* {console.log('key in addressForm', key)} */}
//         {/* <RenderAddressField
//             address={address}
//             key={key}
//             label="Address Form"
//           /> */}
//         {address.name && <Field name="name" component={RenderField} type="text" label="Name" value={values.name} />}
//         {address.streetAddress1 && (
//           <Field
//             name="streetAddress1"
//             component={RenderField}
//             type="text"
//             label="Street Address 1"
//             value={values.streetAddress1}
//           />
//         )}
//         {address.streetAddress2 && (
//           <Field
//             name="streetAddress2"
//             component={RenderField}
//             type="text"
//             label="Street Address 2"
//             value={values.streetAddress2}
//           />
//         )}
//         {address.city && <Field name="city" component={RenderField} type="text" label="City" value={values.city} />}
//         {address.state && <Field name="state" component={RenderField} type="text" label="State" value={values.state} />}
//         {address.pinCode && (
//           <Field name="pinCode" component={RenderField} type="text" label="Pin Code" value={values.pinCode} />
//         )}
//       </Form>
//     </Modal>
//   );
//   // )
// };

// eslint - disable - next - line;

class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    const {
      address,
      onCancel,
      values,
      visible,
      handleSubmit
      // key,
      // onSave
    } = this.props;
    // if (address.id) {
    //   values.id = address.id;
    // }
    console.log('handleSubmit', handleSubmit);
    return (
      <Modal visible={visible} title="Address" okText="Save" onCancel={onCancel} onOk={() => handleSubmit(values)}>
        <Form layout="vertical" onSubmit={handleSubmit}>
          {/* {console.log('key in addressForm', key)} */}
          {/* <RenderAddressField
          address={address}
          //  key={key}
          label="Address Form"
        /> */}
          {address.name && <Field name="name" component={RenderField} type="text" label="Name" value={values.name} />}
          {address.streetAddress1 && (
            <Field
              name="streetAddress1"
              component={RenderField}
              type="text"
              label="Street Address 1"
              value={values.streetAddress1}
            />
          )}
          {address.streetAddress2 && (
            <Field
              name="streetAddress2"
              component={RenderField}
              type="text"
              label="Street Address 2"
              value={values.streetAddress2}
            />
          )}
          {address.city && <Field name="city" component={RenderField} type="text" label="City" value={values.city} />}
          {address.state && (
            <Field name="state" component={RenderField} type="text" label="State" value={values.state} />
          )}
          {address.pinCode && (
            <Field name="pinCode" component={RenderField} type="text" label="Pin Code" value={values.pinCode} />
          )}
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
  // key: PropTypes.any,
  address: PropTypes.any,
  index: PropTypes.any,
  values: PropTypes.any,
  visible: PropTypes.any,
  form: PropTypes.any
};

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
      props: { onSave }
    }
  ) {
    console.log('formik submit called', values);
    onSave(values);
  },
  enableReinitialize: true,
  displayName: 'AddressForm' // helps with React DevTools
});

export default AddressFormWithFormik(AddressForm);
