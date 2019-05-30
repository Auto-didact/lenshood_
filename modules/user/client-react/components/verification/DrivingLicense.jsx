import React, { Component } from "react";
import PropTypes from "prop-types";
import { CardText, Row, Col } from "@gqlapp/look-client-react";
import { Card, Avatar } from "antd";

const DrivingLicense = ({ dl }) => {
  if (!dl) {
    return <h4>Unavailable</h4>;
  } else {
    return (
      <Card title="Your Driving License">
        <Row>
          <Col span={10}>
            <Avatar
              shape="square"
              size={150}
              src={
                dl && dl.imageUrl
                  ? dl.imageUrl
                  : "https://cdn.pixabay.com/photo/2016/10/05/17/26/priest-1717195_960_720.jpg"
              }
            />

            <h4>DOB : {dl && dl.dob ? dl.dob : "Not Available"}</h4>
            <h4>
              Issue Date : {dl && dl.issueDate ? dl.issueDate : "Not Available"}
            </h4>
            <h4>
              Created At : {dl && dl.createdAt ? dl.createdAt : "Not Available"}
            </h4>
            <h4>
              Updated At : {dl && dl.updatedAt ? dl.updatedAt : "Not Available"}
            </h4>
          </Col>
          <Col span={14}>
            <h4>
              Transaction Id :{" "}
              {dl && dl.transactionId ? dl.transactionId : "Not Available"}
            </h4>
            <h4>
              Driving LicenseId :{" "}
              {dl && dl.drivingLicenseId
                ? dl.drivingLicenseId
                : "Not Available"}
            </h4>

            <h4>COV : {dl && dl.cov ? dl.cov : "Not Available"}</h4>
            <h4>
              BloodGroup :{" "}
              {dl && dl.bloodGroup ? dl.bloodGroup : "Not Available"}
            </h4>

            <h4>
              Father Or Husband :{" "}
              {dl && dl.fatherOrHusband ? dl.fatherOrHusband : "Not Available"}
            </h4>

            <h4>Address : {dl && dl.address ? dl.address : "Not Available"}</h4>
            <h4>
              Validity Transport :{" "}
              {dl && dl.validityTransport
                ? dl.validityTransport
                : "Not Available"}
            </h4>
            <h4>
              Validity Non Transport :{" "}
              {dl && dl.validityNonTransport
                ? dl.validityNonTransport
                : "Not Available"}
            </h4>
          </Col>
        </Row>
      </Card>
    );
  }
};

export default DrivingLicense;
