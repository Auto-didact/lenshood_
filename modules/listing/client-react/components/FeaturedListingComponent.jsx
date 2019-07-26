import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
import { SuggestedCardListComponent } from '@gqlapp/listing-client-react';
import { Row, Col } from 'antd';

//Animation
import { OverPack } from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';

class FeaturedListingComponent extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
            <OverPack>
              <QueueAnim key="queue" leaveReverse>
                <div key="a">
                  <h1 align="center" className="home-heading">
                    Featured listings
                  </h1>

                  <div align="center">
                    <div
                      className="home-heading-underline"
                      style={{
                        width: '142px'
                      }}
                    />
                  </div>
                </div>
              </QueueAnim>
            </OverPack>
            <br />
            <OverPack>
              <QueueAnim key="queue" leaveReverse>
                <SuggestedCardListComponent key="b" relatedList={this.props.featuredListings} />
              </QueueAnim>
            </OverPack>
          </Col>
        </Row>
      </div>
    );
  }
}

FeaturedListingComponent.propTypes = {
  listings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      gearCategory: PropTypes.string.isRequired,
      gearSubcategory: PropTypes.string.isRequired
    })
  ).isRequired
};

export default translate('listing')(FeaturedListingComponent);
