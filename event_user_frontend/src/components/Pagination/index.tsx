import * as React from "react";
import Pagination from "@mui/material/Pagination";

type CustomPaginationProps = {
  setOnFatherPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  currentPage: number;
};

export default function CustomPagination(props: CustomPaginationProps) {
  const { setOnFatherPage, totalPages, currentPage } = props;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setOnFatherPage(value);
  };

  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={handleChange}
      variant="outlined"
      shape="rounded"
    />
  );
}
