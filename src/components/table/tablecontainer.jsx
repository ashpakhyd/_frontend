import HeaderButtons from "./HeaderButtons";
import PaginationComponent from "./Pagination";
import TableWrapper from "./table";

const TableContainer = ({
  pageHeading,
  headerColumns,
  data = [],
  customRender,
  selectionMode = "",
  isLoading,
  isSuccess,
  headerButtons,
  paginationData,
  showFilters = false,
  tableLabel,
}) => {
  // console.log("paginationData", paginationData)

  return (
    <div className="px-4 pb-10 mx-auto w-full">
      <HeaderButtons
        headerButtons={headerButtons}
        showFilters={showFilters}
        tableLabel={tableLabel}
      />
      <TableWrapper
        isLoading={isLoading}
        isSuccess={isSuccess}
        headerColumns={headerColumns}
        data={data}
        customRender={customRender}
        selectionMode={selectionMode}
      />

      <PaginationComponent
        page={paginationData?.page}
        totalPages={paginationData?.totalPages}
        totalCount={paginationData?.totalCount}
      />
    </div>
  );
};

export default TableContainer;
