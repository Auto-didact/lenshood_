/* eslint-disable react/display-name */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Loader } from '@gqlapp/look-client-react';
import { Popconfirm, Button } from 'antd';

const LiveSearchComponent = ({ orderBy, onOrderBy, loading, liveSearches, currentUser }) => {
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
    message.error('Request cancelled');
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

  console.log(liveSearches)

  const columns = [
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'queryItem')} href="#">
          {"Requested Item"} {renderOrderByArrow('queryItem')}
        </a>
      ),
      dataIndex: 'queryItem',
      key: 'queryItem'
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, ' gearCategory')} href="#">
          {"Gear Category"} {renderOrderByArrow(' gearCategory')}
        </a>
      ),
      dataIndex: 'gearCategory',
      key: 'gearCategory'
    },
    {
      title: "Requested by",
      dataIndex: 'users',
      key: 'users',
      render: (text) => (
        <div>
          <strong>{text[0].user.username}</strong>{text.length > 1 ? <span>{` and ${text.length} others`}</span> : null}
        </div>
      )
    },
    // {
    //   title: (
    //     <a onClick={e => handleOrderBy(e, 'isActive')} href="#">
    //       {t('users.column.active')} {renderOrderByArrow('isActive')}
    //     </a>
    //   ),
    //   dataIndex: 'isActive',
    //   key: 'isActive',
    //   render: text => text.toString()
    // },
    {
      title: "Add/Cancel Request",
      dataIndex: 'users',
      key: 'actions',
      render: (text, record) => (
        <div>
          {/* <Popconfirm
            title=""
            onConfirm={() => handleDeleteUser(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          > */}
          {text.some(item => item.user.id === currentUser.id) ?
            <Button type="danger" size="small" style={{ width: "70px" }} >
              Cancel
            </Button>
            :
            <Button type="primary" size="small" style={{ width: "70px" }}>
              Request
            </Button>
          }
          {/* </Popconfirm> */}
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
            <Table dataSource={liveSearches} columns={columns} />
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
  // deleteUser: PropTypes.func.isRequired,
  // t: PropTypes.func
};

export default LiveSearchComponent;




// import React from "react";
// import { Button, List } from "antd";

// export default class LiveSearchComponent extends React.Component {
//   state = this.props.state;

//   render() {
//     return (
//       <div>
//         <List
//           itemLayout="horizontal"
//           dataSource={this.state.liveSearchList}
//           renderItem={item => (
//             <List.Item className="marginB20">
//               <List.Item.Meta
//                 title={item.itemName}
//                 description={item.gearCategory}
//               />
//             </List.Item>
//           )}
//         />
//       </div>
//     );
//   }
// }
