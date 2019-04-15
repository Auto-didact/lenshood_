import React from 'react';
import PropTypes from 'prop-types';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { Form, Icon } from 'antd';
import { RenderField, Button } from '@gqlapp/look-client-react';

const FormItem = Form.Item;

export default class DynamicFieldSet extends React.Component {
  add = () => {
    const arrayHelpers = this.props.arrayHelpers;
    let obj = {};
    const keys = this.props.keys;
    {
      keys.map(k => (obj[k] = ''));
    }

    arrayHelpers.push(obj);
  };

  render() {
    // const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 }
      }
    };
    // getFieldDecorator('keys', { initialValue: [] });
    const keys = this.props.keys;
    const name = this.props.name;
    const values = this.props.values;
    const arrayHelpers = this.props.arrayHelpers;
    let formItems = null;

    if (values) {
      formItems = values.map((v, indexv) => (
        <FormItem required={false} key={indexv} style={{ margin: '0px' }}>
          {keys.map((k, indexk) => (
            <FormItem style={{ display: 'inline-block', margin: '0px 5px' }} key={indexk}>
              <Field
                name={`${name}[${indexv}].${k}`}
                component={RenderField}
                type="text"
                label={k}
                value={v[k]}
                key={indexv}
                // style={{ display: 'inline-block', margin: '0px 5px' }}
              />
            </FormItem>
          ))}
          {keys.length > 1 ? (
            <Icon className="dynamic-delete-button" type="minus-circle-o" onClick={() => arrayHelpers.remove(indexv)} />
          ) : null}
        </FormItem>
      ));
    }
    return (
      <div>
        <FormItem label={this.props.label}>
          {formItems}
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button style={{ width: '30%' }} onClick={this.add}>
              <Icon type="plus" /> Add field
            </Button>
          </FormItem>
        </FormItem>
      </div>
    );
  }
}

DynamicFieldSet.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.array,
  keys: PropTypes.array,
  arrayHelpers: PropTypes.object
};
