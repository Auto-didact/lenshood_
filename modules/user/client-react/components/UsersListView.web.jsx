/* eslint-disable react/display-name */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { translate } from '@gqlapp/i18n-client-react';
import { Table, Button, Loader } from '@gqlapp/look-client-react';
import { Popconfirm, Icon, message } from 'antd';
import UserDrawerComponent from './UserDrawerComponent';

const UsersView = ({ deleteUser, orderBy, onOrderBy, loading, users, toggleFeatured, t }) => {
  const [errors, setErrors] = useState([]);
  const handleDeleteUser = async id => {
    const result = await deleteUser(id);
    if (result && result.errors) {
      setErrors(result.errors);
    } else {
      setErrors([]);
    }
  };
  const handleToggleUserFeature = async (event, record, isFeatured) => {
    event.persist();
    const result = await toggleFeatured(record.id, isFeatured);
    if (result) {
      if (result.error) setErrors(result.errors);
    } else {
      record.isFeatured = isFeatured;
      event.target.innerHTML = isFeatured ? 'Featured' : 'UnFeatured';
      setErrors([]);
    }
  };
  const cancel = () => {
    message.error('Click on No');
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

  const columns = [
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'username')} href="#">
          {t('users.column.name')} {renderOrderByArrow('username')}
        </a>
      ),
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => (
        <Link className="user-link" to={`/users/${record.id}`}>
          {text}
        </Link>
      )
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'email')} href="#">
          {t('users.column.email')} {renderOrderByArrow('email')}
        </a>
      ),
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'role')} href="#">
          {t('users.column.role')} {renderOrderByArrow('role')}
        </a>
      ),
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'isActive')} href="#">
          {t('users.column.active')} {renderOrderByArrow('isActive')}
        </a>
      ),
      dataIndex: 'isActive',
      key: 'isActive',
      render: text => text.toString()
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
      title: t('users.column.actions'),
      key: 'actions',
      render: (text, record) => (
        <div>
          <UserDrawerComponent user={record} />
          <Popconfirm
            title="Are you sure delete this User?"
            onConfirm={() => handleDeleteUser(record.id)}
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

  return (
    <>
      {loading && !users ? (
        <Loader text={t('users.loadMsg')} />
      ) : (
        <>
          {errors &&
            errors.map(error => (
              <div className="alert alert-danger" role="alert" key={error.field}>
                {error.message}
              </div>
            ))}
          <Table dataSource={users} columns={columns} />
        </>
      )}
    </>
  );
};

UsersView.propTypes = {
  loading: PropTypes.bool.isRequired,
  users: PropTypes.array,
  orderBy: PropTypes.object,
  onOrderBy: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  toggleFeatured: PropTypes.func.isRequired,
  onClickIsFeatured: PropTypes.func,
  t: PropTypes.func
};

export default translate('user')(UsersView);
