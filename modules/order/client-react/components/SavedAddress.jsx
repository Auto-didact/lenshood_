import React from 'react';
import { Col, Icon, Button } from 'antd';
import PropTypes from 'prop-types';
import AddNewAddress from './AddNewAddress';

export default class SavedAddress extends React.Component {
  static get propTypes() {
    return {
      address: PropTypes.any,
      onShowModal: PropTypes.func,
      onDelete: PropTypes.func,
      onCancel: PropTypes.func,
      value: PropTypes.any,
      onSave: PropTypes.func,
      visible: PropTypes.any,
      saveFormRef: PropTypes.func,
      onChange: PropTypes.func
    };
  }
  state = {
    visible: false
  };

  render() {
    const { address, onShowModal, onDelete, onCancel, value, onSave, visible, saveFormRef, onChange } = this.props;

    return (
      <React.Fragment>
        {address.map(adres => (
          <Col
            key={adres.id}
            xs={{ span: 18, offset: 3 }}
            sm={{ span: 12, offset: 0 }}
            md={{ span: 10, offset: 0 }}
            className="PadB30"
          >
            {console.log(adres)}
            <div className="HomeAddress">
              <div className="HomeAddressBlock">
                Home Address <Icon type="home" className="homeicon" />
              </div>
              <br />
              <div className="addressLines">
                <h4>{adres.name},</h4>
                <h4>{adres.address1},</h4>
                <h4>{adres.address2},</h4>
                <h4>{adres.state}.</h4>
                <h4>{adres.PIN}</h4>
                <h4>Mobile: {adres.mobile}</h4>
              </div>
              <Button className="addressIcons" ghost onClick={() => onDelete(adres)}>
                <Icon type="delete" />
              </Button>
              <Button className="addressIcons" onClick={() => onShowModal(adres)} ghost>
                <Icon type="edit" />
              </Button>
            </div>
          </Col>
        ))}
        <AddNewAddress
          wrappedComponentRef={saveFormRef}
          visible={visible}
          onCancel={onCancel}
          onSave={onSave}
          value={value}
          onChange={onChange}
        />
      </React.Fragment>
    );
  }
}
