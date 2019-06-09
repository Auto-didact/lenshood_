import React from 'react';
import { Icon, Button, Radio } from 'antd';
import PropTypes from 'prop-types';
import AddNewAddress from './AddNewAddress';

export default class SavedAddress extends React.Component {
  static get propTypes() {
    return {
      address: PropTypes.any,
      onShowModal: PropTypes.func,
      onDelete: PropTypes.func,
      onCancel: PropTypes.func,
      onSelect: PropTypes.func,
      value: PropTypes.any,
      onSave: PropTypes.func,
      visible: PropTypes.any,
      saveFormRef: PropTypes.func,
      onChange: PropTypes.func
    };
  }

  render() {
    const {
      address,
      onShowModal,
      onDelete,
      onCancel,
      value,
      onSelect,
      onSave,
      visible,
      saveFormRef,
      onChange
    } = this.props;

    return (
      <React.Fragment>
        {address.map(adres => (
          <Radio.Button key={adres.id} value={adres} onClick={() => onSelect(adres)}>
            <div style={{ marginTop: 16 }} className="HomeAddress">
              <div className="HomeAddressBlock">
                Home Address <Icon type="home" className="homeicon" />
              </div>
              <br />
              <div className="addressLines">
                <h4>{adres.name},</h4>
                <h4>{adres.streetAddress1},</h4>
                <h4>{adres.streetAddress2},</h4>
                <h4>{adres.state}.</h4>
                <h4>{adres.pinCode}</h4>
                <h4>Mobile: {adres.mobile}</h4>
              </div>
              <Button className="addressIcons" ghost onClick={() => onDelete(adres)}>
                <Icon type="delete" />
              </Button>
              <Button className="addressIcons" onClick={() => onShowModal(adres)} ghost>
                <Icon type="edit" />
              </Button>
            </div>
          </Radio.Button>
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
