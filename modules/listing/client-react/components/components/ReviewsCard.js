import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Rate, List, Row, Col, Card, Avatar } from 'antd';
// import '../resources/listingCatalogue.css';

class ReviewsCard extends Component {
  averageReviews(array) {
    var total = 0,
      len = 0;
    for (var key in array) {
      total = total + array[key];
      len = len + 1;
    }
    return total / 5;
  }
  render() {
    let reviews = this.props.reviews;
    return (
      <Card
        style={{
          textAlign: 'justify',
          margin: '20px 0',
          boxShadow: '0 0 8px 4px rgba(49, 196, 167, 0.04)'
        }}
      >
        <h4>
          {reviews.reviewers.length} reviews on this item{' '}
          <Rate
            disabled
            defaultValue={this.averageReviews(reviews.properties)}
            style={{ color: '#23b195', fontSize: '10px', margin: '0 4px' }}
          />{' '}
          <h5 style={{ display: 'inline' }}>{this.averageReviews(reviews.properties)}</h5>
        </h4>
        <Row>
          {Object.entries(reviews.properties).map(([key, value]) => (
            <Col lg={12} sm={24}>
              {key}
              <div style={{ float: 'right' }}>
                <h5 style={{ display: 'inline', marginRight: '5px' }}>{value}</h5>{' '}
                <Rate
                  disabled
                  defaultValue={value}
                  style={{
                    color: '#23b195',
                    fontSize: '10px',
                    margin: '0 4px'
                  }}
                />{' '}
              </div>
            </Col>
          ))}
        </Row>
        <List
          style={{ marginTop: '30px' }}
          itemLayout="horizontal"
          dataSource={reviews.reviewers}
          renderItem={item => (
            <List.Item style={{ marginBottom: '20px' }}>
              <List.Item.Meta
                avatar={<Avatar />}
                title={
                  <div
                    style={{
                      lineHeight: '18px',
                      color: ' #4a4a4a',
                      fontSize: '14px'
                    }}
                  >
                    <Link to="" style={{ color: ' #000', fontWeight: 500 }} href="#">
                      {item.name}
                    </Link>
                    <h5>{item.Date}</h5>
                  </div>
                }
                description={<h5 style={{ lineHeight: '18px' }}>{item.word}</h5>}
              />
            </List.Item>
          )}
        />
        <Link to="">
          <h3 style={{ color: '#23b195' }}>Show all reviews</h3>
        </Link>
      </Card>
    );
  }
}

export default ReviewsCard;
