import React from "react";
import "../resources/listingCatalogue.css";
import { Row, Col } from "antd";

class FilterCards extends React.Component {
  render() {
    return (
        <Row
        key={this.props.item.name}
        style={{
          margin: "2px",
          border: "0.5px #eee solid",
          width: "100%"
        }}
      >
        <Col span={12}>
          <img
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              overflow: "hidden",
              objectPosition: "0 0"
            }}
            alt="logo"
            src={this.props.item.image}
          />
        </Col>
        <Col span={12}>
          {" "}
          <div style={{ padding: "20px 10px" }}>
            {this.props.item.name}
          </div>
        </Col>
      </Row>
    );
  }
}

export default FilterCards;
