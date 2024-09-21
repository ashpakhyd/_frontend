"use client";
import CustomButton from "@/components/commonComponents/Button/Button";
import ConfirmationModal from "@/components/commonComponents/ConfirmationModal/ConfirmationModal";
import Loader from "@/components/commonComponents/Loader/Loader";
import { PopUpModal } from "@/components/commonComponents/Modal/Modal";
import { StatusChip } from "@/components/commonComponents/StatusChip/StatusChip";
import Toggle from "@/components/commonComponents/Toggle/Toggle";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { EditIconUnderlined } from "@/components/icons/EditIconUnderlined";
import PlusIcon from "@/components/icons/PlusIcon";
import TableContainer from "@/components/table/tablecontainer";
import {
  useGetBrandsQuery,
  useUpdateBrandStatusMutation,
} from "@/redux/apiSlices/brandsApi";
import {
  useGetBundlesQuery,
  useDeleteBundleMutation,
} from "@/redux/apiSlices/bundlesAPI";
import { useQueryParams } from "@/utils/useQueryParams";
import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const INITIAL_VISIBLE_COLUMNS = [
  { name: "Categories", uid: "imageAndName" },
  { name: "Status", uid: "status" },
  { name: "Actions", uid: "actions" },
];

const Bundles = () => {
  const { limit, page, sortField, sortOrder, filterBy, filterValue, search } =
    useQueryParams();
  const { data, isFetching, isSuccess } = useGetBundlesQuery({
    limit,
    page,
    sortField,
    sortOrder,
    filterBy,
    filterValue,
    search,
  });
  const [deletingId, setDeletingId] = useState(null);
  const [
    deleteBundle,
    {
      data: statusResponse,
      isSuccess: isStatusSuccess,
      isLoading: isUpdatingStatus,
    },
  ] = useDeleteBundleMutation();

  const handleToggleChange = (event, id) => {
    const checked = event.target.checked;
    setDeletingId({ checked: checked, id: id });
  };
console.log("deletingId", deletingId)
  const confirmToggleChange = () => {
    const { checked, id } = deletingId;
    deleteBundle({
      id: id,
      isActive: checked,
    })
      .then(() => {
        setDeletingId(null);
      })
      .catch((error) => {
        console.error("Failed to update status:", error);
      });
  };

  useEffect(() => {
    if (isStatusSuccess) {
      if (statusResponse.statusCode === 200) {
        toast.success(statusResponse?.msg);
      } else {
        toast.error(statusResponse.msg);
      }
    }
  }, [isStatusSuccess]);

  return (
    <div className="text-center">
      <>
        <ConfirmationModal
          message={`Are you sure you want to delete bundle?`}
          onConfirm={confirmToggleChange}
          onCancel={() => setDeletingId(null)}
          isModalOpen={!!deletingId}
        />
        <TableContainer
          headerColumns={INITIAL_VISIBLE_COLUMNS}
          data={isSuccess ? data?.data : []}
          isLoading={isFetching}
          isSuccess={isSuccess}
          tableLabel="Bundles"
          paginationData={data?.pagination}
          showFilters={false}
          headerButtons={
            <PopUpModal
              title={(onOpen) => (
                <CustomButton
                  as={Link}
                  href="/bundles/create"
                  icon={<PlusIcon fill="#fff" />}
                  className="py-2 px-4 border-none rounded-lg bg-primaryBtn text-white"
                >
                  Create Bundle
                </CustomButton>
              )}
            >
              {/* {(childrenProps) => <CreatePopupBody {...childrenProps} />} */}
            </PopUpModal>
          }
          customRender={(data, columnKey, cellValue) => {
            switch (columnKey) {
              case "imageAndName":
                return (
                  <div className="flex items-center">
                    {
                      <Image
                        width={86}
                        height={48}
                        alt={data?.name}
                        src={data?.image}
                        className="w-[86px] h-[48px]"
                      />
                    }
                    <span className="ml-2">{data?.name}</span>
                  </div>
                );
              case "status":
                return <StatusChip status={data?.isActive} />;
              case "actions":
                return (
                  <div className="flex w-[120px] justify-between">
                    <div className="flex gap-4">
                      <Tooltip showArrow={true} content="Edit">
                        <Link href={`/bundles/edit/${data?.id}`}>
                          <EditIconUnderlined fill="#4F4F4F" />
                        </Link>
                      </Tooltip>
                      {/* <Tooltip showArrow={true} content="Delete" color="danger">
                        <span
                          role="button"
                          className="cursor-pointer"
                          onClick={() => handleDelete(data?.id)}
                        >
                          {deletingId === data?.id ? (
                            <Loader
                              size="lg"
                              className="flex items-center justify-center h-[100px]"
                            />
                          ) : (
                            <DeleteIcon fill="red" />
                          )}
                        </span>
                      </Tooltip> */}
                        <Tooltip
                          showArrow={true}
                          content={data.isActive ? "InActive" : "Active"}
                        >
                          <span className="content-center">
                            <Toggle
                              isSelected={data.isActive}
                              color={data.isActive ? "success" : "warning"}
                              onChange={(e) =>
                                handleToggleChange(
                                  e,
                                  data.id
                                )
                              }
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
    </div>
  );
};

export default Bundles;
