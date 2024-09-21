"use client";
import { useEffect, useState } from "react";
import CustomButton from "@/components/commonComponents/Button/Button";
import ConfirmationModal from "@/components/commonComponents/ConfirmationModal/ConfirmationModal";
import Loader from "@/components/commonComponents/Loader/Loader";
import { PopUpModal } from "@/components/commonComponents/Modal/Modal";
import { StatusChip } from "@/components/commonComponents/StatusChip/StatusChip";
import { EditIconUnderlined } from "@/components/icons/EditIconUnderlined";
import PlusIcon from "@/components/icons/PlusIcon";
import TableContainer from "@/components/table/tablecontainer";
import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import Toggle from "@/components/commonComponents/Toggle/Toggle";
import DummyImg from "@/assets/images/dummy-img.png";
import {
  useGetAddonsQuery,
  useStatusAddonsMutation,
} from "@/redux/apiSlices/addonsApi";
import { useQueryParams } from "@/utils/useQueryParams";

const INITIAL_VISIBLE_COLUMNS = [
  { name: "Category", uid: "category" },
  { name: "Sub-Category", uid: "subCategoryName" },
  { name: "Name", uid: "name" },
  { name: "SKU", uid: "sku" },
  { name: "Price", uid: "price" },
  { name: "Description", uid: "description" },
  { name: "Actions", uid: "actions" },
];

const Addons = () => {
  const { limit, page } = useQueryParams();
  const { data, isFetching, isSuccess } = useGetAddonsQuery({
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
  ] = useStatusAddonsMutation();
  const [selectedAddons, setSelectedAddons] = useState(null);

  const handleToggleChange = (event, id) => {
    const checked = event.target.checked;
    setSelectedAddons({ checked: checked, id: id });
  };

  const confirmToggleChange = () => {
    const { checked, id } = selectedAddons;
    updateStatus({
      addonServiceId: id,
      isActive: checked,
      // updatedBy: "user@example.com",
    });
    setSelectedAddons(null);
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

  return (
    <>
      <ConfirmationModal
        message={`Are you sure you want to change the status`}
        onConfirm={confirmToggleChange}
        onCancel={() => setSelectedAddons(null)}
        isModalOpen={!!selectedAddons}
      />
      {/* <h1 className="flex justify-start ml-5">Discounts</h1> */}
      {/* <label className="text-font24  leading-lineHeight36 font-bold flex-start">Discounts</label> */}
      <TableContainer
        headerColumns={INITIAL_VISIBLE_COLUMNS}
        data={isSuccess ? data?.data?.rows : []}
        isLoading={isFetching}
        isSuccess={isSuccess}
        paginationData={data?.pagination}
        showFilters={false}
        tableLabel="Addons"
        headerButtons={
          <PopUpModal
            title={(onOpen) => (
              <CustomButton
                as={Link}
                href="/addons/create"
                icon={<PlusIcon fill="#fff" />}
                className="py-2 px-4 border-none rounded-lg bg-primaryBtn text-white"
              >
                Create Addons
              </CustomButton>
            )}
          ></PopUpModal>
        }
        customRender={(data, columnKey, cellValue) => {
          switch (columnKey) {
            case "category":
              return (
                <span className="truncate w-48 ml-2 block">
                  {data?.category?.categoryName || "Not found"}
                </span>
              );
            case "subCategoryName":
              return data?.subCategory?.categoryName || "Not found";
            case "name":
              return data?.name || "Not found";
            case "sku":
              return data?.sku || "Not found";
            case "price":
              return <p>${data?.price || "0.00"}</p>;
            case "description":
              return (
                <p className="truncate w-48 ">
                  {data?.description || "No Description"}
                </p>
              );
            case "actions":
              return (
                <div className="flex w-[120px] justify-between">
                  <div className="flex gap-4">
                    <Tooltip showArrow={true} content="Edit">
                      <Link href={`/addons/edit/${data?.id}`}>
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

export default Addons;
