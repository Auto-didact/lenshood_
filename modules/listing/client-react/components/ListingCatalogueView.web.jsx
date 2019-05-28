import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { translate } from "@gqlapp/i18n-client-react";
import { PageLayout, Pagination } from "@gqlapp/look-client-react";
import { Row, Col, Button, Switch } from "antd";
import settings from "../../../../settings";

import SuggestedCardList from "./components/SuggestedCardList";

const { itemsNumber, type } = settings.pagination.web;

const Loading = ({ t }) => (
  <div className="text-center">{t("listing.loadMsg")}</div>
);
Loading.propTypes = { t: PropTypes.func };

const NoListingsMessage = ({ t }) => (
  <div className="text-center">{t("listing.noListingsMsg")}</div>
);
NoListingsMessage.propTypes = { t: PropTypes.func };

const ListingList = ({ loading, listings, t, loadData }) => {
  const handlePageChange = (pagination, pageNumber) => {
    const {
      pageInfo: { endCursor }
    } = listings;
    pagination === "relay"
      ? loadData(endCursor + 1, "add")
      : loadData((pageNumber - 1) * itemsNumber, "replace");
  };

  const RenderListings = () => (
    <Fragment>
      <ListingCatalogueView listings={listings.edges.map(({ node }) => node)} />
      <Pagination
        itemsPerPage={listings.edges.length}
        handlePageChange={handlePageChange}
        hasNextPage={listings.pageInfo.hasNextPage}
        pagination={type}
        total={listings.totalCount}
        loadMoreText={t("list.btn.more")}
        defaultPageSize={itemsNumber}
      />
    </Fragment>
  );

  return (
    <PageLayout>
      {/* Render metadata */}
      <Helmet
        title={`${settings.app.name} - ${t("list.title")}`}
        meta={[
          {
            name: "description",
            content: `${settings.app.name} - ${t("list.meta")}`
          }
        ]}
      />
      {/* Render loader */}
      {loading && !listings && <Loading t={t} />}
      {/* Render main listing content */}
      {listings && listings.totalCount ? (
        <RenderListings />
      ) : (
        <NoListingsMessage t={t} />
      )}
    </PageLayout>
  );
};

ListingList.propTypes = {
  loading: PropTypes.bool.isRequired,
  listings: PropTypes.object,
  loadData: PropTypes.func,
  t: PropTypes.func
};

class ListingCatalogueView extends Component {
  render() {
    // console.log(this.props.listings);
    return (
      <div>
        <div className="Pad20" />
        <div className="container">
          <Row
            md={{
              borderLeft: "3px solid #23b195",
              borderRight: "3px solid #23b195",
              background: "#dbf8f2"
            }}
          >
            {/* <div className="RowDiv"> */}
            {/* <Col lg={20} md={24} classNmae="PadB10">
                <Row gutter={16}>
                  <Col md={4} xs={8}>
                    <Button className="filterButtons">Category</Button>
                  </Col>
                  <Col md={4} xs={8}>
                    <Button className="filterButtons">Brand</Button>
                  </Col>
                  <Col md={4} xs={8}>
                    <Button className="filterButtons">Price</Button>
                  </Col>
                  <Col md={4} xs={8}>
                    <Button className="filterButtons">Dates</Button>
                  </Col>
                  <Col md={4} xs={8}>
                    <Button className="filterButtons">More Filters</Button>
                  </Col>
                </Row>
              </Col> */}
            {/* <Col lg={4} md={24}>
                <span>
                  <span className="mapView">Map view</span>
                  <Switch />
                </span>
              </Col> */}
            {/* </div> */}
            {/* <hr className="CatalogueHr" /> */}
            <div className="pad10">
              {/* <Col span={24}>
                <h2 className="headingTop">
                  <strong>Explore gear for your project or occasion</strong>
                </h2>
                <Row gutter={16}>
                  <LeftArrow />{' '}
                  {this.list.map(item => (
                    <Col md={6} sm={12}>
                      <FilterCards item={item} />
                    </Col>
                  ))}{' '}
                  <RightArrow />
                </Row>
              </Col> */}
              {/* <b />
              <Col span={24}>
                <h2 className="headingTop">
                  <strong>Most popular products</strong>
                </h2>
                <Row gutter={16}>
                  {this.list.map(item => (
                    <Col md={6} sm={12}>
                      <SimpleCard item={item} />
                    </Col>
                  ))}
                </Row>
              </Col>
              <br /> */}
              <Col span={24}>
                <h2 className="headingTop">
                  <strong>All listings</strong>
                </h2>
                <SuggestedCardList relatedList={this.props.listings} />
              </Col>
            </div>
          </Row>
        </div>
      </div>
    );
  }
}

ListingCatalogueView.propTypes = {
  listings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      gearCategory: PropTypes.string.isRequired,
      gearSubcategory: PropTypes.string.isRequired
    })
  ).isRequired
};

export default translate("listing")(ListingList);
