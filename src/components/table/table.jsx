"use client";
import Loader from "@/commonComponents/Loader/Loader";
import NoDataFound from "@/icons/NoDataFound";
import { useQueryParams } from "@/utils/useQueryParams";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import styles from "./CustomTable.module.css";

const shortSortKeys = {
  DESC: "descending",
  ASC: "ascending",
};
const longSortKeys = {
  descending: "DESC",
  ascending: "ASC",
};

const TableWrapper = ({
  headerColumns = [],
  data = [],
  isLoading,
  selectionMode = "multiple",
  customRender = () => {},
}) => {
  // Memoized render function for table cells
  const { sortField, sortOrder, setQueryParams } = useQueryParams();
  const sortDescriptor = {
    column: sortField,
    direction: shortSortKeys[sortOrder],
  };

  const renderCell = useMemo(
    () =>
      customRender &&
      ((item, columnKey) => {
        const cellValue = item[columnKey];
        return customRender(item, columnKey, cellValue);
      }),
    [customRender]
  );

  const onSortChange = (descriptor) => {
    const { column, direction } = descriptor;
    setQueryParams({ sortField: column, sortOrder: longSortKeys[direction] });
  };

  return (
    <div className={styles.customTable}>
      <Table
        aria-label="table with custom cells"
        radius="lg"
        isHeaderSticky
        className=" max-h-table-h overflow-auto "
        classNames={{
          wrapper: "flex-1 shadow-none",
          sortIcon: "opacity-100",
          tr: " hover:bg-gray-3 cursor-pointer",
          th: "border-b-2 border-gray-8",
        }}
        selectedKeys={new Set([])}
        selectionMode={selectionMode}
        sortDescriptor={sortDescriptor}
        onSortChange={onSortChange}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={"start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={
            <div className="flex items-center justify-center  text-gray-6">
              <NoDataFound />
            </div>
          }
          isLoading={isLoading}
          loadingContent={<Loader label="Loading..." />}
          items={data}
        >
          {(item) => (
            <TableRow key={item.id}>
              {headerColumns.map((column) => (
                <TableCell key={column.uid}>
                  {renderCell ? renderCell(item, column.uid) : item[column.uid]}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableWrapper;
