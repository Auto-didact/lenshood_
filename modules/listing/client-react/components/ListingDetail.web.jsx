import React, { Component } from 'react';
import { Row, Col, Breadcrumb, Card } from 'antd';
import { PageLayout } from '@gqlapp/look-client-react';
import './resources/listingCatalogue.css';
import UserCard from './components/userCard';
import ProductCard from './components/ProductCard';
import ReviewsCard from './components/ReviewsCard';
import AddToCartCard from './components/AddToCartCard';
import SuggestedCardList from './components/SuggestedCardList';

import naruto from './resources/naruto.jpg';
import naruto2 from './resources/naruto2.jpg';
import naruto3 from './resources/naruto3.jpg';
import naruto4 from './resources/naruto4.jpg';

class ListingDetail extends Component {
  state = {
    product: {
      title: 'CANON EOS 70D',
      replacementValue: 70000,
      Specification: ['Blah Blah Blah', 'Bleh', 'Same stuffs'],
      images: [naruto, naruto2, naruto3, naruto4],
      description:
        "The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content. The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get",
      package: [
        'Blah Blah Blah',
        'Bleh',
        'Same stuffs',
        'Blah Blah Blah',
        'Bleh',
        'Same stuffs',
        'Blah Blah Blah',
        'Bleh',
        'Same stuffs'
      ],
      cancellationPolicy:
        'The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that ',
      damagePolicy:
        'The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that ',
      rentPerDay: 200,
      rentPerWeek: 1000,
      serviceFee: 100,
      refundableDeposit: 5000,
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
          name: 'Blah blah bleh',
          rent: 1200,
          seller: 'Rajeev Khanna',
          image: 'https://free4kwallpapers.com/uploads/wallpaper-cache/naruto-anime-4k-wallpaper-1024x768-MM-100.jpg',
          rating: 4
        },
        {
          name: 'Blah lah bleh',
          rent: 120,
          seller: 'Ravi Khan',
          image: 'https://free4kwallpapers.com/uploads/wallpaper-cache/naruto-shippuden-1920x1080-1024x768-MM-100.jpg',
          rating: 3.7
        },
        {
          name: 'Blah lah bleh',
          rent: 120,
          seller: 'Ravi',
          image: 'https://free4kwallpapers.com/uploads/wallpaper-cache/naruto-kyuubi-mode-3-1024x768-MM-100.jpg',
          rating: 3.9
        },
        {
          name: 'Blah laheh',
          rent: 12,
          seller: 'Rai',
          image:
            'https://free4kwallpapers.com/uploads/wallpaper-cache/naruto-vsmadara-uchiha-wallpaper-1024x768-MM-100.jpg',
          rating: 4.5
        }
      ]
    },
    noOfDays: 1
  };
  onChange = value => {
    this.setState({
      noOfDays: value
    });
  };
  render() {
    return (
      <PageLayout>
        <div style={{ padding: '10px 20px' }}>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item href=""> DSLR cameras</Breadcrumb.Item>
            <Breadcrumb.Item href=""> Popular Products</Breadcrumb.Item>
            <Breadcrumb.Item href=""> Canon EOS 70D (Rajeev Khanna)</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <h1
          style={{
            backgroundColor: 'rgba(35, 177, 149,0.2)',
            padding: '10px 7%',
            fontSize: '25px'
          }}
        >
          {this.state.product.title}
        </h1>
        <Row style={{ padding: '0 7%' }}>
          <Col lg={16} md={13} sm={24}>
            <ProductCard product={this.state.product} />
            <ReviewsCard reviews={this.state.product.reviews} />
          </Col>
          <Col lg={8} md={11} sm={24}>
            <AddToCartCard
              onChange={this.onChange.bind(this)}
              noOfDays={this.state.noOfDays}
              product={this.state.product}
            />
            <UserCard seller={this.state.product.seller} />
          </Col>
          <Col span={24}>
            <Card>
              <h2 style={{ fontWeight: 'bold' }}>Other listings by {this.state.product.seller.name}</h2>
              <SuggestedCardList relatedList={this.state.product.relatedList} />
            </Card>
          </Col>
          <Col span={24}>
            <Card>
              <h2 style={{ fontWeight: 'bold' }}>Frequently rented along with {this.state.product.title}</h2>
              <SuggestedCardList relatedList={this.state.product.relatedList} />
            </Card>
          </Col>
        </Row>
      </PageLayout>
    );
  }
}

export default ListingDetail;
