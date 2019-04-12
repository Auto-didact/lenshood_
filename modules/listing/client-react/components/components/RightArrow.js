import React from "react";
import "../resources/listingCatalogue.css";
import { Icon } from "antd";

const RightArrow = props => {
  return (
    <div className="nextArrow" onClick={props.goToNextSlide}>
      <h1>
        <Icon type="right-circle" />
      </h1>
    </div>
  );
};

export default RightArrow;
