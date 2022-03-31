const groupBy = (objectArray, property) => objectArray.reduce((acc, obj) => {
  const key = obj[property];
  if (!acc[key]) {
    acc[key] = [];
  }
  acc[key].push(obj);
  return acc;
}, {});


export const paginateFunc = ({ itemsPerPage, totalList }) => {
  const arr = [];
  const sourceList = [...totalList];
  let counter = 0;
  if (sourceList.length) {
    while (sourceList.length) {
      const page = sourceList.splice(0, itemsPerPage);
      arr.push(page);
      counter += 1;
    }
  }
  return arr;
};

export default groupBy;
