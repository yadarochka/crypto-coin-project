const getUniqueBy = (arr: [], prop: any) => {
  const set = new Set();
  return arr.filter((o) => !set.has(o[prop]) && set.add(o[prop]));
};
