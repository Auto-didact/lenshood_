import React, { Component } from "react";
import { Layout, Row, Col, Breadcrumb, Card } from "antd";
import { PageLayout } from "@gqlapp/look-client-react";
// import './resources/listingCatalogue.css';
import AccDetailsMenu from "./components/AccDetailsMenu";
import DetailsCard from "./components/DetailsCard";
import ProductCalender from "./components/ProductCalender";
import ReviewsCard from "./components/ReviewsCard";
import naruto4 from "./resources/naruto4.jpg";
import naruto3 from "./resources/naruto3.jpg";

class MyListDetails extends Component {
  state = {
    product: {
      description: "Blah blah bleh",
      listingRental: { perDay: 1200 },
      listingImages: [naruto4, naruto3],
      rating: 4,
      reviews: 7,
      status: "On Rent"
    },
    reviews: {
      properties: {
        "image quality": 5.0,
        "Auto focus and lighting": 3.7,
        Performance: 4.0,
        Features: 5.0,
        Design: 4.0
      },
      reviewers: [
        {
          name: "Sree Bhargav",
          Date: "18th Aug 2018",
          word:
            "Really an awesome experience with this DSLR. Photo quality is too good. Zoom capability is also awesome, especially at 250mm. Wifi function along with canon app in android simply makes the product must to buy."
        },
        {
          name: "Ankit Jain",
          Date: "18th Dec 2018",
          word:
            "Really an awesome experience with this DSLR. Photo quality is too good"
        }
      ]
    },
    myBookings: {
      start: "2019-06-20",
      end: "2019-06-22"
    },
    bookings: [
      {
        name: "Rajeev Khanna",
        rating: 4,
        start: "2019-07-01",
        end: "2019-07-12"
      },
      {
        name: "Mukesh Babu",
        rating: 2.2,
        start: "2019-06-15",
        end: "2019-06-16"
      },
      {
        name: "BIshal Deb",
        rating: 3.7,
        start: "2019-06-25",
        end: "2019-06-30"
      }
    ]
  };

  render() {
    return (
      <PageLayout>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>Account</Breadcrumb.Item>
          <Breadcrumb.Item href=""> My listing</Breadcrumb.Item>
        </Breadcrumb>
        <Layout className="layoutList">
          <Row className="layoutRow">
            <Col lg={7} md={24}>
              <AccDetailsMenu select={3} />
            </Col>
            <Col lg={15} md={24}>
              <DetailsCard buttonText="Edit" item={this.state.product} />
              <Card>
                <ProductCalender bookings={this.state.bookings} myBookings={this.state.myBookings} />
              </Card>
              <ReviewsCard reviews={this.state.reviews} />
            </Col>
          </Row>
        </Layout>
      </PageLayout>
    );
  }
}

export default MyListDetails;
