import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../actions/users';
import { Table } from 'antd';
import { userRecordSelector } from '../../utils/reselector';

import { detailColumns } from '../../utils/columns';

function Dashboard({ location, getUser, records }) {

  useEffect(() => {
    getUser(location.search.split('?')[1]);
  }, [getUser, location.search]);

  return (
    <Fragment>
      <Table
        columns={detailColumns()}
        dataSource={records}
      />
    </Fragment>
  );
}
const mapStateToProps = state => ({
  records: userRecordSelector(state.users)
});

export default connect(
  mapStateToProps,
  { getUser }
)(Dashboard);
