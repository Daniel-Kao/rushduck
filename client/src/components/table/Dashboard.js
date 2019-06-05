import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { getUsers, setFormData } from '../../actions/users';
import { Table, Modal, Form, Input, message } from 'antd';
import { userListSelector } from '../../utils/reselector';

import { dashboardColumns } from '../../utils/columns';

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 16
  }
};

function Dashboard({ getUsers, users, form }) {
  const [state, setModalState] = useState({
    isModalOpen: false,
    name: '',

  });
  function handleOk() {
    setModalState({ isModalOpen: false });
  }
  function handleCancel() {
    setModalState({ isModalOpen: false });
  }
  const { isModalOpen, name, expense, topup } = state;
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleMore = rowData => {

    setModalState({ isModalOpen: true, name: rowData.name });
  };

  return (
    <Fragment>
      <Table
        columns={dashboardColumns(handleMore)}
        dataSource={users}
        pagination={false}
      />
      <Modal
        title={`添加${name === '总计' ? '新成员' : '记录'}`}
        visible={isModalOpen}
        okText='提交'
        cancelText='取消'
        maskClosable={false}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form.Item
          {...formItemLayout}
          label="姓名">
          {form.getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入用户名!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="消费">
          {form.getFieldDecorator('expense', {
          })(<Input />)}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="充值">
          {form.getFieldDecorator('topup', {
          })(<Input />)}
        </Form.Item>
      </Modal>
    </Fragment>
  );
}
const mapStateToProps = state => ({
  users: userListSelector(state.users.users)
});

export default connect(
  mapStateToProps,
  { getUsers, setFormData }
)(Form.create({
  onValuesChange(props, values) {
    console.log(props);
    // console.log(values)
    const key = Object.keys(values)[0]
    let value = values[key]

    if (value.length >= 15) {
      message.warning('最多使用15个字符');
      value = value.substring(0, 15)
    }
    props.setFormData({
      record: {
        ...props.record,
        [key]: { value }
      }
    })
  }
})(Dashboard));
