import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { translate } from '@gqlapp/i18n-client-react';
import SuggestedCardListComponent from '@gqlapp/listing-client-react';
import { PageLayout, Pagination, Loader } from '@gqlapp/look-client-react';
import { Row, Col, Button, Switch } from 'antd';
import settings from '../../../../../../settings';

const { itemsNumber, type } = settings.pagination.web;

const Loading = ({ t }) => <Loader text={t('listing.loadMsg')} />;
Loading.propTypes = { t: PropTypes.func };

const NoListingsMessage = ({ t }) => (
  <div className="text-center">
    {t('listing.noListingsMsg')}
    {console.log('t', t)}
  </div>
);
NoListingsMessage.propTypes = { t: PropTypes.func };

const FeaturedListingList = ({ loading, featuredListings, t, loadData }) => {
  const handlePageChange = (pagination, pageNumber) => {
    const {
      pageInfo: { endCursor }
    } = featuredListings;
    pagination === 'relay' ? loadData(endCursor + 1, 'add') : loadData((pageNumber - 1) * itemsNumber, 'replace');
  };

  const RenderListings = () => (
    <Fragment>
      <div>
        <FeaturedListingView listings={featuredListings.edges.map(({ node }) => node)} />
        <Pagination
          itemsPerPage={featuredListings.edges.length}
          handlePageChange={handlePageChange}
          hasNextPage={featuredListings.pageInfo.hasNextPage}
          pagination={type}
          total={featuredListings.totalCount}
          loadMoreText={t('list.btn.more')}
          defaultPageSize={itemsNumber}
        />
      </div>
    </Fragment>
  );

  return (
    <>
      {/* <PageLayout> */}
      {/* Render metadata */}
      <Helmet
        title={`${settings.app.name} - ${t('list.title')}`}
        meta={[
          {
            name: 'description',
            content: `${settings.app.name} - ${t('list.meta')}`
          }
        ]}
      />
      {/* Render loader */}
      {loading && !featuredListings && <Loading t={t} />}
      {/* Render main listing content */}
      {featuredListings && featuredListings.totalCount ? (
        <RenderListings />
      ) : !loading ? (
        <NoListingsMessage t={t} />
      ) : null}
      {/* </PageLayout> */}
    </>
  );
};

FeaturedListingList.propTypes = {
  loading: PropTypes.bool.isRequired,
  featuredListings: PropTypes.object,
  loadData: PropTypes.func,
  t: PropTypes.func
};

class FeaturedListingView extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
            <h2 className="headingTop" style={{ textAlign: 'center' }}>
              <strong>Featured listings</strong>
            </h2>
            <SuggestedCardListComponent relatedList={this.props.featuredListings} />
          </Col>
        </Row>
      </div>
    );
  }
}

FeaturedListingView.propTypes = {
  featuredListings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired
      // gearCategory: PropTypes.string.isRequired,
      // gearSubcategory: PropTypes.string.isRequired
    })
  ).isRequired
};

export default translate('listing')(FeaturedListingList);
