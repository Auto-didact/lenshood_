import React from "react";
import PropTypes from "prop-types";
import { FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { Form, Icon, Card, Row, Col } from "antd";
import { RenderField, RenderUpload, Button } from "@gqlapp/look-client-react";

const FormItem = Form.Item;

export default class DynamicFieldSet extends React.Component {
  add = () => {
    const arrayHelpers = this.props.arrayHelpers;
    let obj = {};
    const keys = this.props.keys;

    keys.map(k => (obj[k.key] = ""));

    arrayHelpers.push(obj);
  };

  render() {
    // const { getFieldDecorator, getFieldValue } = this.props.form;
    // const formItemLayoutWithOutLabel = {
    //   wrapperCol: {
    //     xs: { span: 24, offset: 0 },
    //     sm: { span: 20, offset: 4 }
    //   }
    // };
    // getFieldDecorator('keys', { initialValue: [] });
    const keys = this.props.keys;
    const name = this.props.name;
    const values = this.props.values;
    const arrayHelpers = this.props.arrayHelpers;
    let formItems = null;

    if (values) {
      formItems = values.map((v, indexv) => (
        <Col sm={12} xs={24} md={24} lg={12}>
          <Card className="ComponentCardColor">
            <FormItem required={false} key={indexv} style={{ margin: "0px" }}>
              <Row gutter={16}>
                {keys.map((k, indexk) => (
                  <Col sm={24} xs={24} md={12} lg={24}>
                    <FormItem
                      key={indexk}
                      style={{ margin: "0px", padding: "0px" }}
                    >
                      {k.type == "text" ? (
                        <Field
                          name={`${name}[${indexv}].${k.key}`}
                          component={RenderField}
                          placeholder={k.placeholder || k.key}
                          type="text"
                          label={`${k.label || k.key}`}
                          value={v[k.key]}
                          key={indexv}
                        />
                      ) : null}

                      {k.type == "image" ? (
                        <Field
                          name={`${name}[${indexv}].${k.key}`}
                          component={RenderUpload}
                          type="text"
                          setload={this.props.setload}
                          label={k.label || k.key}
                          value={v[k.key]}
                          key={indexv}
                        />
                      ) : null}
                    </FormItem>
                  </Col>
                ))}
              </Row>
              {keys.length > 1 ? (
                <Button
                  onClick={() => arrayHelpers.remove(indexv)}
                  color="danger"
                  block
                  size="sm"
                >
                  Delete
                </Button>
              ) : null}
            </FormItem>
          </Card>
        </Col>
      ));
    }
    return (
      <div>
        <FormItem label={this.props.label}>
          <Row gutter={32}>
            {formItems}
            <Col sm={12} xs={24} md={24} lg={12}>
              <FormItem>
                <Button
                  onClick={this.add}
                  color="primary"
                  block
                  ghost
                  icon="plus"
                >
                  {"Add Component"}
                </Button>
              </FormItem>
            </Col>
          </Row>
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
  buttonText: PropTypes.string,
  arrayHelpers: PropTypes.object
};
