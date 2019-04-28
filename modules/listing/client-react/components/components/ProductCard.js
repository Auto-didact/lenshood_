import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Carousel, Card, Icon } from "antd";
// import '../resources/listingCatalogue.css';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.carousel = React.createRef();
  }

  next() {
    this.carousel.next();
  }

  previous() {
    this.carousel.prev();
  }
  render() {
    const listing = this.props.listing;
    const images = listing.listingImages;
    const replacementValue = listing.listingRental.replacementValue;
    const description = listing.description;
    const packageContents = listing.listingContent;
    const status = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Card className="justifyAlign">
        <Row>
          <Col sm={3} md={2}>
            <h1 className="caroIcon">
              <Icon type="left-circle" onClick={this.previous} />
            </h1>
          </Col>
          <Col sm={18} md={20}>
            <Carousel ref={node => (this.carousel = node)} {...status}>
              {images.map(item => (
                <div>
                  <img src={item.imageUrl} alt="" className="CaraImg" />
                </div>
              ))}
            </Carousel>
          </Col>
          <Col sm={3} md={2}>
            <h1 className="caroIcon">
              <Icon type="right-circle" onClick={this.next} />
            </h1>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <strong className="mainColor font12">Replacement Value</strong>
            <span className="mainColor font14">
              {" "}
              &#8377; {replacementValue} /-{" "}
            </span>
          </Col>
          {/* <Col span={12}>
            <Link to="" className="font14 mainColor rightfloat">
              COMPARE PRODUCT(To do)
            </Link>
          </Col> */}
        </Row>
        <br />
        {/* <h3 className="font16 blockDisplay fontBold">Specifications</h3>
        <ul>
          {listing.Specification.map(item => (
            <li className="font14">{item}</li>
          ))}
        </ul> */}
        <hr className="PChr" />
        <h3 className="font16 blockDisplay fontBold">Description</h3>
        <p className="font14">{description}</p>
        <br />
        <h3 className="font16 blockDisplay fontBold">In the package</h3>
        {packageContents.map(item => (
          <div className="Inline-blockDisplay width50 font14">
            <span className="itemGearPC" />
            {item.gear}
          </div>
        ))}
        <br />
        <br />
        <h3 className="font16 blockDisplay fontBold">Cancellation Policy</h3>
        <p className="font14">{listing.cancellationPolicy}</p>
        <br />
        <h3 className="font16 blockDisplay fontBold">Damage Policy</h3>
        <p className="font14">{listing.damagePolicy}</p>
      </Card>
    );
  }
}

export default ProductCard;
