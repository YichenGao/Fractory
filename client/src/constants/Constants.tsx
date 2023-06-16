const GRID_SIZE = 10;

const addArray = (a, b) => {
  return a.map((x, i) => x + b[i]);
};

const isEqual = (a, b) => {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

export { GRID_SIZE, addArray, isEqual };
