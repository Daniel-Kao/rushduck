import React from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { Link } from 'react-router-dom';

moment.locale('zh-cn');

// 总览表格
export const dashboardColumns = setModalState => [
  { title: '姓名', dataIndex: 'name' },
  { title: '本周消费', dataIndex: 'meal' },
  { title: '本周充值', dataIndex: 'topups' },
  { title: '余额', dataIndex: 'balance' },
  {
    title: '操作',
    dataIndex: 'operate',
    fixed: 'right',
    width: 160,
    render: (text, record) => [
      < Link
        key="查看详情"
        style={{ marginRight: 15 }}
        to={{
          pathname: '/detail',
          search: record._id
        }}
      >
        {record.name !== '总计' ? '查看详情' : null}
      </Link >,
      <a
        key="添加"
        style={{ marginLeft: 15, marginRight: 15 }}
        onClick={() => setModalState(record)}
      >
        {record.name !== '总计' ? '添加' : '添加新成员'}
      </a>
    ]
  }
];


export const detailColumns = () => [
  { title: '消费', dataIndex: 'meal' },
  { title: '充值', dataIndex: 'topup' },
  { title: '日期', dataIndex: 'date', render: (text, record) => <div>{moment(record.date).format('lll')}</div> }
];
