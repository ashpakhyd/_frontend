"use client";
import { useEffect, useState } from "react";
import CustomButton from "@/components/commonComponents/Button/Button";
import ConfirmationModal from "@/components/commonComponents/ConfirmationModal/ConfirmationModal";
import { PopUpModal } from "@/components/commonComponents/Modal/Modal";
import { EditIconUnderlined } from "@/components/icons/EditIconUnderlined";
import PlusIcon from "@/components/icons/PlusIcon";
import TableContainer from "@/components/table/tablecontainer";
import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import Toggle from "@/components/commonComponents/Toggle/Toggle";
import {
  useGetWarrantyQuery,
  useStatusWarrantyMutation,
} from "@/redux/apiSlices/warrantyApi";
import { useQueryParams } from "@/utils/useQueryParams";

const INITIAL_VISIBLE_COLUMNS = [
  // { name: "Product List", uid: "imageAndName" },
  { name: "Category", uid: "categoryName" },
  { name: "Sub-Category", uid: "subCategoryName" },
  { name: "Warranty SKU", uid: "sku" },
  { name: "Warranty", uid: "warrantyType" },
  { name: "Price", uid: "warrantyPrice" },
  { name: "Min Price", uid: "priceMin" },
  { name: "Max Price", uid: "priceMax" },
  { name: "Actions", uid: "actions" },
];

const Warranty = () => {
  const { limit, page } = useQueryParams();
  const { data, isFetching, isSuccess } = useGetWarrantyQuery({
    limit,
    page,
  });
  const [
    updateStatus,
    {
      data: statusResponse,
      isSuccess: isStatusSuccess,
      isLoading: isUpdatingStatus,
    },
  ] = useStatusWarrantyMutation();
  const [selectedWarranty, setSelectedWarranty] = useState(null);

  const handleToggleChange = (event, id) => {
    const checked = event.target.checked;
    setSelectedWarranty({ checked: checked, id: id });
  };

  const confirmToggleChange = () => {
    const { checked, id } = selectedWarranty;
    updateStatus({
      warrantyId: id,
      isActive: checked,
    });
    setSelectedWarranty(null);
  };
  useEffect(() => {
    if (isStatusSuccess) {
      if (statusResponse.success) {
        toast.success(statusResponse?.msg);
      } else {
        toast.error(statusResponse.msg);
      }
    }
  }, [isStatusSuccess]);
console.log("data?.data?.row", data?.data?.rows)
  return (
    <>
      <ConfirmationModal
        message={`Are you sure you want to change the status`}
        onConfirm={confirmToggleChange}
        onCancel={() => setSelectedWarranty(null)}
        isModalOpen={!!selectedWarranty}
      />
      <TableContainer
        headerColumns={INITIAL_VISIBLE_COLUMNS}
        data={isSuccess ? data?.data?.rows : []}
        isLoading={isFetching}
        isSuccess={isSuccess}
        paginationData={data?.pagination}
        showFilters={false}
        tableLabel="Warranty List"
        headerButtons={
          <PopUpModal
            title={(onOpen) => (
              <CustomButton
                as={Link}
                href="/warranty/create"
                icon={<PlusIcon fill="#fff" />}
                className="py-2 px-4 border-none rounded-lg bg-primaryBtn text-white"
              >
                Create Warranty
              </CustomButton>
            )}
          ></PopUpModal>
        }
        customRender={(data, columnKey, cellValue) => {
          switch (columnKey) {
            case "categoryName":
              return data?.category?.categoryName;
            case "subCategoryName":
              return data?.subCategory?.categoryName;
            case "sku":
              return (
                <div>
                  {data?.warrantyPriceRanges.map((range, index) => (
                    <p key={index}>{range.sku}</p>
                  ))}
                </div>
              );
            case "warrantyType":
              return (
                <div>
                  {data?.warrantyPriceRanges.map((range, index) => (
                    <p key={index}>{range.warrantyType} Years</p>
                  ))}
                </div>
              );
            case "warrantyPrice":
              return (
                <div>
                  {data?.warrantyPriceRanges.map((range, index) => (
                    <p key={index}>${range.warrantyPrice}</p>
                  ))}
                </div>
              );
            case "priceMin":
              return (
                <div>
                  {data?.warrantyPriceRanges.map((range, index) => (
                    <p key={index}>${range.priceMin}</p>
                  ))}
                </div>
              );
            case "priceMax":
              return (
                <div>
                  {data?.warrantyPriceRanges.map((range, index) => (
                    <p key={index}>${range.priceMax}</p>
                  ))}
                </div>
              );
              case "actions":
              return (
                <div className="flex w-[120px] justify-between">
                  <div className="flex gap-4">
                    <Tooltip showArrow={true} content="Edit">
                      <Link href={`/warranty/edit/${data?.id}`}>
                        <EditIconUnderlined fill="#4F4F4F" />
                      </Link>
                    </Tooltip>
                    <Tooltip
                      showArrow={true}
                      content={data?.isActive ? "InActive" : "Active"}
                    >
                      <span className="content-center">
                        <Toggle
                          isSelected={data?.isActive}
                          onChange={(e) => handleToggleChange(e, data?.id)}
                          color={data?.isActive ? "success" : "warning"}
                        />
                      </span>
                    </Tooltip>
                  </div>
                </div>
              );
            default:
              return cellValue;
          }
        }}
      />
    </>
  );
};

export default Warranty;
