import React from 'react';
import PropTypes from 'prop-types';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { Form } from 'antd';
import { RenderField } from '@gqlapp/look-client-react';

const FormItem = Form.Item;

export default class RenderAddressField extends React.Component {
  // add = () => {
  //   const arrayHelpers = this.props.arrayHelpers;
  //   let obj = {};
  //   const keys = this.props.keys;

  //   keys.map(k => (obj[k.key] = ''));

  //   arrayHelpers.push(obj);
  // };

  render() {
    // const { getFieldDecorator, getFieldValue } = this.props.form;
    // const formItemLayoutWithOutLabel = {
    //   wrapperCol: {
    //     xs: { span: 24, offset: 0 },
    //     sm: { span: 20, offset: 4 }
    //   }
    // };
    // getFieldDecorator('keys', { initialValue: [] });
    const {
      // name,
      address,
      // arrayHelper,
      label,
      key
    } = this.props;
    // const name = this.props.name;
    // const address = this.props.address;
    console.log('values', address);
    // const keys = Object.keys(address[0]);
    // const keys = state.key;
    console.log('key', key);
    // const arrayHelpers = this.props.arrayHelpers;
    let formItems = null;

    if (address) {
      // formItems = address.map((v, indexv) => (
      formItems = (
        <FormItem
          required={false}
          //  key={indexv}
          style={{ margin: '0px' }}
        >
          {key.map((k, indexk) => (
            <FormItem style={{ display: 'inline-block', margin: '0px 5px' }} key={indexk}>
              {/* {k.type == 'text' ? ( */}
              {console.log('key', key)}
              {console.log('`${k}->name`', `${k}`)}
              {console.log('Name', k.charAt(0).toUpperCase() + k.slice(1))}
              <Field
                name={`${k}`}
                component={RenderField}
                placeholder={k.charAt(0).toUpperCase() + k.slice(1)}
                type="text"
                label={k.charAt(0).toUpperCase() + k.slice(1)}
                // label={`${k.label || k.key} #${indexv + 1}`}
                value={address[k]}
                // key={indexv}
                // style={{ display: 'inline-block', margin: '0px 5px' }}
              />

              {/* ) : null} */}

              {/* {k.type == 'image' ? (
                    <Field
                      name={`${name}[${indexv}].${k.key}`}
                      component={RenderUpload}
                      type="text"
                      label={k.label || k.key}
                      value={v[k.key]}
                      key={indexv}
                      // style={{ display: 'inline-block', margin: '0px 5px' }}
                    />
                  ) : null} */}
            </FormItem>
          ))}
          {/* {keys.length > 1 ? (
                <Icon className="dynamic-delete-button" type="minus-circle-o" onClick={() => arrayHelpers.remove(indexv)} />
              ) : null} */}
        </FormItem>
      );
      // ));
    }
    return (
      <div>
        <FormItem label={label}>
          {formItems}
          {/* <FormItem>
            <Button style={{ width: '30%' }} onClick={this.add}>
              <Icon type="plus" /> {this.props.buttonText || 'Add Field'}
            </Button>
          </FormItem> */}
        </FormItem>
      </div>
    );
  }
}

RenderAddressField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  address: PropTypes.object,
  key: PropTypes.array,
  buttonText: PropTypes.string,
  arrayHelpers: PropTypes.object
};
