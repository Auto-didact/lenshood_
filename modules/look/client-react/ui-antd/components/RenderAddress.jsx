import React from 'react';
import { Row, Col, Icon, Button, Form, Radio, Modal, Popconfirm, message } from 'antd';
import { RenderField } from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

export default class RenderAddress extends React.Component {
  state = {
    visible: [],
    newAddressState: false
  };

  componentDidMount() {
    const visible = this.state.visible;
    this.props.addresses.map((a, indexa) => {
      visible[indexa] = false;
    });
    this.setState({ visible });
    console.log('state.visible', this.state.visible);
  }

  modalControl = (index, visiblity) => {
    let visible = this.state.visible;
    visible[index] = visiblity;
    this.setState({ visible });
    console.log('state.visible', this.state.visible);
  };

  handleAddAddress = () => {
    const { arrayHelpers, addresses } = this.props;
    const obj = {};
    const keys = [
      { key: 'streetAddress1' },
      { key: 'streetAddress2' },
      { key: 'city' },
      { key: 'state' },
      { key: 'pinCode' }
    ];
    keys.map(k => (obj[k.key] = ''));
    arrayHelpers.push(obj);

    //Setting the visiblity
    const visible = this.state.visible;
    visible[addresses.length] = true;
    this.setState({ visible, newAddressState: true });
  };

  handleSelect = index => {
    console.log('handleSelect called');
    // const primeAddress = this.state.primeAddress;
    // console.log('primeAddress before', primeAddress);

    // primeAddress.map();
    // primeAddress[index] == true ? (primeAddress[index] = false) : (primeAddress[index] = true);
    // this.setState({ primeAddress });

    // console.log('primeAddress after', this.state.primeAddress);

    this.props.addresses.map(address => {
      address.primeAddress = false;
    });

    this.props.addresses[index].primeAddress = true;
  };

  checkAdd = index => {
    let newAddressState = this.state.newAddressState;
    this.state.newAddressState ? this.props.arrayHelpers.remove(index) : null;
    newAddressState = false;
    this.setState({ newAddressState });
  };

  render() {
    const { arrayHelpers, name, addresses, t, label } = this.props;
    function cancel(e) {
      console.log(e);
      message.error('Click on No');
    }
    const isSelectable = this.props.isSelectable || false;

    //Form field Section-->>
    const keys = [
      { key: 'primeAddress', label: 'primeAddress' },
      { key: 'streetAddress1', label: 'streetAddress' },
      { key: 'streetAddress2', label: 'streetAddress' },
      { key: 'city', label: 'city' },
      { key: 'state', label: 'state' },
      { key: 'pinCode', label: 'pinCode' }
    ];

    let formItems = [];
    let addressCard = [];

    {
      //Geting all the fields for the form.
      this.props.addresses.map(
        (address, indexa) => (
          (formItems[indexa] = keys.map((k, indexk) => (
            <FormItem style={{ display: 'inline-block', margin: '0px 5px', width: '75%' }} key={indexk}>
              {k.key != 'primeAddress' ? (
                <Field
                  name={`${name}[${indexa}].${k.key}`}
                  component={RenderField}
                  placeholder={k.label}
                  type="text"
                  label={t(`${label}.${k.label}`)}
                  value={address[k.key]}
                />
              ) : (
                <Radio
                  value={
                    // this.state.primeAddress[indexa]
                    address
                  }
                  // onClick={() => this.handleSelect(indexk)}
                >
                  {t(`${label}.${keys[0].label}`)}
                </Radio>
              )}
            </FormItem>
          ))),
          //Geting all the addressCard.
          (addressCard[indexa] = (
            <div
              className="HomeAddress"
              key={indexa}
              style={{
                marginTop: '15px'
              }}
            >
              <div
                className="HomeAddressBlock"
                style={{
                  position: 'relative',
                  bottom: '16px'
                }}
              >
                Home Address
              </div>
              <br />
              <div
                className="addressLines"
                style={{
                  position: 'relative',
                  bottom: '20px'
                }}
              >
                <h4>{address.streetAddress1 && address.streetAddress1 + ','}</h4>
                <h4>{address.streetAddress2 && address.streetAddress2 + ','}</h4>
                <h4>{address.city && address.city + ','}</h4>
                <h4>{address.state && address.state + ','}</h4>
                <h4>{address.pinCode && address.pinCode + ','}</h4>
              </div>

              <Row style={{ marginBottom: '8px' }}>
                <Col span={12} align="left">
                  <Button
                    style={{ position: 'relative', bottom: '10px', right: '6px' }}
                    shape="circle"
                    size="large"
                    onClick={() => this.modalControl(indexa, true)}
                  >
                    <Icon type="edit" />
                  </Button>
                  <Modal
                    visible={this.state.visible[indexa]}
                    title="Address"
                    okText="Ok"
                    onCancel={() => this.modalControl(indexa, false) || this.checkAdd(indexa)}
                    onOk={() => this.modalControl(indexa, false) || this.setState({ newAddressState: false })}
                  >
                    <div>
                      <FormItem>{formItems[indexa]}</FormItem>
                    </div>
                  </Modal>
                </Col>
                <Col span={12} align="right">
                  <Popconfirm
                    title="Are you sure to delete this address?"
                    onConfirm={() => arrayHelpers.remove(indexa)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      style={{ position: 'relative', bottom: '10px', left: '6px' }}
                      type="danger"
                      shape="circle"
                      size="large"
                    >
                      <Icon type="delete" />
                    </Button>
                  </Popconfirm>
                </Col>
              </Row>
            </div>
          ))
        )
      );
    }

    return (
      <>
        <Row>
          <Col span={24}>
            <h3 className="Addresses">Addresses</h3>
            <br />
          </Col>
          <Col>
            <Row gutter={80}>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 12, offset: 0 }}
                md={{ span: 8, offset: 0 }}
                className="PadB30"
              >
                {isSelectable ? (
                  <Radio.Group name="addresses" defaultValue={addresses[0]} style={{ marginLeft: '10px' }}>
                    {addresses.map((address, indexas) => (
                      <>
                        <Radio
                          id={indexas}
                          key={indexas}
                          value={address}
                          style={{
                            backgroundColor: '#d5f0eb',
                            paddingTop: '20px',
                            height: '56px'
                            // opacity: '0',
                            // position: 'absolute'
                          }}
                          // onClick={() => this.handleSelect(indexas)}
                          onChange={console.log('radio handlechange called')}
                        />
                        <label
                          htmlFor={indexas}
                          name="address"
                          // onClick={() => this.css(('outline', 'rgba(77, 97, 171, 0.5) auto 3px'))}
                        >
                          {addressCard[indexas]}
                        </label>
                      </>
                    ))}
                  </Radio.Group>
                ) : (
                  addresses.map((address, indexas) => addressCard[indexas])
                )}
              </Col>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 12, offset: 0 }}
                md={{ span: 8, offset: 0 }}
                className="PadB30"
              >
                <div
                  className="AddNewAddressBlock"
                  onClick={this.handleAddAddress}
                  style={{ marginTop: !isSelectable ? '15px' : null }}
                >
                  <div className="AddNewAddress">
                    <Icon type="plus" />
                  </div>
                  <h5>Add a new address</h5>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}

RenderAddress.propTypes = {
  t: PropTypes.func,
  addresses: PropTypes.any,
  name: PropTypes.any,
  label: PropTypes.any,
  keys: PropTypes.any,
  isSelectable: PropTypes.bool,
  arrayHelpers: PropTypes.object
};
