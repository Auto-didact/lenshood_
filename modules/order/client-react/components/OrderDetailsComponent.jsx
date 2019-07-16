import React, { Component } from 'react';
import { Icon, Button, Row, Col, Card, Rate, Avatar } from 'antd';
import { ImgCamera } from '@gqlapp/listing-client-react';
import { BORROWED } from '../constants/OrderStates';

class OrderDetailsComponent extends Component {
  render() {
    const item = this.props.item;

    return (
      <Card
        className="boxShadowTheme borderRadius9 marginT20"
        hoverable
        bodyStyle={{
          padding: '0px'
        }}
      >
        {/* <Row type="flex" justify="space-around" align="middle">
          <Col xs={{ span: 24 }} md={{ span: 9 }} xxl={{ span: 6 }} className="DetailsCardCol" align="center">
            <img className="orderImage" alt="" src={item.image.length !== 0 ? item.image : ImgCamera[0].imageUrl} />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 15 }} xxl={{ span: 18 }} className="DetailsCardCol">
            <div style={{ padding: '10px', align: 'center' }}>
              <Button type="primary" ghost size="small" block onClick={e => this.props.setTrackList(item.id)}>
                <Icon type="environment" theme="filled" /> Track
              </Button>
              <h3 className="itemName">{item.name ? <span>{item.name}</span> : 'Info Not Provided'}</h3>


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
              <Row gutter={13} align="middle">
                <Col span={12}>
                  <Button type="primary" block onClick={e => this.props.toggle(item.id, e)}>
                    {item.status === ONSHELF ? 'Move to Idle' : 'Move to Shelf'}
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
 */}
        <Row>
          <Col span={24} className="marginB10 PadA10">
            <Col sm={19} xs={24}>
              <span className="itemName">{item.id}</span>
            </Col>
            <Col sm={5} xs={12}>
              <Button type="primary" ghost size="small" block onClick={e => this.props.setTrackList(item.id)}>
                <Icon type="environment" theme="filled" /> Track
              </Button>
            </Col>
          </Col>
          <br />
          <Col md={7} sm={9} xs={24} style={{ paddingLeft: '52px' }}>
            <img height={140} src={item.image} alt="" className="width100" />
          </Col>

          <Col md={17} sm={15} xs={24} className="PadA10">
            <h4 className="itemName">{item.name}</h4>

            <Col sm={14} xs={24}>
              <h4 className="itemDetails">
                {item.details}{' '}
                <span className="colorcursor">
                  <Icon type="car" theme="filled" />
                </span>
              </h4>
              <p className="orderstartend">
                {item.date.start} - {item.date.end}
              </p>
              <Col sm={5} xs={6}>
                <Avatar src={item.userimg} />
              </Col>
              <Col sm={19} xs={18}>
                <h4 className="font12">
                  {item.seller}
                  <br />
                  <p className="font10 mainColor">
                    {' '}
                    <Rate disabled defaultValue={item.stars} className="font10 mainColor" />
                  </p>
                </h4>
              </Col>
            </Col>
            <Col sm={10} xs={24}>
              <Button type="primary" size="small" className="CancelRequest font12" block>
                Cancel booking
              </Button>
              <Button type="primary" className="CancelRequest font12" size="small" block>
                Request Extension
              </Button>
            </Col>
          </Col>
          <Col span={24} className="orderTotalDate">
            <h4>
              <Col sm={17} xs={24}>
                <span className="orderGrey">{item.status === BORROWED ? 'Ordered' : 'Lended'} on</span> {item.orderDate}{' '}
              </Col>
              <Col sm={7} xs={24}>
                <span className="orderGrey">
                  <span>{item.status === BORROWED ? 'Order' : 'Lend'} Total</span> &#8377; {item.orderTotal}
                </span>
              </Col>
            </h4>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default OrderDetailsComponent;
