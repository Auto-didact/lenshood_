import React, { Component } from 'react';
import { Row, Col, Button, Switch } from 'antd';
import './resources/listingCatalogue.css';

// import Card from "./ui-antd/components/Card";
import RightArrow from './components/RightArrow';
import LeftArrow from './components/LeftArrow';
import FilterCards from './components/FilterCards';
import SuggestedCardList from './components/SuggestedCardList';
import SimpleCard from './components/SimpleCard';
import { PageLayout } from '@gqlapp/look-client-react';

import naruto from './resources/naruto.jpg';
import naruto2 from './resources/naruto2.jpg';
import naruto3 from './resources/naruto3.jpg';

class Catalogue extends Component {
  state = {
    productlist: [
      {
        name: 'Blah blah bleh',
        rent: 1200,
        seller: 'Rajeev Khanna',
        image: naruto,
        rating: 4
      },
      {
        name: 'Blah lah bleh',
        rent: 120,
        seller: 'Ravi Khan',
        image: naruto2,
        rating: 3.7
      },
      {
        name: 'Blah lah bleh',
        rent: 120,
        seller: 'Ravi',
        image: naruto3,
        rating: 3.9
      }
    ]
  };

  list = [...this.state.productlist, ...this.state.productlist, ...this.state.productlist];

  render() {
    return (
      <PageLayout>
        <div style={{ padding: '0 20px' }} />
        <div className="container">
          <Row>
            <div style={{ padding: '5px 10%', overflow: 'hidden' }}>
              <Col lg={20} md={24} style={{ paddingBottom: '10px' }}>
                <Button className="filterButtons">Category</Button>
                <Button className="filterButtons">Brand</Button>
                <Button className="filterButtons">Price</Button>
                <Button className="filterButtons">Dates</Button>
                <Button className="filterButtons">More Filters</Button>
              </Col>
              <Col lg={4} md={24}>
                <span>
                  <span style={{ margin: '0 10px 15px 10px' }}>Map view</span>
                  <Switch />
                </span>
              </Col>
            </div>
            <hr style={{ border: '0.5px solid #ddd', marginBottom: '15px' }} />
            <div style={{ padding: '0 10%' }}>
              {/* <Col span={24}>
                <h2 style={{ fontWeight: 'bold', margin: '15px 0' }}>
                  <strong>Explore gear for your project or occasion</strong>
                </h2>
                <Row gutter={16}>
                  <LeftArrow />{' '}
                  {this.list.map(item => (
                    <Col md={6} sm={12}>
                      <FilterCards item={item} />
                    </Col>
                  ))}{' '}
                  <RightArrow />
                </Row>
              </Col> */}
              {/* <b />
              <Col span={24}>
                <h2 style={{ fontWeight: 'bold', margin: '15px 0' }}>
                  <strong>Most popular products</strong>
                </h2>
                <Row gutter={16}>
                  {this.list.map(item => (
                    <Col md={6} sm={12}>
                      <SimpleCard item={item} />
                    </Col>
                  ))}
                </Row>
              </Col>
              <br /> */}
              <Col span={24}>
                <h2 style={{ fontWeight: 'bold', margin: '15px 0' }}>
                  <strong>All listings</strong>
                </h2>
                <SuggestedCardList relatedList={this.list} />
              </Col>
            </div>
          </Row>
        </div>
      </PageLayout>
    );
  }
}

export default Catalogue;
