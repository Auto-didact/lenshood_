import React from "react";
import PropTypes from "prop-types";
import { Card as ADCard } from "antd";

// To Do : Abstract out styles;

const Card = ({ children, ...props }) => {
  return (
    <ADCard
      style={{ margin: "7px", boxShadow: "5px 3px 5px  #94ead9" }}
      {...props}
    >
      {children}
    </ADCard>
  );
};

Card.propTypes = {
  children: PropTypes.node
};

export default Card;
