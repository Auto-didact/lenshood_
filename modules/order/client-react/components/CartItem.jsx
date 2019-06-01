import React from "react";
// import { TranslateFunction } from "@gqlapp/i18n-client-react";
import { Row, Col, Button, Icon, DatePicker, Modal } from "antd";
import moment from "moment";

export default class CartItem extends React.Component {
  state = {
    startValue: moment(this.props.products.date.start, "DD-MM-YY"),
    endValue: moment(this.props.products.date.end, "DD-MM-YY"),
    endOpen: false
  };
  disabledStartDate = startValue => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };
  disabledEndDate = endValue => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  onStartChange = value => {
    this.onChange("startValue", value);
  };

  onEndChange = value => {
    this.onChange("endValue", value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };
  cancelChange() {
    this.setState({
      startValue: moment(this.props.products.date.start, "DD-MM-YY"),
      endValue: moment(this.props.products.date.end, "DD-MM-YY")
    });
    this.props.setModal1Visible();
  }
  render() {
    let product = this.props.products;
    const { startValue, endValue, endOpen } = this.state;
    return (
      <Row className="cartitem borderRadius9">
        <div className="listcloseicons">
          <Button
            onClick={() => this.cancelChange()}
            className="borderzero listclose"
          >
            <Icon type="edit" />
          </Button>
          <Modal
            title="Edit Product"
            centered
            visible={this.props.modal1Visible}
            onOk={() =>
              this.props.editProduct(
                product.id,
                this.state.startValue,
                this.state.endValue
              )
            }
            onCancel={() => this.cancelChange()}
          >
            <h3>
              <strong>{product.name}</strong>
            </h3>
            <h4>Change Dates:</h4>
            <DatePicker
              size="small"
              disabledDate={this.disabledStartDate}
              format="DD-MM-YY"
              value={startValue}
              placeholder="Start"
              onChange={this.onStartChange}
              onOpenChange={this.handleStartOpenChange}
            />
            <DatePicker
              size="small"
              disabledDate={this.disabledEndDate}
              format="DD-MM-YY"
              value={endValue}
              placeholder="End"
              onChange={this.onEndChange}
              open={endOpen}
              onOpenChange={this.handleEndOpenChange}
            />
            <br />
            <br />
            <h4>No of days : {endValue.diff(startValue, "days") + 1}</h4>
          </Modal>
          <Button
            className="borderzero listclose"
            onClick={() => this.props.deleteProduct()}
          >
            <Icon type="close" />
          </Button>
        </div>
        <Col sm={8} xs={24}>
          <img alt="" src={product.image} />
        </Col>
        <Col sm={16} xs={24} className="ColPad">
          <Row className="font12">
            <Col md={16} sm={24}>
              <h3 className="productname">{product.name}</h3>
            </Col>
            <br/>
            {/* <Col lg={12} sm={12} xs={14} className="font11h"> */}
              {/* Refundundable deposit
              <br />
              <strong className="colorCursor">&#8377; {product.refund}</strong>
              <br />
              <br /> */}
              {/* Rental period <br />
              <strong>
                {product.date.start} - {product.date.end}
              </strong>
            </Col> */}
            <Col lg={16} sm={24}>
            <Col span={12} className="font11h">
              Rent <br />
              <strong>&#8377; {product.rent}</strong></Col>
              <Col span={12} className="font11h">
              {/* <br />
              <br /> */}
              Days: <br />
              <strong>{product.days}</strong>
            </Col>
            </Col>
            <Col md={16} sm={24} className="marginT20">
              <p className="font11h">Rental period <br />
              <strong>
                {product.date.start} - {product.date.end}
              </strong></p>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
