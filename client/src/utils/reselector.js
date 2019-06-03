import { createSelector } from 'reselect';

const getUserList = state => state;
const getRecords = state => state.user ? state.user.records : null

export const userListSelector = createSelector(
  getUserList,
  state => {
    const lastItem = state.reduce(
      (total, current) => {
        total.balance += current.balance;
        total.topups += current.topups
        total.meal += current.meal
        return total;
      },
      { balance: 0, meal: 0, topups: 0, key: '123' }
    );
    lastItem.name = '总计';
    return [...state, lastItem];
  }
);

export const userRecordSelector = createSelector(
  getRecords,
  records => {
    const newRecords = records.map(item => {
      const key = item._id;
      return { ...item, key }
    })
    return newRecords
  }
)