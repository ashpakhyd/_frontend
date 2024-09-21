"use client";
import { useEffect, useState } from "react";
import CustomButton from "@/components/commonComponents/Button/Button";
import ConfirmationModal from "@/components/commonComponents/ConfirmationModal/ConfirmationModal";
import { PopUpModal } from "@/components/commonComponents/Modal/Modal";
import { StatusChip } from "@/components/commonComponents/StatusChip/StatusChip";
import Toggle from "@/components/commonComponents/Toggle/Toggle";
import { EditIconUnderlined } from "@/components/icons/EditIconUnderlined";
import PlusIcon from "@/components/icons/PlusIcon";
import TableContainer from "@/components/table/tablecontainer";
import {
  useGetDeliveryRoutesQuery,
  useStatusDeliveryRoutesMutation,
} from "@/redux/apiSlices/deliveryRoutes";
import { useQueryParams } from "@/utils/useQueryParams";
import { Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { toast } from "react-toastify";

const INITIAL_VISIBLE_COLUMNS = [
  { name: "Route Code", uid: "routeCode" },
  { name: "Route Class", uid: "routeClass" },
  { name: "Route Description", uid: "routeDescription" },
  { name: "Route Type", uid: "routeType" },
  { name: "Actions", uid: "actions" },
];

const DeliveryRoute = () => {
  const [selectedDeliveryStatus, setSelectedDeliveryStatus] = useState(null);
  const { limit, page, search } = useQueryParams();
  const { data, isFetching, isSuccess } = useGetDeliveryRoutesQuery({
    limit,
    page,
    search,
  });

  const [
    statusDeliveryroutes,
    {
      data: statusDeliveryRoutes,
      isSuccess: successDeliveryRoutes,
      isLoading: loadingStatusDeliveryRoutes,
    },
  ] = useStatusDeliveryRoutesMutation();

  useEffect(() => {
    if (successDeliveryRoutes) {
      if (statusDeliveryRoutes.success) {
        toast.success(statusDeliveryRoutes?.message);
      } else {
        toast.error(statusDeliveryRoutes.message);
      }
    }
  }, [successDeliveryRoutes]);

  const handleToggleChange = (event, id) => {
    const checked = event.target.checked;
    setSelectedDeliveryStatus({ checked: checked, id: id });
  };

  
  const confirmToggleChange = () => {
    const { checked, id } = selectedDeliveryStatus;
    statusDeliveryroutes({
      id: id,
      isActive: checked,
    })
      .then(() => {
        setSelectedDeliveryStatus(null);
      })
      .catch((error) => {
        console.error("Failed to update status:", error);
      });
  };

  return (
    <>
      <div className="text-center">
        <ConfirmationModal
          message={`Are you sure you want to update the status?`}
          onConfirm={confirmToggleChange}
          onCancel={() => setSelectedDeliveryStatus(null)}
          isModalOpen={!!selectedDeliveryStatus}
        />
        <TableContainer
          headerColumns={INITIAL_VISIBLE_COLUMNS}
          data={isSuccess ? data.data : []}
          isLoading={isFetching}
          isSuccess={isSuccess}
          paginationData={data?.pagination}
          showFilters={false}
          tableLabel="Delivery Route List"
          headerButtons={
            <PopUpModal
              title={(onOpen) => (
                <CustomButton
                  as={Link}
                  href="/deliveryroute/create"
                  icon={<PlusIcon fill="#fff" />}
                  className="py-2 px-4 border-none rounded-lg bg-primaryBtn text-white"
                >
                  Add Route
                </CustomButton>
              )}
            ></PopUpModal>
          }
          customRender={(data, columnKey, cellValue) => {
            switch (columnKey) {
              case "status":
                return <StatusChip status={data.isActive} />;
              case "routeClass":
                return <p>{data?.routeClassMaster?.routeClass}</p>;
              case "routeType":
                return <p>{data?.routeTypeMaster?.routeType}</p>;
              case "routeDescription":
                return <p className="truncate w-48 ">{data?.routeDescription}</p>;
              case "actions":
                return (
                  <div className="flex w-[120px] justify-between">
                    <div className="flex gap-4">
                      <Tooltip showArrow={true} content="Edit">
                        <Link href={`/deliveryroute/edit/${data?.id}`}>
                          <EditIconUnderlined fill="#4F4F4F" />
                        </Link>
                      </Tooltip>
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
      </div>
    </>
  );
};

export default DeliveryRoute;
