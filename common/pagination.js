function calculatePagination(PAGENO, LIMIT) {
  if (PAGENO >= 1) {
    LIMIT = LIMIT;
    OFFSET = (PAGENO - 1) * LIMIT;
  } else {
    LIMIT = LIMIT;
    OFFSET = 0;
  }
  return { LIMIT, OFFSET };
}

module.exports = { calculatePagination };
