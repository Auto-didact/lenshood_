import React from "react";
import "../resources/listingCatalogue.css";
import { Card } from "antd";

const { Meta } = Card;
class SimpleCard extends React.Component {
  render() {
    return (
      <Card
        hoverable
        cover={<img alt="" src={this.props.item.image} height={"120"} />}
      >
        <Meta
          title={this.props.item.name.substring(0, 23)}
          description={
            <p style={{ margin: 0, padding: 0 }}>
              <p
                style={{
                  fontSize: "9px",
                  color: "#23b195",
                  display: "inline"
                }}
              >
                5 items from{" "}
              </p>{" "}
              <strong style={{ display: "inline", fontSize: "11px" }}>
                &#8377;{this.props.item.rent} per day
              </strong>
            </p>
          }
        />
      </Card>
    );
  }
}

export default SimpleCard;
