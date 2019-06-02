import { createSelector } from 'reselect';

const getUserList = state => state;

export const userListSelector = createSelector(
  getUserList,
  state => {
    const final = state.reduce(
      (total, current) => {
        total.balance += current.balance;
        total.lastMeal.meal += current.lastMeal.meal
        total.lastMeal.topup += current.lastMeal.topup
        return total;
      },
      { balance: 0, lastMeal: {meal: 0, topup: 0}, key: '123' }
    );
    final.name = '总计';
    return [...state, final];
  }
);
