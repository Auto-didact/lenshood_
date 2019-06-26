import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
import Helmet from 'react-helmet';

import { Row, Col, Breadcrumb, Card } from 'antd';
import { PageLayout,Loader } from '@gqlapp/look-client-react';
import UserCard from './components/userCard';
import ProductCard from './components/ProductCard';
import ReviewsCard from './components/ReviewsCard';
import AddToCartCard from './components/AddToCartCard';
import SuggestedCardList from './components/SuggestedCardList';


import settings from '../../../../settings';

class ListingDetailView extends Component {
  state = {};

  renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${this.props.t('listingDetail.title')}`}
      meta={[
        {
          name: 'description',
          content: this.props.t('listingDetail.meta')
        }
      ]}
    />
  );

  onChange = value => {
    this.setState({
      noOfDays: value
    });
  };
  render() {
    const loading = this.props.loading;
    const listing = this.props.listing;

    const t = this.props.t;
    const seller = this.props.listing && this.props.listing.user;

    const leftGap = '0%';

    const cancellationPolicy = t('listingDetail.content.cancellationPolicy');
    const damagePolicy = t('listingDetail.content.damagePolicy');

    if (loading && !listing) {
      return (
        <PageLayout>
          {this.renderMetaData()}

          
          <Loader text={t('listing.loadMsg')} />
         

        </PageLayout>
      );
    } else {
      return (
        <PageLayout>
          <Breadcrumb
            separator=">"
            style={{
              padding: '0px 5px',
              marginLeft: leftGap,
              marginTop: '5px',
              marginBottom: '5px'
            }}
          >
            <Breadcrumb.Item>{listing.gearCategory}</Breadcrumb.Item>
            <Breadcrumb.Item href="">{listing.gearSubcategory}</Breadcrumb.Item>
            {listing.listingContent.length !== 0 ? (
              <Breadcrumb.Item href=""> {listing.listingContent[0].gear}</Breadcrumb.Item>
            ) : (
              ''
            )}
          </Breadcrumb>

          {

            <h1 className="gearCat">
              {listing && listing.listingContent.length !== 0
                ? listing.listingContent.map(item => <span>{`${item.gear}  `}</span>)

                : listing.gearCategory}
            </h1>
          }
          <Row gutter={10} style={{ marginLeft: leftGap, marginRight: leftGap }}>
            <Col xl={16} lg={15} md={13} sm={24}>
              <ProductCard listing={listing} cancellationPolicy={cancellationPolicy} damagePolicy={damagePolicy} />
              {/*<ReviewsCard reviews={this.state.product.reviews} />*/}
            </Col>
            <Col xl={8} lg={9} md={11} sm={24}>
              <Row>
                <Col span={24}>
                  <AddToCartCard
                    onChange={this.onChange.bind(this)}
                    noOfDays={this.state.noOfDays}
                    product={this.state.product}
                    listing={listing}
                  />
                </Col>
                <Col span={24}>
                  <UserCard seller={seller} />
                </Col>
              </Row>
            </Col>
            {/* <Col span={24}>
            <Card>
              <h2 className="fontBold">Other listings by {this.state.product.seller.name}</h2>
              <SuggestedCardList relatedList={this.state.product.relatedList} />
            </Card>
          </Col> */}
            {/* <Col span={24}>
            <Card>
              <h2 className="fontBold">Frequently rented along with {this.state.product.title}</h2>
              <SuggestedCardList relatedList={this.state.product.relatedList} />
            </Card>
          </Col> */}
          </Row>
        </PageLayout>
      );
    }
  }
}

ListingDetailView.propTypes = {
  loading: PropTypes.bool.isRequired,
  listing: PropTypes.object,
  location: PropTypes.object.isRequired,
  t: PropTypes.func
};

export default translate('listing')(ListingDetailView);
