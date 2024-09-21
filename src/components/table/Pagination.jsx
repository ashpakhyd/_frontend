import { useQueryParams } from "@/utils/useQueryParams";
import { Pagination } from "@nextui-org/react";
import { useState } from "react";

const PaginationComponent = ({ totalPages, totalCount }) => {
  const { page, limit, setQueryParams } = useQueryParams();

  const [rowsPerPage, setRowsPerPage] = useState(limit);

  const onRowsPerPageChange = (e) => {
    const selectedValue = parseInt(e.target.value, 10);
    setRowsPerPage(selectedValue);
    setQueryParams({ limit: selectedValue });
  };
// console.log("totalCount", totalCount)
  return (
    <div className="flex flex-wrap px-2 items-center justify-between gap-2 pt-4 ">
      <div className="hidden sm:flex w-[30%] justify-start gap-2">
        <Pagination
          isCompact
          showControls
          showShadow
          color="default"
          page={page}
          total={totalPages}
          onChange={(currentPage) => setQueryParams({ page: currentPage })}
        />
      </div>
      <div className="flex space-x-2">
        <div className="flex-grow text-right text-small self-center">
          {totalCount !== undefined
            ? `${totalCount} ${totalCount === 1 || totalCount === 0 ?  "Result" : "Results"}`
            : "0 Result"}
        </div>
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="bg-transparent ml-2 rounded-lg text-default-400 cursor-pointer"
            value={rowsPerPage}
            onChange={onRowsPerPageChange}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="60">60</option>
            <option value="70">70</option>
            <option value="80">80</option>
            <option value="90">90</option>
            <option value="100">100</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default PaginationComponent;
