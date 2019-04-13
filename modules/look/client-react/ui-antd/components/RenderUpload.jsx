import React from 'react';
import PropTypes from 'prop-types';
import { Form, Upload, Icon } from 'antd';

const FormItem = Form.Item;

const RenderUpload = ({ input, label, meta: { touched, error }, defaultFileList }) => {
  let validateStatus = '';
  if (touched && error) {
    validateStatus = 'error';
  }

  return (
    <FormItem label={label} validateStatus={validateStatus} help={touched && error}>
      <div className="dropbox">
        <Upload.Dragger
          defaultFileList={defaultFileList}
          {...input}
          name="files"
          listType="picture"
          className="upload-list-inline"
        >
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for a single or bulk upload.</p>
        </Upload.Dragger>
      </div>
    </FormItem>
  );
};

RenderUpload.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
  defaultFileList: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.number,
      name: PropTypes.number,
      status: PropTypes.string,
      url: PropTypes.string,
      thumbUrl: PropTypes.string
    })
  )
};

export default RenderUpload;
