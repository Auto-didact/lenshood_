import React from 'react';
import PropTypes from 'prop-types';
import { Empty, Button } from 'antd';
import { Link } from 'react-router-dom';

const DataNotFound = ({ description }) => {
  return (
    <div className="width100 centerAlign marginT30">
      <Empty description={description}>
        <Link to="/">
          <Button type="primary">Go to Home Page</Button>
        </Link>
      </Empty>
    </div>
  );
};

export default DataNotFound;
