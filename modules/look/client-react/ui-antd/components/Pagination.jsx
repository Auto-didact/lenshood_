import React from 'react';
import PropTypes from 'prop-types';
import { Pagination as ADPagination } from 'antd';
import { Button } from '../components';

/**
 * @return {boolean}
 */
const Pagination = ({
  itemsPerPage,
  handlePageChange,
  hasNextPage,
  pagination,
  total,
  loadMoreText,
  defaultPageSize
}) => {
  if (pagination === 'relay') {
    return hasNextPage ? (
      <div style={{ display: 'flex', flexCirection: 'column', justifyContent: 'center' }}>
        <Button id="load-more" color="primary" onClick={() => handlePageChange(pagination)}>
          {loadMoreText}
        </Button>
        <div>
          <small>
            ({itemsPerPage} / {total})
          </small>
        </div>
      </div>
    ) : null;
  } else {
    return (
      <ADPagination
        defaultCurrent={1}
        defaultPageSize={defaultPageSize}
        total={total}
        onChange={pageNumber => handlePageChange(pagination, pageNumber)}
      />
    );
  }
};

Pagination.propTypes = {
  itemsPerPage: PropTypes.number,
  handlePageChange: PropTypes.func,
  hasNextPage: PropTypes.bool,
  pagination: PropTypes.string,
  total: PropTypes.number,
  loadMoreText: PropTypes.string,
  defaultPageSize: PropTypes.number
};

export default Pagination;
