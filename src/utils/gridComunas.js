const rowsForTotalComunas = {
  1: 1,
  2: 1,
  3: 1,
  4: 2,
  5: 3,
  6: 3,
  7: 4,
  8: 4,
  9: 3,
  10: 5,
  11: 4,
  12: 4,
  15: 5,
  16: 4,
  21: 7,
  30: 10,
  32: 8,
  33: 11,
  38: 8,
  52: 13,
};

function rowsPerColumn(totalComunas) {
  try {
    return rowsForTotalComunas[totalComunas];
  } catch {
    return 8;
  }
}

export default { rowsPerColumn };
