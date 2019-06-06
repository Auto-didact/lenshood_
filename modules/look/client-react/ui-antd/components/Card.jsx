import React from "react";
import PropTypes from "prop-types";
import { Card as ADCard } from "antd";

// To Do : Abstract out styles;

const Card = ({ children, ...props }) => {
  return (
    <ADCard className="card-custom" {...props}>
      {children}
    </ADCard>
  );
};

Card.propTypes = {
  children: PropTypes.node
};

export default Card;
