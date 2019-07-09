/* eslint-disable react/display-name */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Loader } from '@gqlapp/look-client-react';
import { Popconfirm, Button, message } from 'antd';

const LiveSearchComponent = ({
  orderBy,
  onOrderBy,
  loading,
  liveSearches,
  currentUser,
  increSearchItem,
  decreSearchItem
}) => {
  const [errors, setErrors] = useState([]);
  // const handleDeleteUser = async id => {
  //   const result = await deleteUser(id);
  //   if (result && result.errors) {
  //     setErrors(result.errors);
  //   } else {
  //     setErrors([]);
  //   }
  // };
  const cancel = () => {
    message.error('Task cancelled');
  };

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

  const handleIncrement = id => {
    return increSearchItem({ id: id });
  };

  const handleDecrement = id => {
    return decreSearchItem({ id: id });
  };

  // console.log(liveSearches)

  const columns = [
    {
      title: (
        <a /*onClick={e => handleOrderBy(e, 'queryItem')}*/ href="#">
          {'Requested Item'} {/*renderOrderByArrow('queryItem')*/}
        </a>
      ),
      dataIndex: 'queryItem',
      key: 'queryItem',
      sorter: (a, b) => a.queryItem.length - b.queryItem.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: (
        <a /*onClick={e => handleOrderBy(e, ' gearCategory')}*/ href="#">
          {'Gear Category'} {/*renderOrderByArrow(' gearCategory')*/}
        </a>
      ),
      dataIndex: 'gearCategory',
      key: 'gearCategory',
      sorter: (a, b) => a.gearCategory.length - b.gearCategory.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: <a href="#">{'Requested by'}</a>,
      dataIndex: 'users',
      key: 'users',
      sorter: (a, b) => a.users.length - b.users.length,
      sortDirections: ['descend', 'ascend'],
      render: text => (
        <div>
          <strong>{text[0].user.username}</strong>
          {text.length > 1 ? <span>{` and ${text.length - 1} others`}</span> : null}
        </div>
      )
    },
    {
      title: 'Add / Cancel Request',
      dataIndex: 'users',
      key: 'actions',
      render: (text, record) => (
        <div>
          {text.some(item => item.user.id === currentUser.id) ? (
            <Popconfirm
              title="Cancel Request?"
              onConfirm={() => handleDecrement(record.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" size="small" style={{ width: '70px' }}>
                Cancel
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Add a Request?"
              onConfirm={() => handleIncrement(record.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" size="small" style={{ width: '70px' }}>
                Request
              </Button>
            </Popconfirm>
          )}
        </div>
      )
    }
  ];

  return (
    <>
      {loading && !liveSearches ? (
        <Loader text="Loading... " />
      ) : (
        <>
          {errors &&
            errors.map(error => (
              <div className="alert alert-danger" role="alert" key={error.field}>
                {error.message}
              </div>
            ))}
          <Table
            dataSource={liveSearches}
            columns={columns}
            bordered
            title={() => <Button type="primary">Add a Query</Button>}
          />
        </>
      )}
    </>
  );
};

LiveSearchComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  liveSearches: PropTypes.array,
  orderBy: PropTypes.object,
  onOrderBy: PropTypes.func.isRequired,
  currentUser: PropTypes.object
  // t: PropTypes.func
};

export default LiveSearchComponent;
