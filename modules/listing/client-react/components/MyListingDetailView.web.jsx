import React, { Component } from 'react';
import { Layout, Row, Col, Breadcrumb, Card } from 'antd';
import { PageLayout } from '@gqlapp/look-client-react';
import './resources/listingCatalogue.css';
import AccDetailsMenu from './components/AccDetailsMenu';
import DetailsCard from './components/DetailsCard';
import ProductCalender from './components/ProductCalender';
import ReviewsCard from './components/ReviewsCard';
import naruto4 from './resources/naruto4.jpg';

class MyListDetails extends Component {
  state = {
    product: {
      name: 'Blah blah bleh',
      rent: 1200,
      image: naruto4,
      rating: 4,
      reviews: 7,
      nature: 'On Rent'
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
    bookings: [
      {
        name: 'Rajeev Khanna',
        rating: 4,
        start: '2019-03-01',
        end: '2019-03-12'
      },
      {
        name: 'BIshal Deb',
        rating: 3.7,
        start: '2019-03-25',
        end: '2019-03-31'
      },
      {
        name: 'Mukesh Babu',
        rating: 2.2,
        start: '2019-03-15',
        end: '2019-03-16'
      },
      {
        name: 'Rajeev Khanna',
        rating: 4,
        start: '2019-03-20',
        end: '2019-03-22'
      }
    ]
  };
  render() {
    return (
      <PageLayout>
        <div style={{ padding: '20px' }}>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>Account</Breadcrumb.Item>
            <Breadcrumb.Item href=""> My listing</Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Row style={{ padding: '0 5%' }}>
              <Col lg={7} md={24}>
                <AccDetailsMenu select={3} />
              </Col>
              <Col lg={15} md={24}>
                <DetailsCard buttonText="Edit" item={this.state.product} />
                <Card>
                  <ProductCalender bookings={this.state.bookings} />
                </Card>
                <ReviewsCard reviews={this.state.reviews} />
              </Col>
            </Row>
          </Layout>
        </div>
      </PageLayout>
    );
  }
}

export default MyListDetails;
