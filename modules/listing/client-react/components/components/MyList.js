import React, { Component } from 'react';
import '../resources/listingCatalogue.css';
import { Layout, Button, Row, Col } from 'antd';
import DetailsCard from './DetailsCard';

const ButtonGroup = Button.Group;
const { Content } = Layout;

class MyListingProducts extends Component {
  state = {
    value: 'On Rent'
  };
  classNamesgroup(e) {
    if (this.state.value === e) {
      return 'btnActive';
    } else {
      return 'btn';
    }
  }
  FilterItems(e) {
    this.setState({ value: e });
  }
  returnItem(item) {
    return <DetailsCard buttonText="View" item={item} />;
  }
  renderItem(item) {
    if (item.nature === this.state.value) {
      return this.returnItem(item);
    }
  }
  render() {
    return (
      <Content style={{ padding: '0 30px 0 30px', minHeight: 280, minWidth: '100%' }}>
        <Row>
          <Col md={10} xs={8}>
            <h2 style={{ fontSize: '23px', fontWeight: 'bold' }}>My Listings</h2>
            <br />
          </Col>
          <Col md={14} xs={16}>
            <ButtonGroup style={{ width: '100%' }}>
              <Button onClick={e => this.FilterItems('all')} className={this.classNamesgroup('all')}>
                All
              </Button>
              <Button onClick={e => this.FilterItems('On Shelf')} className={this.classNamesgroup('On Shelf')}>
                On Shelf
              </Button>
              <Button onClick={e => this.FilterItems('On Rent')} className={this.classNamesgroup('On Rent')}>
                On Rent
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        {this.props.products
          ? this.props.products.map(item =>
              this.state.value === 'all' ? this.returnItem(item) : this.renderItem(item)
            )
          : null}
      </Content>
    );
  }
}

export default MyListingProducts;
