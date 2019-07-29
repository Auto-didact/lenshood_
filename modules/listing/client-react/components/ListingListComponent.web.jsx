/* eslint-disable react/display-name */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Popconfirm, Icon, message } from 'antd';

import { translate } from '@gqlapp/i18n-client-react';
import { Table, Button, Pagination, Loader } from '@gqlapp/look-client-react';
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

const ListingListComponent = props => {
  const { orderBy, onOrderBy, loading, listings, t, loadData, deleteListing, toggleFeatured } = props;
  const renderOrderByArrow = name => {
    if (orderBy && orderBy.column === name) {
      if (orderBy.order === 'desc') {
        return <span className="badge badge-primary">&#8595;</span>;
      } else {
        return <span className="badge badge-primary">&#8593;</span>;
      }
    } else {
      return <span className="badge badge-secondary">&#8645;</span>;
    }
  };
  const handleOrderBy = (e, name) => {
    e.preventDefault();
    let order = 'asc';
    if (orderBy && orderBy.column === name) {
      if (orderBy.order === 'asc') {
        order = 'desc';
      } else if (orderBy.order === 'desc') {
        return onOrderBy({
          column: '',
          order: ''
        });
      }
    }
    return onOrderBy({ column: name, order });
  };
  const handleToggleUserFeature = async (event, record, isFeatured) => {
    event.persist();
    const result = await toggleFeatured(record.id, isFeatured);
    if (!result) {
      record.isFeatured = isFeatured;
      event.target.innerHTML = isFeatured ? 'Featured' : 'UnFeatured';
    }
  };
  const columns = [
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'gearCategory')} href="#">
          {t('list.column.gearCategory')} {renderOrderByArrow('gearCategory')}
        </a>
      ),
      dataIndex: 'gearCategory',
      key: 'gearCategory',
      render: text => <div>{text}</div>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'gearSubcategory')} href="#">
          {t('list.column.gearSubcategory')} {renderOrderByArrow('gearSubcategory')}
        </a>
      ),
      dataIndex: 'gearSubcategory',
      key: 'gearSubCategory',
      render: text => <div>{text}</div>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'description')} href="#">
          {t('list.column.description')} {renderOrderByArrow('description')}
        </a>
      ),
      dataIndex: 'description',
      key: 'description',
      render: text => <div>{text}</div>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'status')} href="#">
          {t('list.column.status')} {renderOrderByArrow('status')}
        </a>
      ),
      dataIndex: 'status',
      key: 'status',
      render: text => <div>{text}</div>
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'isFeatured')} href="#">
          {t('Is Featured')} {renderOrderByArrow('isFeatured')}
        </a>
      ),
      dataIndex: 'isFeatured',
      key: 'isFeatured',
      render: (text, record) => (
        <a onClick={e => handleToggleUserFeature(e, record, text ? false : true)}>{text ? 'Featured' : 'UnFeatured'}</a>
      )
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
    <div>
      {/* Render loader */}
      {loading && !listings && <Loading t={t} />}
      {/* Render main listing content */}
      {listings && listings.totalCount ? <RenderListings /> : <NoListingsMessage t={t} />}
    </div>
  );
};

ListingListComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  listings: PropTypes.object,
  orderBy: PropTypes.object,
  onOrderBy: PropTypes.func.isRequired,
  deleteListing: PropTypes.func.isRequired,
  loadData: PropTypes.func,
  toggleFeatured: PropTypes.func,
  t: PropTypes.func
};

export default translate('listing')(ListingListComponent);
