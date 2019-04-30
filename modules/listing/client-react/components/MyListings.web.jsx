import React, { Component } from 'react';
import { Layout, Row, Col, Breadcrumb } from 'antd';
import { AccountLayout } from '@gqlapp/look-client-react';
// import './resources/listingCatalogue.css';
import MyList from './components/MyList';
import AccDetailsMenu from './components/AccDetailsMenu';
import naruto from './resources/naruto.jpg';
import naruto2 from './resources/naruto2.jpg';
import naruto3 from './resources/naruto3.jpg';
import naruto4 from './resources/naruto4.jpg';

class MyListings extends Component {
  state = {
    products: [
      {
        name: 'Blah blah bleh',
        rent: 1200,
        image: naruto,
        rating: 4,
        reviews: 7,
        nature: 'On Rent'
      },
      {
        name: 'Blah lah bleh',
        rent: 120,
        image: naruto2,
        rating: 3.7,
        reviews: 12,
        nature: 'On Shelf'
      },
      {
        name: 'fdgbdfcgmbkmg;ngvjnpcghn',
        rent: 200,
        image: naruto4,
        rating: 3,
        reviews: 8,
        nature: 'On Rent'
      },
      {
        name: 'Blah lah bleh',
        rent: 120,
        image: naruto3,
        rating: 3.9,
        reviews: 25,
        nature: 'On Rent'
      }
    ]
  };
  render() {
    return (
      // <div className="padA20">
      //   <Breadcrumb separator=">">
      //     <Breadcrumb.Item>Account</Breadcrumb.Item>
      //     <Breadcrumb.Item href=""> My listing</Breadcrumb.Item>
      //   </Breadcrumb>
      //   <Layout className="layoutList">
      //     <Row className="layoutRow">
      //       <Col lg={7} md={24}>
      //         <AccDetailsMenu select={3} />
      //       </Col>
      //       <Col lg={15} md={24}>
      //         <MyList products={this.state.products} />
      //       </Col>
      //     </Row>
      //   </Layout>
      // </div>
      <AccountLayout select="/my-listings">
        <MyList products={this.state.products} />
      </AccountLayout>
    );
  }
}

export default MyListings;
