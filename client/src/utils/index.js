// get total of array's one element
export const getArrayTotal = (e, es) => {
  return es.reduce((t, c) => {
    return t + c[e];
  }, 0);
};
