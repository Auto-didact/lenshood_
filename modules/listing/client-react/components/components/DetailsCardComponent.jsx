import React, { Component } from 'react';
// import '../resources/listingCatalogue.css';
import { Icon, Button, Row, Col, Card, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';
import { ImgCamera } from '../../constants/DefaultImages';

class DetailsCardComponent extends Component {
  render() {
    const item = this.props.item;

    const buttonText = this.props.buttonText;


    function cancel(e) {
      console.log(e);
      message.error('Click on No');
    }

    return (
      <Card
        className="DetailsCard"
        hoverable
        bodyStyle={{
          padding: '0px'
        }}
      >
        <Row type="flex" justify="space-around" align="middle">
          <Col xs={{ span: 24 }} md={{ span: 9 }} xxl={{ span: 6 }} className="DetailsCardCol" align="center">
            <img
              className="DetailsCardImg"
              alt=""
              src={item.listingImages.length !== 0 ? item.listingImages[0].imageUrl : ImgCamera[0].imageUrl}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 15 }} xxl={{ span: 18 }} className="DetailsCardCol">
            <div style={{ padding: '10px', align: 'center' }}>
              {item.status === 'On Rent' ? (
                <h6 className="OnRentTag">On Rent</h6>
              ) : (
                <h6 className="OnShelfTag">On Shelf</h6>
              )}
              <h3 className="DetailsCardHeading">
                {item.listingContent
                  ? item.listingContent.length !== 0
                    ? item.listingContent.map(gear => <span>{`${gear.brand} ${gear.gear} / `}</span>)
                    : 'Info Not Provided'
                  : 'Info Not Provided'}
              </h3>
              {/*<h5>
                <span className="StarRate">
                  {item.rating} <Icon type="star" theme="filled" />
                </span>
                <span className="mainColor"> ({item.reviews})</span>
              </h5>*/}
              <h5 className="marginB25">
                <strong>&#8377; {item.listingRental.perDay} per day</strong>
              </h5>
              <Row style={{ marginBottom: '8px' }}>
                <Col span={12} align="left" style={{ paddingLeft: '20px' }}>
                  <Link to={`/listing/${item.id}`}>
                    <Button shape="circle" size="large">
                      <Icon type="edit" />
                    </Button>
                  </Link>
                </Col>
                <Col span={12} align="right" style={{ paddingRight: '20px' }}>
                  <Popconfirm
                    title="Are you sure to delete this listing?"
                    onConfirm={e => this.props.DeleteListing(item.id, e)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="danger" shape="circle" size="large">
                      <Icon type="delete" />
                    </Button>
                  </Popconfirm>
                </Col>
              </Row>
              <Row gutter={13} align="center">
                <Col span={12}>

                  <Button
                    type="primary"
                    block
                    onClick={e => this.props.toggle(item.id, e)}
                  >
                    {item.status === "On Shelf"
                      ? "Move to Idle"
                      : "Move to Shelf"}
                  </Button>

                </Col>
                <Col span={12}>
                  <Button type="primary" block>
                    View Listing
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default DetailsCardComponent;
