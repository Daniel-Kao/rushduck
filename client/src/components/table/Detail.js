import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../actions/users';
import { Table } from 'antd';

import { detailColumns } from '../../utils/columns';


function Dashboard({ location, getUser, users }) {

  const id = location.search.split('?')[1]

  useEffect(() => {
    getUser({ id });
  }, [getUser, id]);

  function tableChange(pagination) {
    getUser({ id, pageNum: pagination.current })
  }

  return (
    <Fragment>
      <Table
        columns={detailColumns()}
        dataSource={users.user ? users.user[0].records : null}
        rowKey='_id'
        onChange={tableChange}
        pagination={{
          pageSize: 10,
          total: users.user && users.user[0].totalRecords,
          current: users.user && Number(users.user[0].currentPage)
        }}

      />
    </Fragment>
  );
}
const mapStateToProps = state => console.log(state.users) || ({
  users: state.users
});

export default connect(
  mapStateToProps,
  { getUser }
)(Dashboard);
