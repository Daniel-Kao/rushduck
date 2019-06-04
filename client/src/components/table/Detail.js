import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../actions/users';
import { Table } from 'antd';
import { userRecordSelector } from '../../utils/reselector';

import { detailColumns } from '../../utils/columns';

function Dashboard({ location, getUser, users }) {

  console.log(users)

  useEffect(() => {
    getUser(location.search.split('?')[1]);
  }, [getUser, location.search]);

  const tableChange = (pagination) => {
    console.log(pagination)
  }
  return (
    <Fragment>
      <Table
        columns={detailColumns()}
        dataSource={users.user ? users.user[0].records : null}
        rowKey='_id'
        onChange={this.tableChange}
        pagination={{
          pageSize: 10,
          total: users.user && users.user[0].totalRecord,
          current: 2
        }}

      />
    </Fragment>
  );
}
const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  { getUser }
)(Dashboard);
