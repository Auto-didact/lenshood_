/* eslint-disable react/display-name */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { translate } from '@gqlapp/i18n-client-react';
import { Table, Button, Loader } from '@gqlapp/look-client-react';
import UserDrawer from './UserDrawer';
import { Popconfirm, Icon } from 'antd';

const UsersView = ({ deleteUser, orderBy, onOrderBy, loading, users, t }) => {
  const [errors, setErrors] = useState([]);
  const handleDeleteUser = async id => {
    const result = await deleteUser(id);
    if (result && result.errors) {
      setErrors(result.errors);
    } else {
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
      title: t('users.column.actions'),
      key: 'actions',
      render: (text, record) => (
        <div>
          <UserDrawer user={record} />
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
  t: PropTypes.func
};

export default translate('user')(UsersView);
