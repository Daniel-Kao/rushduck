import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/users';
import { Table } from 'antd';
import { userListSelector } from '../../utils/reselector';

import { dashboardColumns } from '../../utils/columns';

function Dashboard({ getUsers, users }) {
  const [state, setModalState] = useState({
    isModalOpen: false
  });

  const { isModalOpen } = state;
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleMore = rowData => {
    setModalState({ isModalOpen: true });
  };

  return (
    <Fragment>
      <Table
        columns={dashboardColumns(setModalState)}
        dataSource={users}
        pagination={false}
      />
    </Fragment>
  );
}
const mapStateToProps = state => console.log(state.users.users) || ({
  users: userListSelector(state.users.users)
});

export default connect(
  mapStateToProps,
  { getUsers }
)(Dashboard);
