"use client";
import CustomButton from "@/components/commonComponents/Button/Button";
import { StatusChip } from "@/components/commonComponents/StatusChip/StatusChip";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { EditIconUnderlined } from "@/components/icons/EditIconUnderlined";
import PlusIcon from "@/components/icons/table/PlusIcon";
import TableContainer from "@/components/table/tablecontainer";
import { useGetProductsQuery } from "@/redux/apiSlices/productsApi";
import { useQueryParams } from "@/utils/useQueryParams";
import { Tooltip, User } from "@nextui-org/react";
import Link from "next/link";
import NoImage from "@/assets/images/no-image.png";
import { getThumbnailUrl } from "@/utils/common-utils";

const INITIAL_VISIBLE_COLUMNS = [
  { name: "IMAGE", uid: "productimage" },
  { name: "PRODUCT NAME", uid: "ProductName", sortable: true },
  { name: "SKU", uid: "SKU", sortable: true },
  { name: "MAP/PMAP", uid: "mapPmap", sortable: true },
  { name: "SALE PRICE", uid: "salePrice", sortable: true },
  { name: "MSRP", uid: "msrp", sortable: true },
  { name: "WEBSITE ACTIVE", uid: "websiteActive" },
  { name: "ACTIONS", uid: "actions" },
];

const Products = () => {
  const { limit, page, sortField, sortOrder, search, filterBy, filterValue } =
    useQueryParams();
  const { data, isSuccess, isFetching } = useGetProductsQuery({
    limit,
    page,
    sortField,
    sortOrder,
    search,
    filterBy,
    filterValue,
  });

  return (
    <TableContainer
      pageHeading="Products"
      headerColumns={INITIAL_VISIBLE_COLUMNS}
      data={isSuccess ? data.data : []}
      isSuccess={isSuccess}
      isLoading={isFetching}
      selectionMode="none"
      paginationData={data?.pagination}
      showFilters={true}
      customRender={(data, columnKey, cellValue) => {
        const imageUrl = getThumbnailUrl(data?.productImages)
          // data.productImages && data.productImages.length > 0
          //   ? data.productImages[0].imageurl
          //   : NoImage.src;
        switch (columnKey) {
          case "productimage":
            return (
              <Link
                href={{
                  pathname: `products/${data?.productName}`,
                  query: {
                    productId: data.id,
                  },
                }}
              >
                <div className="flex ml-2">
                  <User
                    avatarProps={{
                      radius: "sm",
                      src: imageUrl,
                      className: "bg-transparent",
                    }}
                  ></User>
                </div>
              </Link>
            );
          case "ProductName":
            return (
              <Link href={`products/${data?.id}`}>
                <div className="truncate w-48 hover:underline">
                  <Tooltip
                    showArrow={true}
                    content={data?.productName}
                    className="break-words max-w-96"
                  >
                    {data?.productName}
                  </Tooltip>
                </div>
              </Link>
            );
          case "SKU":
            return <p>{data?.sku}</p>;
          case "mapPmap":
            return <p>${data?.mapPmap}</p>;
          case "salePrice":
            return <p>${data?.salePrice}</p>;
          case "msrp":
            return <p>${data?.msrp}</p>;
          case "websiteActive":
            return (
              <div className="text-center">
                <StatusChip status={data?.websiteActive} />
              </div>
            );

          case "actions":
            return (
              <div className="flex justify-center space-x-4">
                <Link
                  href={{
                    pathname: `products/edit/${data?.productName}`,
                    query: {
                      productId: data.id,
                    },
                  }}
                >
                  <Tooltip showArrow={true} content="Edit">
                    <span className="cursor-pointer">
                      <EditIconUnderlined fill="#7E84A3" />
                    </span>
                  </Tooltip>
                </Link>
              </div>
            );
          default:
            return cellValue;
        }
      }}
      headerButtons={
        <>
          {/* <CustomButton className="font-medium bg-success text-white py-2 px-7 ">
            Export
          </CustomButton> */}

          <CustomButton
            as={Link}
            href="/products/create"
            icon={<PlusIcon />}
            className="py-2 px-4 border-none rounded-lg  bg-primaryBtn text-white "
          >
            Add Product
          </CustomButton>
        </>
      }
    />
  );
};

export default Products;
