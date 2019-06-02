import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/users';
import MaterialTable from 'material-table';
import Modal from '@material-ui/core/Modal';
import FormModal from './FormModal';

import { dashboardColumns } from '../../utils/columns';
import { localizationConfig } from '../../utils/localization';

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
    <section className="container">
      <MaterialTable
        columns={dashboardColumns()}
        data={users}
        title=""
        localization={localizationConfig()}
        options={{
          search: true,
          exportButton: true,
          paging: false,
          actionsColumnIndex: -1
        }}
        actions={[
          {
            icon: 'add',
            tooltip: '添加',
            onClick: (event, rowData) => handleMore(rowData)
          },
          {
            icon: 'more',
            tooltip: '详情',
            onClick: (event, rowData) => console.log(rowData)
          }
        ]}
      />
      <Modal open={isModalOpen}>
        <FormModal />
      </Modal>
    </section>
  );
}
const mapStateToProps = state => ({
  users: state.users.users
});

export default connect(
  mapStateToProps,
  { getUsers }
)(Dashboard);
