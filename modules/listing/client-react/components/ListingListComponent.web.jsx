/* eslint-disable react/display-name */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Popconfirm, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout, Table, Button, Pagination, Loader } from '@gqlapp/look-client-react';
import ListingDrawerComponent from './ListingDrawerComponent';
import settings from '../../../../settings';

const { itemsNumber, type } = settings.pagination.web;

const Loading = ({ t }) => <Loader text={t('listing.loadMsg')} />;
Loading.propTypes = { t: PropTypes.func };

const NoListingsMessage = ({ t }) => <div className="text-center">{t('listing.noListingsMsg')}</div>;
NoListingsMessage.propTypes = { t: PropTypes.func };

const cancel = () => {
  message.error('Click on No');
};

const ListingListComponent = ({ loading, listings, t, loadData, deleteListing }) => {
  const columns = [
    {
      title: t('list.column.gearCategory'),
      dataIndex: 'gearCategory',
      key: 'gearCategory',
      render: text => <div>{text}</div>
    },
    {
      title: t('list.column.gearSubcategory'),
      dataIndex: 'gearSubcategory',
      key: 'gearSubCategory',
      render: text => <div>{text}</div>
    },
    {
      title: t('list.column.description'),
      dataIndex: 'description',
      key: 'description',
      render: text => <div>{text}</div>
    },
    {
      title: t('list.column.status'),
      dataIndex: 'status',
      key: 'status',
      render: text => <div>{text}</div>
    },
    {
      title: t('list.column.actions'),
      key: 'actions',
      width: 200,
      render: (text, record) => (
        <div>
          {/* <Link className="listing-link" to={`/listing/${record.id}`}>
            <Button color="primary" size="sm">
              Edit
            </Button>
          </Link> */}
          <ListingDrawerComponent listing={record} />
          <Popconfirm
            title="Are you sure delete this listing?"
            onConfirm={() => deleteListing(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" shape="circle" size="sm">
              <Icon type="delete" />
            </Button>
          </Popconfirm>
        </div>
      )
    }
  ];

  const handlePageChange = (pagination, pageNumber) => {
    const {
      pageInfo: { endCursor }
    } = listings;
    pagination === 'relay' ? loadData(endCursor + 1, 'add') : loadData((pageNumber - 1) * itemsNumber, 'replace');
  };

  const RenderListings = () => (
    <Fragment>
      <Table dataSource={listings.edges.map(({ node }) => node)} columns={columns} />
      <Pagination
        itemsPerPage={listings.edges.length}
        handlePageChange={handlePageChange}
        hasNextPage={listings.pageInfo.hasNextPage}
        pagination={type}
        total={listings.totalCount}
        loadMoreText={t('list.btn.more')}
        defaultPageSize={itemsNumber}
      />
    </Fragment>
  );

  return (
    <PageLayout>
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
      <h2>{t('list.subTitle')}</h2>
      <Link to="/listing/new">
        <Button color="primary">{t('list.btn.add')}</Button>
      </Link>
      {/* Render loader */}
      {loading && !listings && <Loading t={t} />}
      {/* Render main listing content */}
      {listings && listings.totalCount ? <RenderListings /> : <NoListingsMessage t={t} />}
    </PageLayout>
  );
};

ListingListComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  listings: PropTypes.object,
  deleteListing: PropTypes.func.isRequired,
  loadData: PropTypes.func,
  t: PropTypes.func
};

export default translate('listing')(ListingListComponent);
