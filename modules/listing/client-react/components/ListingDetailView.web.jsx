import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
import Helmet from 'react-helmet';
import { Row, Col, Breadcrumb, Card } from 'antd';
import { PageLayout } from '@gqlapp/look-client-react';
// import './resources/listingCatalogue.css';
import UserCard from './components/userCard';
import ProductCard from './components/ProductCard';
import ReviewsCard from './components/ReviewsCard';
import AddToCartCard from './components/AddToCartCard';
import SuggestedCardList from './components/SuggestedCardList';

import settings from '../../../../settings';

import naruto from './resources/naruto.jpg';
import naruto2 from './resources/naruto2.jpg';
import naruto3 from './resources/naruto3.jpg';
import naruto4 from './resources/naruto4.jpg';

class ListingDetailView extends Component {
  state = {
    product: {
      title: 'CANON EOS 70D',
      replacementValue: 70000,
      Specification: ['Blah Blah Blah', 'Bleh', 'Same stuffs'],
      listingImages: [{ imageUrl: naruto }, { imageUrl: naruto2 }, { imageUrl: naruto3 }, { imageUrl: naruto4 }],
      description:
        "The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content. The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get",
      serviceFee: 123,
      refundableDeposit: 3000,
      listingContent: [
        { gear: 'Blah Blah Blah' },
        { gear: 'Blah Blah Blah' },
        { gear: 'Blah Blah Blah' },
        { gear: 'Blah Blah Blah' },
        { gear: 'Blah Blah Blah' },
        { gear: 'Blah Blah Blah' },
        { gear: 'Blah Blah Blah' },
        { gear: 'Blah Blah Blah' },
        { gear: 'Blah Blah Blah' }
      ],
      cancellationPolicy:
        'The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that ',
      damagePolicy:
        'The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that ',
      listingRental: { perDay: 200, perWeek: 1000, replacementValue: 5000 },
      seller: {
        name: 'Rajeev Khanna',
        About:
          "The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when",
        references: ['google.com', 'facebook.com', 'instagram.com'],
        rating: 4,
        reviewsCount: 12
      },
      reviews: {
        properties: {
          'image quality': 5.0,
          'Auto focus and lighting': 3.7,
          Performance: 4.0,
          Features: 5.0,
          Design: 4.0
        },
        reviewers: [
          {
            name: 'Sree Bhargav',
            Date: '18th Aug 2018',
            word:
              'Really an awesome experience with this DSLR. Photo quality is too good. Zoom capability is also awesome, especially at 250mm. Wifi function along with canon app in android simply makes the product must to buy.'
          },
          {
            name: 'Ankit Jain',
            Date: '18th Dec 2018',
            word: 'Really an awesome experience with this DSLR. Photo quality is too good'
          }
        ]
      },
      relatedList: [
        {
          gearCategory: 'Blah blah bleh',
          listingRental: {
            perDay: 1200
          },
          listingImages: [
            {
              id: '1',
              imageUrl:
                'https://free4kwallpapers.com/uploads/wallpaper-cache/naruto-anime-4k-wallpaper-1024x768-MM-100.jpg'
            },
            {
              id: '1',
              imageUrl:
                'https://free4kwallpapers.com/uploads/wallpaper-cache/naruto-anime-4k-wallpaper-1024x768-MM-100.jpg'
            }
          ]
        },
        {
          gearCategory: 'Blah blah bleh',
          listingRental: {
            perDay: 1200
          },
          listingImages: [
            {
              id: '1',
              imageUrl:
                'https://free4kwallpapers.com/uploads/wallpaper-cache/naruto-anime-4k-wallpaper-1024x768-MM-100.jpg'
            },
            {
              id: '1',
              imageUrl:
                'https://free4kwallpapers.com/uploads/wallpaper-cache/naruto-anime-4k-wallpaper-1024x768-MM-100.jpg'
            }
          ]
        },
        {
          gearCategory: 'Blah blah bleh',
          listingRental: {
            perDay: 1200
          },
          listingImages: [
            {
              id: '1',
              imageUrl:
                'https://free4kwallpapers.com/uploads/wallpaper-cache/naruto-anime-4k-wallpaper-1024x768-MM-100.jpg'
            },
            {
              id: '1',
              imageUrl:
                'https://free4kwallpapers.com/uploads/wallpaper-cache/naruto-anime-4k-wallpaper-1024x768-MM-100.jpg'
            }
          ]
        }
      ]
    },
    noOfDays: 1
  };

  renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${this.props.t('listing.title')}`}
      meta={[
        {
          name: 'description',
          content: this.props.t('listing.meta')
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
    if (loading && !listing) {
      return (
        <PageLayout>
          {this.renderMetaData()}
          <div className="text-center">{t('listing.loadMsg')}</div>
        </PageLayout>
      );
    } else {
      return (
        <PageLayout>
          <div className="detViewPad">
            <Breadcrumb separator=">">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item href=""> DSLR cameras </Breadcrumb.Item>
              <Breadcrumb.Item href=""> Popular Products</Breadcrumb.Item>
              <Breadcrumb.Item href=""> Canon EOS 70D (Rajeev Khanna) (To Do)</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <h1
           className="gearCat"
          >
            {listing.gearCategory}
          </h1>
          <Row className="padH4p">
            <Col lg={16} md={13} sm={24}>
              <ProductCard listing={listing} />
              <ReviewsCard reviews={this.state.product.reviews} />
            </Col>
            <Col lg={8} md={11} sm={24}>
              <AddToCartCard
                onChange={this.onChange.bind(this)}
                noOfDays={this.state.noOfDays}
                product={this.state.product}
                listing={listing}
              />
              <UserCard seller={this.state.product.seller} />
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
