import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "@gqlapp/i18n-client-react";
import { SuggestedCardListComponent } from "@gqlapp/listing-client-react";
import { Row, Col } from "antd";

class FeaturedListingView extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
            <h1 style={{ textAlign: "center", fontSize: " 30px" }}>
              Featured listings
            </h1>

            <div align="center">
              <div
                style={{
                  height: "2px ",
                  width: "342px",
                  background: "#23b195"
                }}
              />
            </div>
            <br />
            <SuggestedCardListComponent relatedList={this.props.listings} />
          </Col>
        </Row>
      </div>
    );
  }
}

FeaturedListingView.propTypes = {
  listings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      gearCategory: PropTypes.string.isRequired,
      gearSubcategory: PropTypes.string.isRequired
    })
  ).isRequired
};

export default translate("listing")(FeaturedListingView);
