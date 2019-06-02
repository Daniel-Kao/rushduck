import moment from 'moment';
import React from 'react';
import '../../../node_modules/moment/locale/zh-cn';
moment.locale('zh-cn');
// 总览表格
export const dashboardColumns = () => [
  { title: '姓名', field: 'name' },
  { title: '支出', field: 'lastMeal.meal' },
  { title: '充值', field: 'lastMeal.topup' },
  { title: '余额', field: 'balance', editable: 'never' },
  {
    title: '日期',
    field: 'lastMeal.date',
    editable: 'never',
    render: rowData =>
      rowData ? <div>{moment(rowData.lastMeal.date).format('lll')}</div> : null
  }
];
