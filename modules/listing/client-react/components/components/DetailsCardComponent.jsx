import React, { Component } from "react";
// import '../resources/listingCatalogue.css';
import { Icon, Button, Row, Col, Card, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import { ImgCamera } from "../../constants/DefaultImages";
import { IDLE, ONSHELF } from "../../constants/ListingStates";
import { MyListingsMessage } from "../../helpers/SocialSharingMessage";
import { SocialSharingButtons } from "@gqlapp/look-client-react";

class DetailsCardComponent extends Component {
  render() {
    const item = this.props.item;

    const buttonText = this.props.buttonText;

    function cancel(e) {
      console.log(e);
      message.error("Click on No");
    }

    const message = MyListingsMessage(
      item.id,
      item.gearCategory,
      item.gearSubcategory
    );

    return (
      <Card
        className="DetailsCard"
        hoverable
        bodyStyle={{
          padding: "0px"
        }}
      >
        <Row type="flex" justify="space-around" align="middle">
          <Col
            xs={{ span: 24 }}
            md={{ span: 9 }}
            xxl={{ span: 6 }}
            className="DetailsCardCol"
            align="center"
          >
            <img
              className="DetailsCardImg"
              alt=""
              src={
                item.listingImages.length !== 0
                  ? item.listingImages[0].imageUrl
                  : ImgCamera[0].imageUrl
              }
            />
          </Col>
          <Col
            xs={{ span: 24 }}
            md={{ span: 15 }}
            xxl={{ span: 18 }}
            className="DetailsCardCol"
          >
            <div style={{ padding: "10px", align: "center" }}>
              {item.status === ONSHELF ? (
                <h6 className="OnShelfTag font12 borderRadius9">{ONSHELF}</h6>
              ) : (
                <h6 className="OnRentTag font12 borderRadius9">{IDLE}</h6>
              )}
              <h3 className="DetailsCardHeading">
                {item.listingContent
                  ? item.listingContent.length !== 0
                    ? item.listingContent.map((gear, id) => (
                        <span key={id}>{`${gear.brand} ${gear.gear} / `}</span>
                      ))
                    : "Info Not Provided"
                  : "Info Not Provided"}
              </h3>
              {/*<h5>
                <span className="StarRate">
                  {item.rating} <Icon type="star" theme="filled" />
                </span>
                <span className="mainColor"> ({item.reviews})</span>
              </h5>*/}
              <h5 className="marginB20">
                <strong>&#8377; {item.listingRental.perDay} per day</strong>
              </h5>

              <div style={{ height: "50px" }}>
                <SocialSharingButtons {...message} />
              </div>
              <Row style={{ marginBottom: "8px" }}>
                <Col span={12} align="left" style={{ paddingLeft: "20px" }}>
                  <Link to={`/listing/${item.id}`}>
                    <Button shape="circle" size="large">
                      <Icon type="edit" />
                    </Button>
                  </Link>
                </Col>
                <Col span={12} align="right" style={{ paddingRight: "20px" }}>
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
                  <Button
                    type="primary"
                    block
                    onClick={e => this.props.toggle(item.id, e)}
                  >
                    {item.status === ONSHELF ? "Move to Idle" : "Move to Shelf"}
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
