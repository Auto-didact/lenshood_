import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Carousel,
  Icon,
  Divider,
  CardText,
  Card,
  Button
} from "antd";
import { ImgCamera } from "../../constants/DefaultImages";
import { ListingsMessage } from "../../helpers/SocialSharingMessage";
import { SocialSharingButtons } from "@gqlapp/look-client-react";

// import '../resources/listingCatalogue.css';
// To Do Carousel Arrows;
// function SampleNextArrow(props) {
//   const { className, onClick } = props;
//   return <Icon type="right-circle" className={className} onClick={onClick} />;
// }
//
// function SamplePrevArrow(props) {
//   const { className, onClick } = props;
//   return (
//     <Button>
//       <Icon type="left-circle" className={className} onClick={onClick} />
//     </Button>
//   );
// }

class ProductCardComponent extends Component {
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
    const images =
      listing && listing.listingImages && listing.listingImages.length !== 0
        ? listing.listingImages
        : ImgCamera;
    const replacementValue =
      (listing &&
        listing.listingRental &&
        listing.listingRental.replacementValue) ||
      null;
    const description = (listing && listing.description) || null;
    const listingContent = (listing && listing.listingContent) || null;
    const cancellationPolicy = this.props.cancellationPolicy;
    const damagePolicy = this.props.damagePolicy;

    const status = {
      customPaging: function(i) {
        return (
          <a>
            <img
              src={images[i].imageUrl}
              style={{ width: "30px", height: "30px" }}
            />
          </a>
        );
      },

      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true

      // nextArrow: <SampleNextArrow />,
      // prevArrow: <SamplePrevArrow />
    };

    const message = ListingsMessage(
      listing.id,
      listing.user.username,
      listing.gearCategory,
      listing.gearSubcategory
    );

    return (
      <div style={{ paddingRight: "4px", paddingTop: "5px" }}>
        <div style={{ marginLeft: "10px", marginRight: "10px" }}>
          <Carousel autoplay ref={node => (this.carousel = node)} {...status}>
            {images.map((item, id) => (
              <div key={id} align="center">
                <img src={item.imageUrl} style={{ height: "300px" }} />
              </div>
            ))}
          </Carousel>
        </div>

        <Row>
          {replacementValue && (
            <Col span={12}>
              <strong className="mainColor font12">Replacement Value</strong>
              <span className="mainColor font14">
                {" "}
                &#8377; {replacementValue} /-{" "}
              </span>
            </Col>
          )}
          {/* <Col span={12}>
            <Link to="" className="font14 mainColor rightfloat">
              COMPARE PRODUCT(To do)
            </Link>
          </Col> */}
        </Row>

        {/* <h3 className="font16 blockDisplay fontBold">Specifications</h3>
        <ul>
          {listing.Specification.map(item => (
            <li className="font14">{item}</li>
          ))}
        </ul> */}
        <Divider />
        <div>
          {description && (
            <div>
              <h3 className="font16 blockDisplay fontBold">Description</h3>
              <p className="font14">{description}</p>
            </div>
          )}

          {listing.listingDetail && listing.listingDetail.age && (
            <div>
              <h3 className="font16 blockDisplay fontBold">Age</h3>
              <p>{listing.listingDetail.age}</p>
            </div>
          )}
          {/*  <h4>Damages</h4>

          listing.listingDetail && listing.listingDetail.damages ? (
            listing.listingDetail.damages.map(damage => (
              <div>
                <img alt="" src={damage.imageUrl} className="relatedCardImg" />
                <h5>{damage.damageDetail}</h5>
              </div>
            ))
          ) : (
            <CardText>"Not Provided"</CardText>
          )*/}
        </div>
        <br />
        <h3 className="font16 blockDisplay fontBold">Gear Components</h3>
        {listingContent.length !== 0
          ? listingContent.map((item, id) => (
              <div key={id}>
                <span className="itemGearPC" />
                {item.gear} {item.brand} {item.model}
              </div>
            ))
          : "Gear Components Not Provided"}
        <br />
        <br />
        <h3 className="font16 blockDisplay fontBold">Cancellation Policy</h3>
        <p className="font14">{cancellationPolicy}</p>
        <br />
        <h3 className="font16 blockDisplay fontBold">Damage Policy</h3>
        <p className="font14">{damagePolicy}</p>
        <br />
        <div className="marginB20">
          <h3 className="font16 blockDisplay fontBold"> Sharing Options</h3>
          <SocialSharingButtons {...message} />
        </div>
      </div>
    );
  }
}

export default ProductCardComponent;
