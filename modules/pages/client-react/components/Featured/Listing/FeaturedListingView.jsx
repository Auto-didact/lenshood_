import React, { Component } from "react";
import PropTypes from "prop-types";
import { translate } from "@gqlapp/i18n-client-react";
import { SuggestedCardListComponent } from "@gqlapp/listing-client-react";
import { Row, Col } from "antd";

//Animation
import { Parallax } from "rc-scroll-anim";

class FeaturedListingView extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
            <Parallax
              animation={{ x: 0, opacity: 1, playScale: [0.5, 0.8] }}
              style={{ transform: "translateX(100px)", opacity: 0 }}
            >
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
            </Parallax>
            <br />
            <Parallax
              animation={{ x: 0, opacity: 1, playScale: [0.5, 0.8] }}
              style={{ transform: "translateX(-300px)", opacity: 0 }}
            >
              <SuggestedCardListComponent relatedList={this.props.listings} />
            </Parallax>
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
