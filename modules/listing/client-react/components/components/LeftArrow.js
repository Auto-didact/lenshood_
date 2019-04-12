import React from 'react';
import '../resources/listingCatalogue.css';
import { Icon } from 'antd';

const LeftArrow = props => {
  return (
    <div className="nextArrow" onClick={props.goToPrevSlide}>
      <h1>
        <Icon type="left-circle" />
      </h1>
    </div>
  );
};

export default LeftArrow;
