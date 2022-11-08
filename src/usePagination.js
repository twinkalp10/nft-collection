import React, { useState } from "react";

const usePagination = (maxSize = 0) => {
  const [page, setPage] = useState(1);
  const next = () => {
    if (maxSize / 15 > page) {
      setPage(page + 1);
    }
  };
  const previous = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  return { page, next, previous };
};

export default usePagination;
